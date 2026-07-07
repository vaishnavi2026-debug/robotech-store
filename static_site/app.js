// ===========================
// PRODUCT DATA
// ===========================
const products = [
    { id:1, name:"Carbon FPV Frame 5\"", cat:"drones", price:1299, oldPrice:1799, image:"https://images.unsplash.com/photo-1521405924368-64c5b84bec60?w=500&q=80", badge:"hot", rating:4.9, reviews:128, tags:["fpv","brushless"] },
    { id:2, name:"Brushless Motor 2306 — 2450KV (Set of 4)", cat:"drones", price:599, oldPrice:750, image:"https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=500&q=80", badge:"hot", rating:4.8, reviews:167, tags:["fpv","brushless"] },
    { id:3, name:"F4 Flight Controller — Betaflight", cat:"drones", price:1599, oldPrice:null, image:"https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=500&q=80", badge:null, rating:4.9, reviews:98, tags:["fpv"] },
    { id:4, name:"30A BLHeli ESC — 4-in-1 Board", cat:"drones", price:890, oldPrice:null, image:"https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=500&q=80", badge:"new", rating:4.7, reviews:54, tags:["fpv","brushless"] },
    { id:5, name:"FPV Goggles EV800D", cat:"drones", price:2499, oldPrice:2999, image:"https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=500&q=80", badge:null, rating:4.8, reviews:89, tags:["fpv"] },
    { id:6, name:"Training Drone Kit — Complete", cat:"drones", price:3499, oldPrice:null, image:"https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=500&q=80", badge:"new", rating:4.9, reviews:45, tags:["brushless"] },
    { id:7, name:"ESP32 Dev Board — WiFi+BT", cat:"iot", price:399, oldPrice:499, image:"https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80", badge:"hot", rating:4.9, reviews:312, tags:["esp32","sensor"] },
    { id:8, name:"Smart Weather Station Kit", cat:"iot", price:1150, oldPrice:null, image:"https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&q=80", badge:null, rating:4.6, reviews:78, tags:["esp32","sensor","arduino"] },
    { id:9, name:"IoT Home Automation Kit", cat:"iot", price:2299, oldPrice:2799, image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", badge:"sale", rating:4.7, reviews:134, tags:["esp32","sensor"] },
    { id:10, name:"Raspberry Pi 4 — 4GB", cat:"iot", price:4500, oldPrice:null, image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80", badge:null, rating:4.9, reviews:256, tags:["raspberry pi"] },
    { id:11, name:"Ultimate Arduino Starter Kit", cat:"diy", price:3450, oldPrice:3999, image:"https://images.unsplash.com/photo-1608564697071-ddf911d81370?w=500&q=80", badge:"hot", rating:4.8, reviews:203, tags:["arduino","sensor"] },
    { id:12, name:"4WD Robot Chassis Kit", cat:"diy", price:850, oldPrice:null, image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80", badge:null, rating:4.5, reviews:67, tags:["robot","arduino"] },
    { id:13, name:"Servo Motor SG90 (Pack of 5)", cat:"parts", price:299, oldPrice:399, image:"https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&q=80", badge:null, rating:4.6, reviews:189, tags:["robot","arduino"] },
    { id:14, name:"LiPo Battery 1300mAh 4S", cat:"drones", price:1899, oldPrice:null, image:"https://images.unsplash.com/photo-1579820010410-c10411aaaa88?w=500&q=80", badge:null, rating:4.7, reviews:76, tags:["fpv","brushless"] },
    { id:15, name:"OLED Display 0.96\" I2C", cat:"iot", price:199, oldPrice:null, image:"https://images.unsplash.com/photo-1555664424-778a1e5e1b48?w=500&q=80", badge:null, rating:4.5, reviews:423, tags:["oled","esp32","arduino"] },
    { id:16, name:"Soldering Station 60W", cat:"parts", price:1499, oldPrice:1799, image:"https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80", badge:"sale", rating:4.8, reviews:156, tags:[] }
];

// ===========================
// SLIDER
// ===========================
const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let curSlide = 0, slideInterval;

function showSlide(i) {
    slides[curSlide]?.classList.remove('active');
    dots[curSlide]?.classList.remove('active');
    curSlide = i;
    slides[curSlide]?.classList.add('active');
    dots[curSlide]?.classList.add('active');
}
function nextSlide() { showSlide((curSlide+1) % slides.length); }
function goToSlide(i) { showSlide(i); clearInterval(slideInterval); slideInterval = setInterval(nextSlide, 5000); }
if(slides.length) slideInterval = setInterval(nextSlide, 5000);

// ===========================
// CART (localStorage)
// ===========================
let cart = JSON.parse(localStorage.getItem('ra_cart') || '[]');

function saveCart() { localStorage.setItem('ra_cart', JSON.stringify(cart)); updateCartUI(); }

function addToCart(productId, qty=1) {
    const product = products.find(p => p.id === productId);
    if(!product) return;
    const existing = cart.find(i => i.id === productId);
    if(existing) { existing.qty += qty; }
    else { cart.push({ id:product.id, name:product.name, price:product.price, image:product.image, qty }); }
    saveCart();
    showToast(`${product.name} added to cart`);
}

function removeFromCart(productId) {
    cart = cart.filter(i => i.id !== productId);
    saveCart(); renderCartItems();
}

function updateQty(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if(!item) return;
    item.qty += delta;
    if(item.qty <= 0) { removeFromCart(productId); return; }
    saveCart(); renderCartItems();
}

function updateCartUI() {
    const count = cart.reduce((s,i) => s+i.qty, 0);
    document.querySelectorAll('#cartCount, #mobileCartBadge').forEach(el => { if(el) el.textContent = count; });
}

function renderCartItems() {
    const container = document.getElementById('cartItems');
    const footer = document.getElementById('cartFooter');
    if(!container) return;

    if(cart.length === 0) {
        container.innerHTML = '<div class="cart-empty"><p>🛒 Your cart is empty</p></div>';
        if(footer) footer.style.display = 'none';
        return;
    }

    if(footer) footer.style.display = 'block';
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    document.getElementById('cartTotal').textContent = `₹${total.toLocaleString()}`;

    container.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₹${item.price.toLocaleString()}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQty(${item.id},-1)">−</button>
                    <span>${item.qty}</span>
                    <button class="qty-btn" onclick="updateQty(${item.id},1)">+</button>
                </div>
            </div>
            <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
        </div>
    `).join('');
}

// Cart drawer
const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
document.getElementById('cartToggle')?.addEventListener('click', openCart);
document.getElementById('cartClose')?.addEventListener('click', closeCart);
cartOverlay?.addEventListener('click', closeCart);

function openCart() { cartDrawer?.classList.add('active'); cartOverlay?.classList.add('active'); renderCartItems(); document.body.style.overflow='hidden'; }
function closeCart() { cartDrawer?.classList.remove('active'); cartOverlay?.classList.remove('active'); document.body.style.overflow=''; }

// Checkout
document.getElementById('checkoutBtn')?.addEventListener('click', () => {
    if(cart.length === 0) return;
    const total = cart.reduce((s,i) => s + i.price * i.qty, 0);
    
    // Razorpay Payment
    const options = {
        key: 'rzp_live_T4EBdtLB2J4v6r',
        amount: total * 100, // Razorpay uses paise
        currency: 'INR',
        name: 'The Robot Alchemist',
        description: 'Order Payment',
        image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">⚡</text></svg>',
        handler: function(response) {
            // Payment successful
            const orderId = Math.random().toString(36).substr(2,8).toUpperCase();
            let orders = JSON.parse(localStorage.getItem('ra_orders') || '[]');
            orders.push({ 
                id: orderId, 
                items: [...cart], 
                total, 
                date: new Date().toISOString(), 
                status: 'confirmed',
                paymentId: response.razorpay_payment_id 
            });
            localStorage.setItem('ra_orders', JSON.stringify(orders));
            cart = []; saveCart();
            closeCart();
            showOrderConfirmation(orderId, total, response.razorpay_payment_id);
        },
        prefill: {
            name: '',
            email: '',
            contact: ''
        },
        theme: {
            color: '#333336'
        },
        modal: {
            ondismiss: function() {
                showToast('Payment cancelled');
            }
        }
    };
    
    const rzp = new Razorpay(options);
    rzp.open();
});

updateCartUI();

// ===========================
// SEARCH
// ===========================
const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
document.getElementById('searchToggle')?.addEventListener('click', () => { searchOverlay?.classList.add('active'); searchInput?.focus(); });
document.getElementById('searchClose')?.addEventListener('click', closeSearch);
searchOverlay?.addEventListener('click', e => { if(e.target === searchOverlay) closeSearch(); });
document.addEventListener('keydown', e => { if(e.key === '/' && !searchOverlay?.classList.contains('active')) { e.preventDefault(); searchOverlay?.classList.add('active'); searchInput?.focus(); } if(e.key === 'Escape') closeSearch(); });

function closeSearch() { searchOverlay?.classList.remove('active'); if(searchInput) searchInput.value=''; }

searchInput?.addEventListener('input', e => {
    const q = e.target.value.toLowerCase().trim();
    const results = document.getElementById('searchResults');
    if(!q) { results.innerHTML = '<p class="search-hint">Start typing to search...</p>'; return; }
    const matches = products.filter(p => p.name.toLowerCase().includes(q) || p.cat.includes(q));
    if(!matches.length) { results.innerHTML = '<p class="search-hint">No products found</p>'; return; }
    results.innerHTML = matches.slice(0,8).map(p => `
        <div class="search-result-item" onclick="closeSearch(); window.location.href='store.html?highlight=${p.id}'">
            <img src="${p.image}" alt="${p.name}">
            <div><div class="search-result-name">${p.name}</div><div class="search-result-price">₹${p.price}</div></div>
        </div>
    `).join('');
});

// ===========================
// FAQ
// ===========================
function toggleFaq(btn) {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    if(!wasActive) item.classList.add('active');
}

// ===========================
// CHAT WIDGET
// ===========================
function toggleChat() { document.getElementById('chatWindow')?.classList.toggle('active'); }

const chatResponses = {
    'hi':'Hello! 👋 Welcome to The Robot Alchemist. How can I help?',
    'hello':'Hey there! Looking for drones, IoT kits, or DIY parts?',
    'price':'Our products range from ₹199 to ₹4,500. What\'s your budget?',
    'shipping':'Free shipping on orders over ₹2,000! Delivery in 3-5 days across India.',
    'return':'30-day return policy on all unused products. No questions asked!',
    'fpv':'Check our FPV range — frames, motors, ESCs, and flight controllers! Visit the Store.',
    'iot':'We have ESP32, Raspberry Pi, sensors, and complete IoT project kits.',
    'arduino':'We stock Arduino Uno, Mega, Nano, and complete starter kits from ₹3,450.',
    'help':'I can help with: products, pricing, shipping, returns, or recommendations!'
};

function getBotResponse(msg) {
    const m = msg.toLowerCase();
    for(const [k,v] of Object.entries(chatResponses)) { if(m.includes(k)) return v; }
    return 'Thanks for reaching out! For detailed help, email hello@robotalchemist.in';
}

document.getElementById('chatSend')?.addEventListener('click', sendChat);
document.getElementById('chatInput')?.addEventListener('keydown', e => { if(e.key==='Enter') sendChat(); });

function sendChat() {
    const input = document.getElementById('chatInput');
    const msg = input.value.trim(); if(!msg) return;
    const msgs = document.getElementById('chatMessages');
    msgs.innerHTML += `<div class="chat-msg user"><span>${msg}</span></div>`;
    input.value = ''; msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
        msgs.innerHTML += `<div class="chat-msg bot"><span>${getBotResponse(msg)}</span></div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 600 + Math.random()*400);
}

// ===========================
// TOAST
// ===========================
function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = 'position:fixed;top:80px;right:24px;background:#1a1a1a;border:1px solid #333;color:#f5f5f7;padding:14px 20px;border-radius:12px;font-size:.9rem;z-index:9999;animation:msgIn .3s ease;box-shadow:0 8px 32px rgba(0,0,0,0.5)';
    toast.textContent = '✓ ' + message;
    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity='0'; toast.style.transition='opacity .3s'; setTimeout(() => toast.remove(), 300); }, 3000);
}

