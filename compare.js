const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

const products = [
    { id: 1, name: "SkyMaster Pro X1", price: 1299, brand: "SkyMaster", image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop", features: ["ai", "4k", "gps"] },
    { id: 2, name: "DroneX Racing Edition", price: 899, brand: "RoboTech", image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop", features: ["4k", "gps"] },
    { id: 3, name: "Industrial Cargo Drone", price: 4599, brand: "RoboTech", image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop", features: ["ai", "autonomous", "gps"] },
    { id: 4, name: "AeroView 360", price: 1599, brand: "SkyMaster", image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=400&fit=crop", features: ["4k", "gps", "ai"] },
    { id: 5, name: "Mini Explorer Drone", price: 499, brand: "SkyMaster", image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400&h=400&fit=crop", features: ["4k"] },
    { id: 6, name: "Vision AI Drone", price: 1999, brand: "RoboTech", image: "images/image (7).png", features: ["ai", "4k", "gps", "autonomous"] },
    { id: 7, name: "Cinema Pro Drone", price: 3499, brand: "SkyMaster", image: "images/image (2).png", features: ["4k", "gps", "ai"] },
    { id: 8, name: "SpeedRacer FPV", price: 799, brand: "RoboTech", image: "images/image (1).png", features: ["gps"] },
    { id: 9, name: "Tactical Security Drone", price: 2199, brand: "AutoBot", image: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=400&h=400&fit=crop", features: ["ai", "autonomous", "gps"] },
    { id: 10, name: "Delivery Drone XL", price: 3999, brand: "RoboTech", image: "images/image (3).png", features: ["ai", "autonomous", "gps"] },
    { id: 11, name: "Pocket Drone Mini", price: 299, brand: "SkyMaster", image: "images/image (4).png", features: [] },
    { id: 12, name: "Pro Camera Drone", price: 1899, brand: "SkyMaster", image: "images/image (5).png", features: ["4k", "ai", "gps"] }
];

const specs = {
    1: { "Flight Time": "45 min", "Max Speed": "72 km/h", "Range": "15 km", "Camera": "4K 60fps", "Weight": "895g", "Wind Resistance": "Level 5" },
    2: { "Flight Time": "25 min", "Max Speed": "190 km/h", "Range": "10 km", "Camera": "4K 120fps", "Weight": "420g", "Wind Resistance": "Level 3" },
    3: { "Flight Time": "38 min", "Max Speed": "65 km/h", "Range": "20 km", "Camera": "None", "Weight": "12.5 kg", "Wind Resistance": "Level 6" },
    4: { "Flight Time": "40 min", "Max Speed": "68 km/h", "Range": "12 km", "Camera": "360° 5.2K", "Weight": "750g", "Wind Resistance": "Level 4" },
    5: { "Flight Time": "30 min", "Max Speed": "45 km/h", "Range": "5 km", "Camera": "4K 30fps", "Weight": "249g", "Wind Resistance": "Level 3" },
    6: { "Flight Time": "42 min", "Max Speed": "75 km/h", "Range": "18 km", "Camera": "4K + Thermal", "Weight": "1.2 kg", "Wind Resistance": "Level 5" },
    7: { "Flight Time": "50 min", "Max Speed": "60 km/h", "Range": "20 km", "Camera": "8K ProRes", "Weight": "1.8 kg", "Wind Resistance": "Level 5" },
    8: { "Flight Time": "18 min", "Max Speed": "200 km/h", "Range": "8 km", "Camera": "1080p FPV", "Weight": "380g", "Wind Resistance": "Level 2" },
    9: { "Flight Time": "55 min", "Max Speed": "55 km/h", "Range": "25 km", "Camera": "4K + IR", "Weight": "2.1 kg", "Wind Resistance": "Level 5" },
    10: { "Flight Time": "35 min", "Max Speed": "50 km/h", "Range": "30 km", "Camera": "None", "Weight": "18 kg", "Wind Resistance": "Level 7" },
    11: { "Flight Time": "22 min", "Max Speed": "35 km/h", "Range": "4 km", "Camera": "2.7K", "Weight": "149g", "Wind Resistance": "Level 2" },
    12: { "Flight Time": "46 min", "Max Speed": "70 km/h", "Range": "16 km", "Camera": "Hasselblad 20MP", "Weight": "920g", "Wind Resistance": "Level 5" }
};

let selectedProducts = [null, null, null];
let currentSlotIndex = 0;

function openSelector(slotIndex) {
    currentSlotIndex = slotIndex;
    const overlay = document.getElementById('selectorOverlay');
    const grid = document.getElementById('selectorGrid');

    grid.innerHTML = products.map(p => `
        <div class="selector-item" onclick="selectProduct(${p.id})">
            <img src="${p.image}" alt="${p.name}">
            <div class="name">${p.name}</div>
            <div class="price">$${p.price}</div>
        </div>
    `).join('');

    overlay.classList.add('active');
}

function closeSelector() {
    document.getElementById('selectorOverlay').classList.remove('active');
}

function selectProduct(productId) {
    const product = products.find(p => p.id === productId);
    selectedProducts[currentSlotIndex] = product;
    closeSelector();
    renderSlots();
    renderComparisonTable();
}

function removeProduct(slotIndex) {
    selectedProducts[slotIndex] = null;
    renderSlots();
    renderComparisonTable();
}

function renderSlots() {
    for (let i = 0; i < 3; i++) {
        const slot = document.getElementById(`slot${i + 1}`);
        const product = selectedProducts[i];

        if (product) {
            slot.classList.add('filled');
            slot.innerHTML = `
                <div class="compare-filled-card">
                    <button class="compare-remove-btn" onclick="removeProduct(${i})">×</button>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="name">${product.name}</div>
                    <div class="price">$${product.price}</div>
                </div>
            `;
        } else {
            slot.classList.remove('filled');
            slot.innerHTML = `
                <button class="compare-slot-btn" onclick="openSelector(${i})">
                    <span class="slot-plus">+</span>
                    <span class="slot-text">Select Drone</span>
                </button>
            `;
        }
    }
}

function renderComparisonTable() {
    const selected = selectedProducts.filter(p => p !== null);
    const tableWrapper = document.getElementById('compareTable');

    if (selected.length < 2) {
        tableWrapper.style.display = 'none';
        return;
    }

    tableWrapper.style.display = 'block';

    const allSpecs = ['Price', 'Brand', 'Flight Time', 'Max Speed', 'Range', 'Camera', 'Weight', 'Wind Resistance', 'AI Powered', 'GPS', 'Autonomous'];

    let html = '<thead><tr><th>Specification</th>';
    selected.forEach(p => { html += `<th>${p.name}</th>`; });
    html += '</tr></thead><tbody>';

    allSpecs.forEach(specName => {
        html += '<tr>';
        html += `<td>${specName}</td>`;

        const values = selected.map(p => {
            if (specName === 'Price') return `$${p.price}`;
            if (specName === 'Brand') return p.brand;
            if (specName === 'AI Powered') return p.features.includes('ai') ? '✓ Yes' : '✗ No';
            if (specName === 'GPS') return p.features.includes('gps') ? '✓ Yes' : '✗ No';
            if (specName === 'Autonomous') return p.features.includes('autonomous') ? '✓ Yes' : '✗ No';
            return specs[p.id]?.[specName] || '—';
        });

        // Highlight best value
        const bestIndex = findBestValue(specName, values, selected);

        values.forEach((val, i) => {
            const cls = i === bestIndex ? 'highlight' : '';
            html += `<td class="${cls}">${val}</td>`;
        });

        html += '</tr>';
    });

    html += '</tbody>';
    document.getElementById('compareTableBody').innerHTML = html;
}

function findBestValue(specName, values, selected) {
    if (specName === 'Price') {
        const prices = selected.map(p => p.price);
        return prices.indexOf(Math.min(...prices));
    }

    const numericSpecs = ['Flight Time', 'Max Speed', 'Range'];
    if (numericSpecs.includes(specName)) {
        const nums = values.map(v => parseFloat(v) || 0);
        if (nums.every(n => n === 0)) return -1;
        return nums.indexOf(Math.max(...nums));
    }

    if (specName === 'Weight') {
        const nums = values.map(v => parseFloat(v) || 9999);
        return nums.indexOf(Math.min(...nums));
    }

    if (['AI Powered', 'GPS', 'Autonomous'].includes(specName)) {
        const idx = values.indexOf('✓ Yes');
        if (values.filter(v => v === '✓ Yes').length === values.length) return -1;
        return idx;
    }

    return -1;
}

// Check URL params for pre-selected products
const urlParams = new URLSearchParams(window.location.search);
const ids = urlParams.get('ids');
if (ids) {
    ids.split(',').forEach((id, i) => {
        if (i < 3) {
            const product = products.find(p => p.id === parseInt(id));
            if (product) selectedProducts[i] = product;
        }
    });
    renderSlots();
    renderComparisonTable();
}
