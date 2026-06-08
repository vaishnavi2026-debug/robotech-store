// ===========================
// SAMPLE PRODUCT DATA
// ===========================

const products = [
    {
        id: 1,
        name: "SkyMaster Pro X1",
        category: "drones",
        price: 1299,
        description: "Professional 4K drone with advanced AI navigation",
        features: ["ai", "4k", "gps"],
        brand: "skymaster",
        image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop",
        badge: "Best Seller"
    },
    {
        id: 2,
        name: "DroneX Racing Edition",
        category: "drones",
        price: 899,
        description: "High-speed racing drone with carbon fiber body",
        features: ["4k", "gps"],
        brand: "robotech",
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 3,
        name: "Industrial Cargo Drone",
        category: "drones",
        price: 4599,
        description: "Heavy-duty drone for industrial delivery tasks",
        features: ["ai", "autonomous", "gps"],
        brand: "robotech",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop",
        badge: "Premium"
    },
    {
        id: 4,
        name: "AeroView 360",
        category: "drones",
        price: 1599,
        description: "360° panoramic camera drone with AI tracking",
        features: ["4k", "gps", "ai"],
        brand: "skymaster",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 5,
        name: "Mini Explorer Drone",
        category: "drones",
        price: 499,
        description: "Compact beginner-friendly drone with propeller guards",
        features: ["4k"],
        brand: "skymaster",
        image: "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400&h=400&fit=crop",
        badge: "Budget"
    },
    {
        id: 6,
        name: "Vision AI Drone",
        category: "drones",
        price: 1999,
        description: "AI-powered surveillance and object tracking drone",
        features: ["ai", "4k", "gps", "autonomous"],
        brand: "robotech",
        image: "images/image (7).png",
        badge: "Featured"
    },
    {
        id: 7,
        name: "Cinema Pro Drone",
        category: "drones",
        price: 3499,
        description: "Professional cinematography drone with 8K camera",
        features: ["4k", "gps", "ai"],
        brand: "skymaster",
        image: "images/image (2).png",
        badge: "Pro"
    },
    {
        id: 8,
        name: "SpeedRacer FPV",
        category: "drones",
        price: 799,
        description: "High-performance FPV racing drone",
        features: ["gps"],
        brand: "robotech",
        image: "images/image (1).png",
        badge: "Popular"
    },
    {
        id: 9,
        name: "Tactical Security Drone",
        category: "drones",
        price: 2199,
        description: "Professional security and monitoring drone",
        features: ["ai", "autonomous", "gps"],
        brand: "autobot",
        image: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=400&h=400&fit=crop",
        badge: null
    },
    {
        id: 10,
        name: "Delivery Drone XL",
        category: "drones",
        price: 3999,
        description: "Large capacity autonomous delivery drone",
        features: ["ai", "autonomous", "gps"],
        brand: "robotech",
        image: "images/image (3).png",
        badge: "New"
    },
    {
        id: 11,
        name: "Pocket Drone Mini",
        category: "drones",
        price: 299,
        description: "Ultra-portable pocket-sized drone",
        features: [],
        brand: "skymaster",
        image: "images/image (4).png",
        badge: null
    },
    {
        id: 12,
        name: "Pro Camera Drone",
        category: "drones",
        price: 1899,
        description: "Professional drone with advanced camera gimbal",
        features: ["4k", "ai", "gps"],
        brand: "skymaster",
        image: "images/image (5).png",
        badge: null
    }
];

// ===========================
// LOADING SCREEN
// ===========================

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);
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
// SCROLL PROGRESS BAR
// ===========================

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('scrollProgress').style.width = progress + '%';
}

window.addEventListener('scroll', updateScrollProgress);

// ===========================
// BACK TO TOP BUTTON
// ===========================

const backToTop = document.getElementById('backToTop');

function toggleBackToTop() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}

window.addEventListener('scroll', toggleBackToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// THEME TOGGLE
// ===========================

const themeToggle = document.getElementById('themeToggle');
let currentTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    showToast(`Switched to ${currentTheme} mode`, currentTheme === 'dark' ? '🌙' : '☀️');
});

// ===========================
// CURSOR GLOW EFFECT
// ===========================

const cursorGlow = document.getElementById('cursorGlow');
const heroSlider = document.querySelector('.hero-slider');

heroSlider.addEventListener('mousemove', (e) => {
    const rect = heroSlider.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cursorGlow.style.left = x + 'px';
    cursorGlow.style.top = y + 'px';
});

// ===========================
// PARTICLE BACKGROUND
// ===========================