// ===========================
// HAMBURGER MENU
// ===========================
document.getElementById('hamburger')?.addEventListener('click', () => {
    document.getElementById('hamburger')?.classList.toggle('active');
    document.getElementById('mainNav')?.classList.toggle('active');
});

// ===========================
// WISHLIST (localStorage)
// ===========================
let wishlist = JSON.parse(localStorage.getItem('ra_wishlist') || '[]');
function toggleWishlist(id) {
    const i = wishlist.indexOf(id);
    if(i > -1) { wishlist.splice(i,1); showToast('Removed from wishlist'); }
    else { wishlist.push(id); showToast('Added to wishlist ❤️'); }
    localStorage.setItem('ra_wishlist', JSON.stringify(wishlist));
}
function isWishlisted(id) { return wishlist.includes(id); }


// ===========================
// FEATURED PRODUCTS CAROUSEL
// ===========================
function initFeaturedCarousel() {
    const track = document.getElementById('featuredTrack');
    if(!track) return;
    const featured = products.filter(p => p.badge);
    track.innerHTML = featured.map(p => `
        <div class="featured-card" onclick="window.location.href='store.html?highlight=${p.id}'">
            <div class="featured-card-img"><img src="${p.image}" alt="${p.name}"></div>
            <div class="featured-card-name">${p.name}</div>
            <div class="featured-card-price">₹${p.price.toLocaleString()}</div>
        </div>
    `).join('');

    // Auto scroll
    let pos = 0;
    setInterval(() => {
        pos += 1;
        if(pos >= track.scrollWidth - track.clientWidth) pos = 0;
        track.scrollLeft = pos;
    }, 30);
}
initFeaturedCarousel();

