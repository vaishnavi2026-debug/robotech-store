// ===========================
// PRODUCT DATA (same as main page)
// ===========================

const products = [
    { id: 1, name: "SkyMaster Pro X1", category: "drones", price: 1299, description: "Professional 4K drone with advanced AI navigation. Features intelligent obstacle avoidance, 45-minute flight time, and cinema-grade stabilization for buttery smooth footage.", features: ["ai", "4k", "gps"], brand: "skymaster", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop", badge: "Best Seller" },
    { id: 2, name: "DroneX Racing Edition", category: "drones", price: 899, description: "High-speed racing drone with carbon fiber body. Reaches speeds up to 120mph with ultra-low latency FPV transmission and precision controls.", features: ["4k", "gps"], brand: "robotech", image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop", badge: null },
    { id: 3, name: "Industrial Cargo Drone", category: "drones", price: 4599, description: "Heavy-duty drone for industrial delivery tasks. Capable of carrying up to 15kg payload across 20km range with autonomous flight planning.", features: ["ai", "autonomous", "gps"], brand: "robotech", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop", badge: "Premium" },
    { id: 4, name: "AeroView 360", category: "drones", price: 1599, description: "360° panoramic camera drone with AI tracking. Captures stunning aerial panoramas with 6-direction sensors and intelligent subject tracking.", features: ["4k", "gps", "ai"], brand: "skymaster", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=400&fit=crop", badge: null },
    { id: 5, name: "Mini Explorer Drone", category: "drones", price: 499, description: "Compact beginner-friendly drone with propeller guards. Perfect first drone with auto-hover, one-touch landing, and crash-resistant design.", features: ["4k"], brand: "skymaster", image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400&h=400&fit=crop", badge: "Budget" },
    { id: 6, name: "Vision AI Drone", category: "drones", price: 1999, description: "AI-powered surveillance and object tracking drone. Military-grade detection algorithms identify and track up to 50 objects simultaneously.", features: ["ai", "4k", "gps", "autonomous"], brand: "robotech", image: "images/image (7).png", badge: "Featured" },
    { id: 7, name: "Cinema Pro Drone", category: "drones", price: 3499, description: "Professional cinematography drone with 8K camera. Used by Hollywood studios for aerial cinematography with ProRes RAW recording.", features: ["4k", "gps", "ai"], brand: "skymaster", image: "images/image (2).png", badge: "Pro" },
    { id: 8, name: "SpeedRacer FPV", category: "drones", price: 799, description: "High-performance FPV racing drone. Built for competitive drone racing with sub-20ms latency and custom-tuned PID controllers.", features: ["gps"], brand: "robotech", image: "images/image (1).png", badge: "Popular" },
    { id: 9, name: "Tactical Security Drone", category: "drones", price: 2199, description: "Professional security and monitoring drone. 24/7 autonomous patrol capability with thermal imaging and real-time alerts.", features: ["ai", "autonomous", "gps"], brand: "autobot", image: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=400&h=400&fit=crop", badge: null },
    { id: 10, name: "Delivery Drone XL", category: "drones", price: 3999, description: "Large capacity autonomous delivery drone. Commercial-grade delivery system with weather-proof design and precision landing.", features: ["ai", "autonomous", "gps"], brand: "robotech", image: "images/image (3).png", badge: "New" },
    { id: 11, name: "Pocket Drone Mini", category: "drones", price: 299, description: "Ultra-portable pocket-sized drone. Folds to the size of a smartphone, perfect for travel and spontaneous aerial shots.", features: [], brand: "skymaster", image: "images/image (4).png", badge: null },
    { id: 12, name: "Pro Camera Drone", category: "drones", price: 1899, description: "Professional drone with advanced camera gimbal. 3-axis mechanical gimbal with Hasselblad camera integration for stunning detail.", features: ["4k", "ai", "gps"], brand: "skymaster", image: "images/image (5).png", badge: null }
];

// Product specifications data
const productSpecs = {
    1: { "Flight Time": "45 minutes", "Max Speed": "72 km/h", "Range": "15 km", "Camera": "4K 60fps", "Weight": "895g", "Sensors": "Omnidirectional obstacle avoidance", "Wind Resistance": "Level 5", "Storage": "128GB internal" },
    2: { "Flight Time": "25 minutes", "Max Speed": "190 km/h", "Range": "10 km", "Camera": "4K 120fps", "Weight": "420g", "Frame": "Carbon fiber unibody", "Motors": "2806.5 1300KV", "Battery": "6S 1300mAh" },
    3: { "Flight Time": "38 minutes", "Max Speed": "65 km/h", "Range": "20 km", "Payload": "15 kg max", "Weight": "12.5 kg", "Navigation": "RTK GPS + Visual", "Weather Rating": "IP55", "Autonomy": "Full waypoint mission" },
    4: { "Flight Time": "40 minutes", "Max Speed": "68 km/h", "Range": "12 km", "Camera": "360° 5.2K", "Weight": "750g", "Stabilization": "6-axis gimbal", "Sensors": "6-direction sensing", "Storage": "256GB microSD" },
    5: { "Flight Time": "30 minutes", "Max Speed": "45 km/h", "Range": "5 km", "Camera": "4K 30fps", "Weight": "249g", "Features": "Prop guards included", "Modes": "Auto-hover, Follow-me", "Charging": "USB-C fast charge" },
    6: { "Flight Time": "42 minutes", "Max Speed": "75 km/h", "Range": "18 km", "Camera": "4K + Thermal", "Weight": "1.2 kg", "AI Engine": "Neural processing unit", "Tracking": "50 simultaneous objects", "Detection": "Vehicle, person, animal" },
    7: { "Flight Time": "50 minutes", "Max Speed": "60 km/h", "Range": "20 km", "Camera": "8K ProRes RAW", "Weight": "1.8 kg", "Gimbal": "3-axis mechanical", "Dynamic Range": "14+ stops", "Color": "10-bit D-Log M" },
    8: { "Flight Time": "18 minutes", "Max Speed": "200 km/h", "Range": "8 km", "Camera": "1080p FPV", "Weight": "380g", "Latency": "< 20ms", "Frame": "5\" racing frame", "ESC": "45A BLHeli_32" },
    9: { "Flight Time": "55 minutes", "Max Speed": "55 km/h", "Range": "25 km", "Camera": "4K + Thermal IR", "Weight": "2.1 kg", "Patrol": "24/7 autonomous", "Alerts": "Real-time intrusion", "Night Vision": "Infrared illumination" },
    10: { "Flight Time": "35 minutes", "Max Speed": "50 km/h", "Range": "30 km", "Payload": "25 kg max", "Weight": "18 kg", "Landing": "Precision ±10cm", "Weather": "All-weather IP67", "Autonomy": "Full autonomous delivery" },
    11: { "Flight Time": "22 minutes", "Max Speed": "35 km/h", "Range": "4 km", "Camera": "2.7K", "Weight": "149g", "Folded Size": "14 × 7 × 4 cm", "Features": "Palm takeoff/landing", "Battery": "Swappable magnetic" },
    12: { "Flight Time": "46 minutes", "Max Speed": "70 km/h", "Range": "16 km", "Camera": "Hasselblad 20MP", "Weight": "920g", "Gimbal": "3-axis mechanical", "Aperture": "f/2.8 - f/11", "Video": "5.1K 50fps" }
};

// ===========================
// GET PRODUCT FROM URL
// ===========================

const urlParams = new URLSearchParams(window.location.search);
const productId = parseInt(urlParams.get('id'));
const product = products.find(p => p.id === productId);

if (!product) {
    document.getElementById('productDetailPage').innerHTML = `
        <div style="text-align:center; padding: 5rem 0;">
            <h2>Product Not Found</h2>
            <p style="color: var(--text-secondary); margin: 1rem 0;">The product you're looking for doesn't exist.</p>
            <a href="index.html" class="cta-btn" style="display:inline-block; text-decoration:none; margin-top:1rem;">Back to Store</a>
        </div>
    `;
} else {
    initProductDetail();
}

// ===========================
// INITIALIZE PRODUCT DETAIL
// ===========================

function initProductDetail() {
    document.title = `${product.name} - RoboTech Store`;

    // Breadcrumb
    document.getElementById('breadcrumbName').textContent = product.name;

    // Main image
    document.getElementById('galleryMainImg').src = product.image;
    document.getElementById('galleryMainImg').alt = product.name;

    // Thumbnails (simulate multiple angles with same image + filters)
    const thumbs = document.getElementById('galleryThumbs');
    const angles = ['Front View', 'Side View', 'Top View', 'Detail'];
    thumbs.innerHTML = angles.map((angle, i) => `
        <div class="gallery-thumb ${i === 0 ? 'active' : ''}" onclick="changeGalleryImage(${i})" title="${angle}">
            <img src="${product.image}" alt="${angle}" style="filter: ${i === 0 ? 'none' : i === 1 ? 'brightness(1.1)' : i === 2 ? 'contrast(1.1)' : 'saturate(1.2)'}">
        </div>
    `).join('');

    // Product info
    document.getElementById('detailBadge').textContent = product.badge || '';
    document.getElementById('detailName').textContent = product.name;
    document.getElementById('detailBrand').textContent = product.brand.toUpperCase();
    document.getElementById('detailDescription').textContent = product.description;
    document.getElementById('detailPrice').textContent = `$${product.price}`;

    // Features
    const featureNames = { 'ai': 'AI Powered', '4k': '4K Camera', 'gps': 'GPS', 'autonomous': 'Autonomous' };
    document.getElementById('detailFeatures').innerHTML = product.features.map(f =>
        `<span class="feature-tag">${featureNames[f]}</span>`
    ).join('');

    // Specs table
    const specs = productSpecs[product.id] || {};
    document.getElementById('specsTable').innerHTML = Object.entries(specs).map(([key, value]) => `
        <div class="spec-row">
            <div class="spec-label">${key}</div>
            <div class="spec-value">${value}</div>
        </div>
    `).join('');

    // Related products (same brand or category, excluding current)
    const related = products
        .filter(p => p.id !== product.id && (p.brand === product.brand || p.features.some(f => product.features.includes(f))))
        .slice(0, 4);

    document.getElementById('relatedProducts').innerHTML = related.map(p => `
        <div class="related-card" onclick="window.location.href='product.html?id=${p.id}'">
            <div class="related-card-image">
                <img src="${p.image}" alt="${p.name}">
            </div>
            <div class="related-card-info">
                <div class="related-card-name">${p.name}</div>
                <div class="related-card-price">$${p.price}</div>
            </div>
        </div>
    `).join('');

    // Wishlist
    const wishlist = JSON.parse(localStorage.getItem('robotech_wishlist') || '[]');
    const wishBtn = document.getElementById('detailWishlistBtn');
    if (wishlist.includes(product.id)) {
        wishBtn.textContent = '♥';
        wishBtn.classList.add('active');
    }

    wishBtn.addEventListener('click', () => {
        const wl = JSON.parse(localStorage.getItem('robotech_wishlist') || '[]');
        const idx = wl.indexOf(product.id);
        if (idx > -1) {
            wl.splice(idx, 1);
            wishBtn.textContent = '♡';
            wishBtn.classList.remove('active');
            showToast('Removed from wishlist', '💔');
        } else {
            wl.push(product.id);
            wishBtn.textContent = '♥';
            wishBtn.classList.add('active');
            showToast('Added to wishlist', '❤️');
        }
        localStorage.setItem('robotech_wishlist', JSON.stringify(wl));
    });
}

// ===========================
// GALLERY INTERACTION
// ===========================

function changeGalleryImage(index) {
    document.querySelectorAll('.gallery-thumb').forEach((t, i) => {
        t.classList.toggle('active', i === index);
    });
    // Slight visual variation
    const filters = ['none', 'brightness(1.1)', 'contrast(1.1)', 'saturate(1.2)'];
    document.getElementById('galleryMainImg').style.filter = filters[index];
}

// ===========================
// QUANTITY SELECTOR
// ===========================

let quantity = 1;

document.getElementById('qtyMinus').addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        document.getElementById('qtyValue').textContent = quantity;
    }
});

document.getElementById('qtyPlus').addEventListener('click', () => {
    if (quantity < 10) {
        quantity++;
        document.getElementById('qtyValue').textContent = quantity;
    }
});

// ===========================
// ADD TO CART
// ===========================

document.getElementById('detailAddToCart').addEventListener('click', async () => {
    try {
        for (let i = 0; i < quantity; i++) {
            await fetch('/api/cart/items', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, quantity: 1 })
            });
        }
        showToast(`${quantity}x ${product.name} added to cart`, '🛒');
        loadCartCount();
    } catch (err) {
        showToast(`${product.name} added to cart`, '🛒');
    }
});

// ===========================
// TOAST NOTIFICATIONS
// ===========================

function showToast(message, icon = '✅') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span class="toast-icon">${icon}</span>
        <span class="toast-message">${message}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===========================
// CART BADGE
// ===========================

async function loadCartCount() {
    try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.success) {
            document.getElementById('cartBadge').textContent = data.cart.totalItems;
        }
    } catch (err) {}
}

loadCartCount();

// ===========================
// THEME (inherit from main page)
// ===========================

const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

// ===========================
// STAR RATING
// ===========================

const starRating = document.getElementById('starRating');
if (starRating) {
    const stars = starRating.querySelectorAll('.star');
    
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const value = parseInt(star.dataset.value);
            stars.forEach((s, i) => {
                s.classList.toggle('filled', i < value);
            });
            showToast(`You rated this product ${value}/5 ⭐`, '⭐');
        });

        star.addEventListener('mouseenter', () => {
            const value = parseInt(star.dataset.value);
            stars.forEach((s, i) => {
                s.style.color = i < value ? '#fbbf24' : '';
            });
        });
    });

    starRating.addEventListener('mouseleave', () => {
        stars.forEach(s => { s.style.color = ''; });
    });
}

// ===========================
// MOBILE NAV
// ===========================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
}