function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const particles = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(156, 163, 175, ${p.opacity})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = p.x - particles[j].x;
                const dy = p.y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(107, 114, 128, ${0.15 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
}

initParticles();

// ===========================
// TYPEWRITER EFFECT
// ===========================

const slideTexts = [
    "Next-Gen Autonomous Drones",
    "Advanced Robotics",
    "Smart Automation"
];

let typewriterIntervals = [];

function typeWriter(elementId, text, speed = 80) {
    const el = document.getElementById(elementId);
    if (!el) return;
    el.textContent = '';
    let i = 0;

    const interval = setInterval(() => {
        if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(interval);
        }
    }, speed);

    return interval;
}

function triggerTypewriter(slideIndex) {
    // Clear all typewriters
    typewriterIntervals.forEach(interval => clearInterval(interval));
    typewriterIntervals = [];

    const elementId = `typewriter${slideIndex + 1}`;
    const text = slideTexts[slideIndex];
    const interval = typeWriter(elementId, text, 70);
    typewriterIntervals.push(interval);
}

// Initial typewriter
setTimeout(() => triggerTypewriter(0), 2200);

// ===========================
// HAMBURGER MENU
// ===========================

const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===========================
// SLIDER FUNCTIONALITY
// ===========================

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
let slideInterval;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[index].classList.add('active');
    dots[index].classList.add('active');

    currentSlide = index;
    triggerTypewriter(index);
}

function nextSlide() {
    let next = (currentSlide + 1) % slides.length;
    showSlide(next);
}

function prevSlide() {
    let prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

document.getElementById('nextSlide').addEventListener('click', () => {
    nextSlide();
    stopSlideShow();
    startSlideShow();
});

document.getElementById('prevSlide').addEventListener('click', () => {
    prevSlide();
    stopSlideShow();
    startSlideShow();
});

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
        stopSlideShow();
        startSlideShow();
    });
});

startSlideShow();

heroSlider.addEventListener('mouseenter', stopSlideShow);
heroSlider.addEventListener('mouseleave', startSlideShow);

// ===========================
// FEATURED PRODUCTS CAROUSEL
// ===========================

function initFeaturedCarousel() {
    const track = document.getElementById('featuredTrack');
    const featured = products.filter(p => p.badge);

    track.innerHTML = featured.map(product => `
        <div class="featured-card" onclick="openProductModal(${product.id})">
            <div class="featured-card-image">
                <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:0.5rem;">
            </div>
            <div class="featured-card-name">${product.name}</div>
            <div class="featured-card-price">$${product.price}</div>
        </div>
    `).join('');

    // Auto scroll
    let scrollPos = 0;
    setInterval(() => {
        scrollPos += 1;
        if (scrollPos >= track.scrollWidth - track.clientWidth) {
            scrollPos = 0;
        }
        track.scrollLeft = scrollPos;
    }, 30);
}

initFeaturedCarousel();

// ===========================
// 3D TILT EFFECT ON PRODUCT CARDS
// ===========================

function initTiltEffect() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.product-card.revealed');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const deltaX = (e.clientX - centerX) / rect.width;
            const deltaY = (e.clientY - centerY) / rect.height;

            // Only apply tilt if mouse is near the card
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            if (distance < 1.5) {
                const tiltX = deltaY * 5;
                const tiltY = -deltaX * 5;
                card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(0)`;
            } else {
                card.style.transform = '';
            }
        });
    });

    // Reset on mouse leave
    document.addEventListener('mouseleave', () => {
        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.style.transform = '';
        });
    });
}

initTiltEffect();

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================

function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal, .product-card:not(.revealed)');

    reveals.forEach((el, index) => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            setTimeout(() => {
                el.classList.add('revealed');
            }, index * 60);
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// ===========================
// ANIMATED COUNTER (STATS)
// ===========================

let countersStarted = false;

function animateCounters() {
    if (countersStarted) return;

    const statNumbers = document.querySelectorAll('.stat-number');
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;

    const sectionTop = statsSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight - 100) {
        countersStarted = true;

        statNumbers.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const startTime = Date.now();

            function updateCounter() {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const current = Math.floor(easeOut * target);

                counter.textContent = current + '+';

                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + '+';
                }
            }

            updateCounter();
        });
    }
}

window.addEventListener('scroll', animateCounters);

// ===========================
// TESTIMONIALS CAROUSEL
// ===========================

let currentTestimonial = 0;
const testimonialCards = document.querySelectorAll('.testimonial-card');
const tDots = document.querySelectorAll('.t-dot');

function showTestimonial(index) {
    testimonialCards.forEach(card => card.classList.remove('active'));
    tDots.forEach(dot => dot.classList.remove('active'));

    testimonialCards[index].classList.add('active');
    tDots[index].classList.add('active');
    currentTestimonial = index;
}

tDots.forEach((dot, index) => {
    dot.addEventListener('click', () => showTestimonial(index));
});

// Auto advance testimonials
setInterval(() => {
    const next = (currentTestimonial + 1) % testimonialCards.length;
    showTestimonial(next);
}, 6000);

// ===========================
// NEWSLETTER FORM
// ===========================

document.getElementById('newsletterForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            showToast(data.message || 'Successfully subscribed!', '🎉');
        } catch (err) {
            showToast('Successfully subscribed! Welcome aboard.', '🎉');
        }
        document.getElementById('newsletterEmail').value = '';
    }
});

// ===========================
// PRODUCT QUICK VIEW MODAL
// ===========================

const modal = document.getElementById('productModal');
const modalClose = document.getElementById('modalClose');

function openProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const featureNames = {
        'ai': 'AI Powered',
        '4k': '4K Camera',
        'gps': 'GPS',
        'autonomous': 'Autonomous'
    };

    document.getElementById('modalTitle').textContent = product.name;
    document.getElementById('modalDescription').textContent = product.description;
    document.getElementById('modalPrice').textContent = `$${product.price}`;
    document.getElementById('modalBadge').textContent = product.badge || '';

    const modalImage = document.getElementById('modalImage');
    modalImage.innerHTML = `<img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:1rem;">`;

    const modalFeatures = document.getElementById('modalFeatures');
    modalFeatures.innerHTML = product.features.map(f =>
        `<span class="feature-tag">${featureNames[f]}</span>`
    ).join('');

    document.getElementById('modalCartBtn').onclick = () => {
        addToCart(productId);
        closeProductModal();
    };

    const wishlistBtn = document.getElementById('modalWishlistBtn');
    wishlistBtn.textContent = isInWishlist(productId) ? '♥' : '♡';
    wishlistBtn.classList.toggle('active', isInWishlist(productId));
    wishlistBtn.onclick = () => {
        toggleWishlist(productId);
        wishlistBtn.textContent = isInWishlist(productId) ? '♥' : '♡';
        wishlistBtn.classList.toggle('active', isInWishlist(productId));
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProductModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeProductModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProductModal();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProductModal();
});