// ===========================
// ANIMATED STATS COUNTER
// ===========================
let statsAnimated = false;
function animateStats() {
    if(statsAnimated) return;
    const statNumbers = document.querySelectorAll('.stat-num');
    if(!statNumbers.length) return;
    const section = document.querySelector('.stats-section');
    if(!section) return;
    const rect = section.getBoundingClientRect();
    if(rect.top < window.innerHeight - 50) {
        statsAnimated = true;
        statNumbers.forEach(el => {
            const target = parseInt(el.dataset.target);
            const suffix = '+';
            const duration = 2000;
            const start = Date.now();
            function update() {
                const elapsed = Date.now() - start;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                el.textContent = Math.floor(easeOut * target) + suffix;
                if(progress < 1) requestAnimationFrame(update);
                else el.textContent = target + suffix;
            }
            update();
        });
    }
}
window.addEventListener('scroll', animateStats);
setTimeout(animateStats, 500);


// ===========================
// SCROLL REVEAL
// ===========================
function revealSections() {
    const elements = document.querySelectorAll('.stat-card, .why-card, .testimonial-card, .featured-card, .reveal');
    elements.forEach((el, i) => {
        const top = el.getBoundingClientRect().top;
        if (top < window.innerHeight - 60) {
            setTimeout(() => el.classList.add('visible'), i * 50);
        }
    });
}
window.addEventListener('scroll', revealSections);
setTimeout(revealSections, 500);


