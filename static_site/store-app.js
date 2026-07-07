// ===========================
// STORE PAGE LOGIC
// ===========================

let currentCat = 'all';
let maxPrice = 5000;

function renderProducts(list) {
    const grid = document.getElementById('productsGrid');
    if(!grid) return;

    grid.innerHTML = list.map(p => {
        const badgeClass = p.badge === 'hot' ? 'badge-hot' : p.badge === 'new' ? 'badge-new' : p.badge === 'sale' ? 'badge-sale' : '';
        const badgeHTML = p.badge ? `<div class="product-badge ${badgeClass}">${p.badge}</div>` : '';
        const oldPriceHTML = p.oldPrice ? `<span class="old-price">₹${p.oldPrice.toLocaleString()}</span>` : '';
        const stars = '★'.repeat(Math.floor(p.rating)) + (p.rating % 1 >= 0.5 ? '½' : '');
        const wishActive = isWishlisted(p.id) ? 'active' : '';

        return `
        <div class="product-card" data-cat="${p.cat}" data-price="${p.price}" data-id="${p.id}">
            <div class="product-img">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${badgeHTML}
                <button class="wishlist-btn ${wishActive}" onclick="event.stopPropagation(); toggleWishlist(${p.id}); this.classList.toggle('active')">♥</button>
            </div>
            <div class="product-body">
                <div class="product-cat">${p.cat}</div>
                <div class="product-name">${p.name}</div>
                <div class="product-rating"><span class="stars">${stars}</span><span class="rating-count">(${p.reviews})</span></div>
                <div class="product-footer">
                    <div class="product-price">₹${p.price.toLocaleString()} ${oldPriceHTML}</div>
                    <button class="add-btn" onclick="event.stopPropagation(); addToCart(${p.id})">+</button>
                </div>
            </div>
        </div>`;
    }).join('');

    document.getElementById('productCount').textContent = list.length;
}

function filterCat(cat, el) {
    currentCat = cat;
    document.querySelectorAll('.cat-item').forEach(i => i.classList.remove('active'));
    if(el) el.classList.add('active');
    applyFilters();
}

function getActiveTags() {
    return Array.from(document.querySelectorAll('.tag.active')).map(t => t.textContent.toLowerCase());
}

function applyFilters() {
    maxPrice = parseInt(document.getElementById('priceSlider')?.value || 5000);
    const activeTags = getActiveTags();

    let filtered = products.filter(p => {
        const catMatch = currentCat === 'all' || p.cat === currentCat;
        const priceMatch = p.price <= maxPrice;
        const tagMatch = activeTags.length === 0 || activeTags.some(tag =>
            (p.tags && p.tags.includes(tag)) || p.name.toLowerCase().includes(tag)
        );
        return catMatch && priceMatch && tagMatch;
    });
    // Sort
    const sort = document.getElementById('sortSelect')?.value || 'popular';
    switch(sort) {
        case 'price-low': filtered.sort((a,b) => a.price - b.price); break;
        case 'price-high': filtered.sort((a,b) => b.price - a.price); break;
        case 'rating': filtered.sort((a,b) => b.rating - a.rating); break;
        default: filtered.sort((a,b) => b.reviews - a.reviews);
    }
    renderProducts(filtered);
}

function toggleTag(el) {
    el.classList.toggle('active');
    applyFilters();
}

document.getElementById('sortSelect')?.addEventListener('change', applyFilters);

// URL params
const params = new URLSearchParams(window.location.search);
const catParam = params.get('cat');
if(catParam) {
    currentCat = catParam;
    document.querySelectorAll('.cat-item').forEach(i => {
        i.classList.toggle('active', i.dataset?.cat === catParam || (catParam && i.querySelector('span')?.textContent.toLowerCase().includes(catParam)));
    });
}

// Initial render
applyFilters();