// ===========================
// PRODUCT FILTERING & DISPLAY
// ===========================

let wishlist = JSON.parse(localStorage.getItem('robotech_wishlist') || '[]');

function toggleWishlist(productId) {
    const index = wishlist.indexOf(productId);
    if (index > -1) {
        wishlist.splice(index, 1);
        showToast('Removed from wishlist', '💔');
    } else {
        wishlist.push(productId);
        showToast('Added to wishlist', '❤️');
    }
    localStorage.setItem('robotech_wishlist', JSON.stringify(wishlist));
    updateWishlistButtons();
    renderProducts();
}

function isInWishlist(productId) {
    return wishlist.includes(productId);
}

function updateWishlistButtons() {
    document.querySelectorAll('.product-wishlist-btn').forEach(btn => {
        const id = parseInt(btn.dataset.productId);
        btn.textContent = isInWishlist(id) ? '♥' : '♡';
        btn.classList.toggle('active', isInWishlist(id));
    });
}

let filteredProducts = [...products];

function createProductCard(product) {
    const badgeHTML = product.badge ? `<div class="product-badge">${product.badge}</div>` : '';
    const wishlistActive = isInWishlist(product.id) ? 'active' : '';
    const wishlistIcon = isInWishlist(product.id) ? '♥' : '♡';
    const featuresHTML = product.features.map(feature => {
        const featureNames = {
            'ai': 'AI Powered',
            '4k': '4K Camera',
            'gps': 'GPS',
            'autonomous': 'Autonomous'
        };
        return `<span class="feature-tag">${featureNames[feature]}</span>`;
    }).join('');

    return `
        <div class="product-card" data-category="${product.category}" data-price="${product.price}" data-brand="${product.brand}" onclick="goToProductDetail(${product.id})">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: contain; padding: 1rem;">
                ${badgeHTML}
                <button class="product-wishlist-btn ${wishlistActive}" data-product-id="${product.id}" onclick="event.stopPropagation(); toggleWishlist(${product.id})">${wishlistIcon}</button>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-features">
                    ${featuresHTML}
                </div>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" onclick="event.stopPropagation(); addToCart(${product.id})">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');

    // Show skeleton loading first
    productsGrid.innerHTML = Array(6).fill('').map(() => `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-info">
                <div class="skeleton-line short"></div>
                <div class="skeleton-line long"></div>
                <div class="skeleton-line medium"></div>
                <div class="skeleton-line-thick"></div>
            </div>
        </div>
    `).join('');

    // Replace with real products after a short delay (simulates loading)
    setTimeout(() => {
        productsGrid.innerHTML = filteredProducts.map(product => createProductCard(product)).join('');
        setTimeout(revealOnScroll, 100);
    }, 600);
}

function applyFilters() {
    const categoryFilters = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(cb => cb.value);
    const featureFilters = Array.from(document.querySelectorAll('input[name="features"]:checked'))
        .map(cb => cb.value);
    const brandFilters = Array.from(document.querySelectorAll('input[name="brand"]:checked'))
        .map(cb => cb.value);
    const maxPrice = parseInt(document.getElementById('priceRange').value);

    filteredProducts = products.filter(product => {
        const categoryMatch = categoryFilters.length === 0 ||
            categoryFilters.includes('all') ||
            categoryFilters.includes(product.category);
        const featuresMatch = featureFilters.length === 0 ||
            featureFilters.every(feature => product.features.includes(feature));
        const brandMatch = brandFilters.length === 0 ||
            brandFilters.includes(product.brand);
        const priceMatch = product.price <= maxPrice;

        return categoryMatch && featuresMatch && brandMatch && priceMatch;
    });

    renderProducts();
}

function sortProducts(sortBy) {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        default:
            filteredProducts = [...products].filter(p => filteredProducts.find(fp => fp.id === p.id));
    }
    renderProducts();
}

document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', applyFilters);
});

const priceRange = document.getElementById('priceRange');
const maxPriceLabel = document.getElementById('maxPrice');

let priceDebounce;
priceRange.addEventListener('input', (e) => {
    maxPriceLabel.textContent = `$${e.target.value}`;
    clearTimeout(priceDebounce);
    priceDebounce = setTimeout(applyFilters, 150);
});

document.getElementById('sortBy').addEventListener('change', (e) => {
    sortProducts(e.target.value);
});

document.getElementById('resetFilters').addEventListener('click', () => {
    document.querySelectorAll('.filter-option input[type="checkbox"]').forEach(cb => {
        cb.checked = false;
    });
    document.querySelector('input[value="all"]').checked = true;
    priceRange.value = 5000;
    maxPriceLabel.textContent = '$5000';
    document.getElementById('sortBy').value = 'featured';
    applyFilters();
});

// ===========================
// SHOPPING CART FUNCTIONALITY
// ===========================

let cart = [];

async function addToCart(productId) {
    try {
        const response = await fetch('/api/cart/items', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ productId, quantity: 1 })
        });

        const data = await response.json();

        if (data.success) {
            cart.length = data.cart.totalItems; // keep badge in sync
            updateCartBadge(data.cart.totalItems);
            showToast(data.message, '🛒');
        } else {
            showToast('Failed to add item', '❌');
        }
    } catch (err) {
        // Fallback to client-side if server is down
        const product = products.find(p => p.id === productId);
        cart.push(product);
        updateCartBadge(cart.length);
        showToast(`${product.name} added to cart`, '🛒');
    }
}

function updateCartBadge(count) {
    const badge = document.getElementById('cartBadge');
    badge.textContent = count !== undefined ? count : cart.length;
    badge.style.transform = 'scale(1.5)';
    setTimeout(() => {
        badge.style.transform = 'scale(1)';
    }, 200);
}

// Load cart count on page load
async function loadCartCount() {
    try {
        const response = await fetch('/api/cart');
        const data = await response.json();
        if (data.success) {
            updateCartBadge(data.cart.totalItems);
        }
    } catch (err) {
        // Server not available, keep badge at 0
    }
}

loadCartCount();

// ===========================
// SMOOTH SCROLLING FOR NAV LINKS
// ===========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');

        // Skip links to other pages
        if (!href.startsWith('#')) return;

        e.preventDefault();
        const targetSection = document.querySelector(href);

        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }

        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ===========================
// INITIALIZE PAGE
// ===========================

// ===========================
// PAGE TRANSITIONS
// ===========================

function navigateWithTransition(url) {
    document.body.classList.add('page-exit');
    setTimeout(() => {
        window.location.href = url;
    }, 300);
}

function goToProductDetail(productId) {
    // Save to recently viewed
    let recent = JSON.parse(localStorage.getItem('robotech_recent') || '[]');
    recent = recent.filter(id => id !== productId);
    recent.unshift(productId);
    recent = recent.slice(0, 6);
    localStorage.setItem('robotech_recent', JSON.stringify(recent));

    navigateWithTransition(`product.html?id=${productId}`);
}

// ===========================
// RECENTLY VIEWED
// ===========================

function renderRecentlyViewed() {
    const recent = JSON.parse(localStorage.getItem('robotech_recent') || '[]');
    if (recent.length === 0) return;

    const recentProducts = recent.map(id => products.find(p => p.id === id)).filter(Boolean).slice(0, 4);
    if (recentProducts.length === 0) return;

    // Check if section already exists
    let section = document.getElementById('recentlyViewedSection');
    if (!section) {
        section = document.createElement('section');
        section.id = 'recentlyViewedSection';
        section.className = 'recently-viewed-section';
        const productsSection = document.querySelector('.products-section');
        productsSection.parentNode.insertBefore(section, productsSection);
    }

    section.innerHTML = `
        <div class="recently-viewed-container">
            <div class="recently-viewed-header">
                <h2>Recently Viewed</h2>
                <a href="compare.html" class="compare-link">⚖️ Compare Drones</a>
            </div>
            <div class="recently-viewed-grid">
                ${recentProducts.map(p => `
                    <div class="recently-viewed-card" onclick="goToProductDetail(${p.id})">
                        <img src="${p.image}" alt="${p.name}">
                        <div class="rv-info">
                            <div class="rv-name">${p.name}</div>
                            <div class="rv-price">$${p.price}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ===========================
// USER AUTH STATE
// ===========================

function checkAuthState() {
    const token = localStorage.getItem('robotech_token');
    const userStr = localStorage.getItem('robotech_user');
    const userBtn = document.getElementById('userBtn');
    const dropdownWrapper = document.getElementById('userDropdownWrapper');

    if (token && userStr) {
        const user = JSON.parse(userStr);

        // Hide login link, show avatar dropdown
        userBtn.style.display = 'none';
        dropdownWrapper.style.display = 'block';

        // Set avatar initials
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        document.getElementById('userAvatarBtn').textContent = initials;

        // Set dropdown header
        document.getElementById('userDropdownHeader').innerHTML = `<strong>${user.name}</strong>${user.email}`;

        // Show admin link if admin
        if (user.role === 'admin') {
            document.getElementById('adminLink').style.display = 'block';
        }
    } else {
        userBtn.style.display = 'flex';
        dropdownWrapper.style.display = 'none';
    }
}

// Toggle dropdown
document.getElementById('userAvatarBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('userDropdown').classList.toggle('active');
});

// Close dropdown on outside click
document.addEventListener('click', () => {
    document.getElementById('userDropdown').classList.remove('active');
});

// Logout
document.getElementById('logoutBtnMain').addEventListener('click', () => {
    localStorage.removeItem('robotech_token');
    localStorage.removeItem('robotech_user');
    checkAuthState();
    showToast('Logged out successfully', '👋');
});

checkAuthState();

// FAQ Toggle
function toggleFaq(button) {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');
    
    // Close all
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    // Open clicked one (if it wasn't already open)
    if (!wasActive) {
        item.classList.add('active');
    }
}

renderProducts();
renderRecentlyViewed();
setTimeout(revealOnScroll, 500);
setTimeout(animateCounters, 500);

console.log('🤖 RoboTech Store initialized successfully!');
console.log('✅ All systems operational');
console.log('✅ Product catalog:', products.length, 'items');
console.log('✅ Features: Particles, Typewriter, Tilt, Scroll Reveal, Toasts, Modal, Theme Toggle, Testimonials, Newsletter');


// ===========================
// SEARCH FUNCTIONALITY
// ===========================

const searchOverlay = document.getElementById('searchOverlay');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchCloseBtn = document.getElementById('searchClose');

document.getElementById('searchBtn').addEventListener('click', openSearch);

function openSearch() {
    searchOverlay.classList.add('active');
    setTimeout(() => searchInput.focus(), 100);
}

function closeSearch() {
    searchOverlay.classList.remove('active');
    searchInput.value = '';
    searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
}

searchCloseBtn.addEventListener('click', closeSearch);
searchOverlay.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
});

document.addEventListener('keydown', (e) => {
    if (e.key === '/' && !searchOverlay.classList.contains('active')) {
        e.preventDefault();
        openSearch();
    }
    if (e.key === 'Escape' && searchOverlay.classList.contains('active')) {
        closeSearch();
    }
});

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();

    if (!query) {
        searchResults.innerHTML = '<p class="search-hint">Start typing to search products...</p>';
        return;
    }

    const results = products.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.features.some(f => f.includes(query))
    );

    if (results.length === 0) {
        searchResults.innerHTML = '<p class="search-hint">No products found</p>';
        return;
    }

    searchResults.innerHTML = results.map(p => `
        <div class="search-result-item" onclick="closeSearch(); openProductModal(${p.id})">
            <img class="search-result-img" src="${p.image}" alt="${p.name}">
            <div class="search-result-info">
                <div class="search-result-name">${p.name}</div>
                <div class="search-result-price">$${p.price}</div>
            </div>
        </div>
    `).join('');
});

// ===========================
// CART DRAWER
// ===========================

const cartDrawer = document.getElementById('cartDrawer');
const cartOverlay = document.getElementById('cartOverlay');
const cartDrawerItems = document.getElementById('cartDrawerItems');
const cartDrawerFooter = document.getElementById('cartDrawerFooter');

document.getElementById('cartBtn').addEventListener('click', openCartDrawer);
document.getElementById('cartDrawerClose').addEventListener('click', closeCartDrawer);
cartOverlay.addEventListener('click', closeCartDrawer);

function openCartDrawer() {
    cartDrawer.classList.add('active');
    cartOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    renderCartDrawer();
}

function closeCartDrawer() {
    cartDrawer.classList.remove('active');
    cartOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

async function renderCartDrawer() {
    try {
        const response = await fetch('/api/cart');
        const data = await response.json();

        if (!data.success || data.cart.items.length === 0) {
            cartDrawerItems.innerHTML = `
                <div class="cart-empty-animation">
                    <div class="cart-empty-graphic">
                        <span class="cart-sparkle">✨</span>
                        <span class="cart-sparkle">✨</span>
                        <span class="cart-sparkle">✨</span>
                        <div class="cart-handle"></div>
                        <div class="cart-body"></div>
                        <div class="cart-wheel left"></div>
                        <div class="cart-wheel right"></div>
                    </div>
                    <p class="cart-empty-text">Your cart is empty</p>
                    <p class="cart-empty-subtext">Add some drones to get started!</p>
                </div>
            `;
            cartDrawerFooter.style.display = 'none';
            return;
        }

        cartDrawerFooter.style.display = 'block';
        document.getElementById('cartTotalAmount').textContent = `$${data.cart.total}`;

        cartDrawerItems.innerHTML = data.cart.items.map(item => `
            <div class="cart-item">
                <img class="cart-item-img" src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price}</div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn" onclick="updateCartItem(${item.cart_item_id}, ${item.quantity - 1})">−</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="cart-qty-btn" onclick="updateCartItem(${item.cart_item_id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeCartItem(${item.cart_item_id})">×</button>
            </div>
        `).join('');
    } catch (err) {
        cartDrawerItems.innerHTML = `
            <div class="cart-empty">
                <span class="cart-empty-icon">⚠️</span>
                <p>Could not load cart</p>
            </div>
        `;
    }
}

async function updateCartItem(cartItemId, newQty) {
    if (newQty <= 0) {
        await removeCartItem(cartItemId);
        return;
    }

    await fetch(`/api/cart/items/${cartItemId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQty })
    });

    renderCartDrawer();
    loadCartCount();
}