// ===========================
// ORDER CONFIRMATION POPUP
// ===========================
function showOrderConfirmation(orderId, total, paymentId) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);backdrop-filter:blur(8px);z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;animation:msgIn .3s ease;';
    
    overlay.innerHTML = `
        <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.1);border-radius:16px;padding:40px;max-width:420px;width:100%;text-align:center;">
            <div style="font-size:4rem;margin-bottom:16px;">🎉</div>
            <h2 style="font-size:1.5rem;font-weight:800;margin-bottom:8px;color:#f5f5f7;">Order Placed!</h2>
            <p style="color:#a1a1a6;margin-bottom:24px;">Your payment was successful</p>
            <div style="background:#222;border-radius:12px;padding:16px;margin-bottom:24px;text-align:left;">
                <p style="display:flex;justify-content:space-between;padding:6px 0;color:#a1a1a6;font-size:.9rem;"><span>Order ID</span><strong style="color:#f5f5f7;">${orderId}</strong></p>
                <p style="display:flex;justify-content:space-between;padding:6px 0;color:#a1a1a6;font-size:.9rem;"><span>Amount</span><strong style="color:#f5f5f7;">₹${total.toLocaleString()}</strong></p>
                <p style="display:flex;justify-content:space-between;padding:6px 0;color:#a1a1a6;font-size:.9rem;"><span>Payment ID</span><strong style="color:#f5f5f7;font-size:.75rem;">${paymentId}</strong></p>
                <p style="display:flex;justify-content:space-between;padding:6px 0;color:#a1a1a6;font-size:.9rem;"><span>Status</span><strong style="color:#00d68f;">✓ Confirmed</strong></p>
            </div>
            <div style="display:flex;gap:10px;">
                <button onclick="this.closest('div').parentElement.parentElement.remove();" style="flex:1;padding:14px;border-radius:8px;background:#fff;color:#080808;font-weight:700;cursor:pointer;font-size:.95rem;">Continue Shopping</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(overlay);
}


// ===========================
// STACKED TESTIMONIAL CARDS
// ===========================
let currentCard = 0;
const stackCards = document.querySelectorAll('.stack-card');

function updateStack() {
    stackCards.forEach((card, i) => {
        card.classList.remove('active', 'behind-1', 'behind-2', 'exiting');
        const diff = (i - currentCard + stackCards.length) % stackCards.length;
        if (diff === 0) card.classList.add('active');
        else if (diff === 1) card.classList.add('behind-1');
        else if (diff === 2) card.classList.add('behind-2');
    });
}

function nextCard() {
    const current = stackCards[currentCard];
    current.classList.add('exiting');
    setTimeout(() => {
        currentCard = (currentCard + 1) % stackCards.length;
        updateStack();
    }, 300);
}

if (stackCards.length) updateStack();
