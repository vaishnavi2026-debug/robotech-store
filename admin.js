// ===========================
// ADMIN DASHBOARD JS
// ===========================

let token = localStorage.getItem('robotech_admin_token');
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// Check if already logged in
if (token) {
    verifyToken();
} else {
    showLogin();
}

// ===========================
// AUTH
// ===========================

function showLogin() {
    document.getElementById('adminLogin').style.display = 'flex';
    document.getElementById('adminDashboard').style.display = 'none';
}

function showDashboard() {
    document.getElementById('adminLogin').style.display = 'none';
    document.getElementById('adminDashboard').style.display = 'flex';
    loadDashboard();
}

async function verifyToken() {
    try {
        const res = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (data.success && data.user.role === 'admin') {
            document.getElementById('adminUser').textContent = `👤 ${data.user.name}`;
            showDashboard();
        } else {
            localStorage.removeItem('robotech_admin_token');
            showLogin();
        }
    } catch {
        showLogin();
    }
}

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    const errorEl = document.getElementById('loginError');

    try {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await res.json();

        if (data.success && data.user.role === 'admin') {
            token = data.token;
            localStorage.setItem('robotech_admin_token', token);
            document.getElementById('adminUser').textContent = `👤 ${data.user.name}`;
            showDashboard();
        } else if (data.success) {
            errorEl.textContent = 'Access denied. Admin role required.';
        } else {
            errorEl.textContent = data.error;
        }
    } catch {
        errorEl.textContent = 'Connection failed. Is the server running?';
    }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
    localStorage.removeItem('robotech_admin_token');
    token = null;
    showLogin();
});

// ===========================
// TABS
// ===========================

const tabTitles = {
    overview: 'Dashboard Overview',
    orders: 'Order Management',
    products: 'Product Management',
    users: 'User Management'
};

document.querySelectorAll('.sidebar-link[data-tab]').forEach(link => {
    link.addEventListener('click', () => {
        const tab = link.dataset.tab;
        document.querySelectorAll('.sidebar-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        document.getElementById(`tab-${tab}`).classList.add('active');
        document.getElementById('pageTitle').textContent = tabTitles[tab];

        if (tab === 'orders') loadOrders();
        if (tab === 'products') loadProducts();
        if (tab === 'users') loadUsers();
    });
});

// ===========================
// ANIMATED COUNTERS
// ===========================

function animateValue(elementId, start, end, duration, prefix = '') {
    const el = document.getElementById(elementId);
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(easeOut * (end - start) + start);

        el.textContent = prefix + current.toLocaleString();

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            el.textContent = prefix + end.toLocaleString();
        }
    }

    update();
}

// ===========================
// LOAD DASHBOARD
// ===========================

async function loadDashboard() {
    try {
        const res = await fetch('/api/admin/dashboard', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (!data.success) return;
        const d = data.dashboard;

        animateValue('statRevenue', 0, d.totalRevenue, 1500, '$');
        animateValue('statOrders', 0, d.totalOrders, 1200);
        animateValue('statProducts', 0, d.totalProducts, 1000);
        animateValue('statUsers', 0, d.totalUsers, 800);

        // Revenue chart
        renderChart(d.revenueByDay);

        // Recent orders
        document.getElementById('recentOrdersTable').innerHTML = d.recentOrders.map(o => `
            <tr>
                <td>${o.id.slice(0, 8).toUpperCase()}</td>
                <td>${o.customer_name || 'Guest'}</td>
                <td>$${o.total}</td>
                <td><span class="status-badge status-${o.status}">${o.status}</span></td>
                <td>${new Date(o.created_at).toLocaleDateString()}</td>
            </tr>
        `).join('') || '<tr><td colspan="5" style="text-align:center;color:var(--text-muted)">No orders yet</td></tr>';
    } catch (err) {
        console.error('Dashboard load failed:', err);
    }
}

// ===========================
// REVENUE CHART
// ===========================

function renderChart(revenueByDay) {
    const chart = document.getElementById('revenueChart');

    if (!revenueByDay || revenueByDay.length === 0) {
        // Show placeholder bars
        const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
        const placeholders = days.map(day => ({ date: day, revenue: Math.random() * 5000 + 1000 }));
        const maxRevenue = Math.max(...placeholders.map(d => d.revenue));

        chart.innerHTML = placeholders.map(d => {
            const height = (d.revenue / maxRevenue) * 100;
            return `
                <div class="chart-bar" style="height: ${height}%">
                    <span class="chart-bar-value">$${Math.round(d.revenue)}</span>
                    <span class="chart-bar-label">${d.date}</span>
                </div>
            `;
        }).join('');
        return;
    }

    const maxRevenue = Math.max(...revenueByDay.map(d => d.revenue));
    chart.innerHTML = revenueByDay.map(d => {
        const height = maxRevenue > 0 ? (d.revenue / maxRevenue) * 100 : 10;
        const dayLabel = new Date(d.date).toLocaleDateString('en', { weekday: 'short' });
        return `
            <div class="chart-bar" style="height: ${height}%">
                <span class="chart-bar-value">$${Math.round(d.revenue)}</span>
                <span class="chart-bar-label">${dayLabel}</span>
            </div>
        `;
    }).join('');
}

// ===========================
// ORDERS TAB
// ===========================

async function loadOrders() {
    const res = await fetch('/api/admin/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    document.getElementById('ordersTable').innerHTML = data.orders.map(o => `
        <tr>
            <td>${o.id.slice(0, 8).toUpperCase()}</td>
            <td>${o.customer_name || 'Guest'}</td>
            <td>${o.item_count}</td>
            <td>$${o.total}</td>
            <td><span class="status-badge status-${o.status}">${o.status}</span></td>
            <td>
                <select class="action-btn" onchange="updateOrderStatus('${o.id}', this.value)">
                    <option value="confirmed" ${o.status === 'confirmed' ? 'selected' : ''}>Confirmed</option>
                    <option value="processing" ${o.status === 'processing' ? 'selected' : ''}>Processing</option>
                    <option value="shipped" ${o.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                    <option value="delivered" ${o.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                </select>
            </td>
        </tr>
    `).join('') || '<tr><td colspan="6" style="text-align:center;color:var(--text-muted)">No orders yet</td></tr>';
}

async function updateOrderStatus(orderId, status) {
    await fetch(`/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status })
    });
    loadOrders();
}

// ===========================
// PRODUCTS TAB
// ===========================

async function loadProducts() {
    const res = await fetch('/api/admin/products', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    document.getElementById('productsTable').innerHTML = data.products.map(p => `
        <tr>
            <td><img src="${p.image}" alt="${p.name}"></td>
            <td>${p.name}</td>
            <td>${p.brand}</td>
            <td>$${p.price}</td>
            <td>${p.badge || '—'}</td>
            <td><button class="action-btn danger" onclick="deleteProduct(${p.id})">Delete</button></td>
        </tr>
    `).join('');
}

async function deleteProduct(id) {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });
    loadProducts();
}

// ===========================
// USERS TAB
// ===========================

async function loadUsers() {
    const res = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();

    document.getElementById('usersTable').innerHTML = data.users.map(u => `
        <tr>
            <td>${u.name}</td>
            <td>${u.email}</td>
            <td><span class="status-badge ${u.role === 'admin' ? 'status-shipped' : 'status-confirmed'}">${u.role}</span></td>
            <td>${new Date(u.created_at).toLocaleDateString()}</td>
        </tr>
    `).join('');
}