async function removeCartItem(cartItemId) {
    await fetch(`/api/cart/items/${cartItemId}`, { method: 'DELETE' });
    renderCartDrawer();
    loadCartCount();
    showToast('Item removed from cart', '🗑️');
}

// ===========================
// CHECKOUT
// ===========================

const checkoutOverlay = document.getElementById('checkoutOverlay');
const checkoutForm = document.getElementById('checkoutForm');

document.getElementById('cartCheckoutBtn').addEventListener('click', openCheckout);
document.getElementById('checkoutClose').addEventListener('click', closeCheckout);

async function openCheckout() {
    closeCartDrawer();

    try {
        const response = await fetch('/api/cart');
        const data = await response.json();

        if (!data.success || data.cart.items.length === 0) {
            showToast('Your cart is empty', '⚠️');
            return;
        }

        const summary = document.getElementById('checkoutSummary');
        summary.innerHTML = data.cart.items.map(item => `
            <div class="checkout-summary-item">
                <span>${item.name} × ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');

        document.getElementById('checkoutTotal').textContent = `$${data.cart.total}`;
        checkoutOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    } catch (err) {
        showToast('Could not load checkout', '❌');
    }
}

function closeCheckout() {
    checkoutOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('checkoutName').value;
    const email = document.getElementById('checkoutEmail').value;

    try {
        const response = await fetch('/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email })
        });

        const data = await response.json();

        if (data.success) {
            closeCheckout();
            showOrderConfirmation(data.order, name, email);
            loadCartCount();
            checkoutForm.reset();
        } else {
            showToast(data.error || 'Order failed', '❌');
        }
    } catch (err) {
        showToast('Something went wrong', '❌');
    }
});

// Card number formatting
document.getElementById('checkoutCard').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    e.target.value = value;
});

// Expiry formatting
document.getElementById('checkoutExpiry').addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
    }
    e.target.value = value;
});

// ===========================
// ORDER CONFIRMATION
// ===========================

const confirmationOverlay = document.getElementById('confirmationOverlay');

function showOrderConfirmation(order, name, email) {
    // Trigger confetti
    launchConfetti();

    document.getElementById('confirmationId').textContent = `Order ID: ${order.id.slice(0, 8).toUpperCase()}`;
    document.getElementById('confirmationDetails').innerHTML = `
        <p><span>Customer:</span> <strong>${name}</strong></p>
        <p><span>Email:</span> <strong>${email}</strong></p>
        <p><span>Items:</span> <strong>${order.itemCount}</strong></p>
        <p><span>Total:</span> <strong>$${order.total}</strong></p>
        <p><span>Status:</span> <strong>Confirmed ✓</strong></p>
        <p><span>Track:</span> <strong><a href="tracking.html?id=${order.id}" style="color:var(--accent-secondary)">View Tracking →</a></strong></p>
    `;

    confirmationOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// ===========================
// CONFETTI EFFECT
// ===========================

function launchConfetti() {
    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#4ade80', '#60a5fa', '#fbbf24', '#a78bfa', '#f472b6', '#fb923c'];
    const shapes = ['square', 'circle'];

    for (let i = 0; i < 80; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        const color = colors[Math.floor(Math.random() * colors.length)];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];

        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = color;
        piece.style.borderRadius = shape === 'circle' ? '50%' : '2px';
        piece.style.width = (Math.random() * 8 + 6) + 'px';
        piece.style.height = (Math.random() * 8 + 6) + 'px';
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.animationDelay = (Math.random() * 0.5) + 's';

        container.appendChild(piece);
    }

    // Clean up after animation
    setTimeout(() => container.remove(), 4000);
}

document.getElementById('confirmationClose').addEventListener('click', () => {
    confirmationOverlay.classList.remove('active');
    document.body.style.overflow = '';
});

// (Wishlist functions moved above product rendering)


// ===========================
// LIVE CHAT WIDGET
// ===========================

function toggleChat() {
    document.getElementById('chatWindow').classList.toggle('active');
}

const chatResponses = {
    'hi': 'Hello! Welcome to RoboTech. How can I help you today?',
    'hello': 'Hey there! 👋 Looking for a drone? I can help you find the perfect one.',
    'price': 'Our drones range from $299 to $4,599. What\'s your budget?',
    'shipping': 'We offer free shipping on orders over $999! Standard delivery takes 3-5 business days.',
    'return': 'We have a 30-day money-back guarantee. No questions asked!',
    'warranty': 'All our products come with a 2-year warranty covering manufacturing defects.',
    'recommend': 'For beginners, I\'d recommend the Mini Explorer Drone ($499). For pros, check out the Cinema Pro Drone ($3,499)!',
    'compare': 'You can compare up to 3 drones side-by-side! Visit our comparison tool at /compare.html',
    'track': 'You can track your order at /tracking.html. Just enter your Order ID!',
    'help': 'I can help with: pricing, shipping, returns, warranty, recommendations, order tracking, and comparisons. What do you need?'
};

function getBotResponse(message) {
    const msg = message.toLowerCase();
    
    for (const [key, response] of Object.entries(chatResponses)) {
        if (msg.includes(key)) return response;
    }

    const defaults = [
        'That\'s a great question! Let me connect you with a specialist. In the meantime, check our FAQ section.',
        'Thanks for reaching out! For detailed inquiries, email us at info@robotech.com',
        'I\'m still learning! Try asking about pricing, shipping, warranty, or recommendations.',
        'Hmm, I\'m not sure about that. Can you try rephrasing or ask about our products?'
    ];

    return defaults[Math.floor(Math.random() * defaults.length)];
}

document.getElementById('chatSend').addEventListener('click', sendChatMessage);
document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChatMessage();
});

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    if (!message) return;

    const messages = document.getElementById('chatMessages');

    // Add user message
    messages.innerHTML += `<div class="chat-msg user"><span>${message}</span></div>`;
    input.value = '';
    messages.scrollTop = messages.scrollHeight;

    // Bot response after delay
    setTimeout(() => {
        const response = getBotResponse(message);
        messages.innerHTML += `<div class="chat-msg bot"><span>${response}</span></div>`;
        messages.scrollTop = messages.scrollHeight;
    }, 800 + Math.random() * 500);
}

// ===========================
// FLY TO CART ANIMATION
// ===========================

function flyToCartAnimation(buttonElement) {
    const flyEl = document.getElementById('flyToCart');
    const cartIcon = document.getElementById('cartBtn');

    if (!buttonElement || !cartIcon) return;

    const btnRect = buttonElement.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    flyEl.style.left = btnRect.left + 'px';
    flyEl.style.top = btnRect.top + 'px';
    flyEl.innerHTML = '🛒';
    flyEl.style.opacity = '0';
    flyEl.classList.remove('flying');

    // Force reflow
    flyEl.offsetHeight;

    flyEl.classList.add('flying');
    flyEl.style.opacity = '1';
    flyEl.style.left = cartRect.left + 'px';
    flyEl.style.top = cartRect.top + 'px';
    flyEl.style.transform = 'scale(0.3)';

    setTimeout(() => {
        flyEl.classList.remove('flying');
        flyEl.style.opacity = '0';
        flyEl.style.transform = '';
    }, 700);
}

// Override add to cart button clicks to trigger animation
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        flyToCartAnimation(e.target);
    }
});

// ===========================
// FEATURED CAROUSEL WITH HOVER PREVIEWS
// ===========================

const productSpecs = {
    1: "45 min flight • 72 km/h • 4K 60fps",
    2: "25 min flight • 190 km/h • 4K 120fps",
    3: "38 min flight • 65 km/h • 15kg payload",
    5: "30 min flight • 45 km/h • Beginner friendly",
    6: "42 min flight • 75 km/h • AI tracking",
    7: "50 min flight • 60 km/h • 8K ProRes",
    8: "18 min flight • 200 km/h • FPV racing",
    10: "35 min flight • 50 km/h • 25kg payload"
};

// Re-init featured carousel with hover previews
function initFeaturedCarouselWithPreviews() {
    const track = document.getElementById('featuredTrack');
    if (!track) return;

    const featured = products.filter(p => p.badge);

    track.innerHTML = featured.map(product => `
        <div class="featured-card" onclick="goToProductDetail(${product.id})">
            <div class="hover-preview">
                <div class="hover-preview-title">${product.name}</div>
                <div class="hover-preview-specs">${productSpecs[product.id] || product.description}</div>
            </div>
            <div class="featured-card-image">
                <img src="${product.image}" alt="${product.name}" style="width:100%;height:100%;object-fit:contain;padding:0.5rem;">
            </div>
            <div class="featured-card-name">${product.name}</div>
            <div class="featured-card-price">$${product.price}</div>
        </div>
    `).join('');

    // Auto scroll
    let scrollPos = 0;
    setInterval(() => {
        scrollPos += 1;
        if (scrollPos >= track.scrollWidth - track.clientWidth) {
            scrollPos = 0;
        }
        track.scrollLeft = scrollPos;
    }, 30);
}

// Re-initialize with previews
initFeaturedCarouselWithPreviews();

// ===========================
// BUTTON LOADING STATE
// ===========================

const originalAddToCart = addToCart;

addToCart = async function(productId) {
    // Find the button that was clicked
    const buttons = document.querySelectorAll('.add-to-cart-btn');
    let clickedBtn = null;
    buttons.forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(productId)) {
            clickedBtn = btn;
        }
    });

    if (clickedBtn) {
        clickedBtn.classList.add('btn-loading');
        clickedBtn.textContent = 'Adding...';
    }

    await originalAddToCart(productId);

    if (clickedBtn) {
        setTimeout(() => {
            clickedBtn.classList.remove('btn-loading');
            clickedBtn.textContent = 'Add to Cart';
        }, 500);
    }
};


// ===========================
// COUPON CODE SYSTEM
// ===========================

let appliedCoupon = null;
const coupons = {
    'DRONE20': { discount: 0.20, label: '20% off' },
    'WELCOME10': { discount: 0.10, label: '10% off' },
    'FREESHIP': { discount: 0.05, label: '5% off + Free Shipping' }
};

document.getElementById('applyCoupon').addEventListener('click', () => {
    const code = document.getElementById('couponCode').value.trim().toUpperCase();
    const msgEl = document.getElementById('couponMessage');

    if (coupons[code]) {
        appliedCoupon = coupons[code];
        msgEl.textContent = `✓ Coupon applied: ${appliedCoupon.label}`;
        msgEl.className = 'coupon-message success';
        updateCheckoutTotal();
    } else if (code === '') {
        msgEl.textContent = '';
        msgEl.className = 'coupon-message';
    } else {
        appliedCoupon = null;
        msgEl.textContent = '✗ Invalid coupon code';
        msgEl.className = 'coupon-message error';
        updateCheckoutTotal();
    }
});

function updateCheckoutTotal() {
    const totalEl = document.getElementById('checkoutTotal');
    const rawTotal = parseFloat(totalEl.dataset.rawTotal || totalEl.textContent.replace('$', ''));
    
    if (appliedCoupon && rawTotal) {
        const discounted = rawTotal * (1 - appliedCoupon.discount);
        totalEl.textContent = `$${discounted.toFixed(2)}`;
    }
}

// Override openCheckout to store raw total
const originalOpenCheckout = openCheckout;
openCheckout = async function() {
    await originalOpenCheckout();
    const totalEl = document.getElementById('checkoutTotal');
    totalEl.dataset.rawTotal = totalEl.textContent.replace('$', '');
};

// ===========================
// MOBILE BOTTOM NAV BADGE
// ===========================

const originalLoadCartCount = loadCartCount;
loadCartCount = async function() {
    await originalLoadCartCount();
    const badge = document.getElementById('cartBadge');
    const mobileBadge = document.getElementById('mobileCartBadge');
    if (mobileBadge && badge) {
        mobileBadge.textContent = badge.textContent;
    }
};

// ===========================
// IMAGE LAZY LOADING
// ===========================

function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        images.forEach(img => {
            if (img.complete) {
                img.classList.add('loaded');
            } else {
                observer.observe(img);
                img.addEventListener('load', () => img.classList.add('loaded'));
            }
        });
    } else {
        images.forEach(img => img.classList.add('loaded'));
    }
}

// Run after products render
setTimeout(initLazyLoading, 1000);
