# RoboTech Store — Project Presentation

---

## 1. Project Overview

**RoboTech Store** is a full-stack e-commerce platform specializing in premium drones and robotics. Built with a modern dark-themed UI, complete backend API, admin dashboard, user authentication, and a rich set of interactive features.

**Tagline:** *Discover cutting-edge drones — the future of autonomous technology.*

---

## 2. Problem Statement

- The drone market is booming but most platforms treat drones as a subcategory of electronics
- Buyers can't easily compare drones by technical specs (flight time, speed, AI, autonomy)
- No dedicated, premium shopping experience tailored to drone enthusiasts and professionals

---

## 3. Solution

A dedicated full-stack drone e-commerce platform with:
- Advanced filtering by features, brand, and price
- Side-by-side drone comparison tool
- Complete purchase flow (cart → checkout → order tracking)
- Admin dashboard for business management
- Responsive, animated UI that reflects the futuristic product line

---

## 4. Target Audience

| Segment | Use Case |
|---------|----------|
| Professional Filmmakers | Cinema-grade drones with 4K/8K cameras |
| Industrial Operators | Cargo delivery, surveillance, inspection |
| Security Firms | AI-powered autonomous monitoring |
| Racing Enthusiasts | FPV and high-speed racing drones |
| Hobbyists & Beginners | Affordable, beginner-friendly drones |

---

## 5. Key Features

### 5.1 Frontend Features
- **Hero Slider** — Auto-rotating showcase with particle background
- **Advanced Filtering** — Category, price range, features, brand, sorting
- **Product Detail Pages** — Full specs table, image gallery, related products, star ratings
- **Drone Comparison Tool** — Select 2-3 drones, compare specs side-by-side with best values highlighted
- **Live Search** — Instant product search with keyboard shortcut (/)
- **Dark/Light Theme** — Toggle with localStorage persistence
- **Scroll Animations** — Reveal on scroll, skeleton loading, page transitions
- **Recently Viewed** — Tracks browsing history
- **FAQ Accordion** — Common questions with expand/collapse
- **Video Section** — Embedded drone showcase video
- **Testimonials Carousel** — Customer reviews with auto-advance
- **Newsletter Signup** — Email subscription with backend storage
- **Promo Banner** — Scrolling announcements at top
- **Trust Badges** — Secure Payment, FAA Compliant, ISO Certified
- **Mobile Bottom Nav** — Fixed icons for Home, Search, Cart, Account
- **Live Chat Widget** — AI chatbot with smart responses

### 5.2 E-Commerce Flow
- **Cart Drawer** — Slide-out panel with quantity controls, item removal
- **Wishlist** — Heart icon on all products, persists in localStorage
- **Checkout** — Full form with name, email, address, card (auto-formatted)
- **Coupon Codes** — DRONE20 (20% off), WELCOME10 (10% off), FREESHIP (5% off)
- **Order Confirmation** — Confetti celebration + order summary
- **Order Tracking** — Visual timeline (Confirmed → Processing → Shipped → Delivered)
- **Fly-to-Cart Animation** — Product flies to cart icon on add

### 5.3 Authentication
- **Sign Up / Sign In** — JWT-based authentication
- **User Dropdown** — Initials avatar, logout, links to tracking/admin
- **Role-based Access** — Customer vs Admin roles

### 5.4 Admin Dashboard
- **Overview** — Revenue, orders, products, users with animated counters
- **Revenue Chart** — Bar chart showing last 7 days
- **Order Management** — View all orders, update status via dropdown
- **Product Management** — View/delete products
- **User Management** — View all registered users
- **Protected Routes** — JWT + Admin role required

### 5.5 Additional Pages
- **Product Detail** (`/product.html?id=X`) — Full specs, gallery, related products
- **Compare Drones** (`/compare.html`) — Side-by-side comparison
- **Order Tracking** (`/tracking.html`) — Status timeline by order ID
- **Auth** (`/auth.html`) — Login/Signup with tabs
- **Admin** (`/admin.html`) — Dashboard with login
- **404 Page** (`/404.html`) — Animated "drone lost" page

---

## 6. Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | HTML5, CSS3 (Custom Properties), Vanilla JavaScript |
| Backend | Node.js + Express.js |
| Database | SQLite (via better-sqlite3) |
| Auth | JWT (jsonwebtoken) + bcrypt |
| Sessions | express-session |
| Typography | Google Fonts (Inter, Orbitron) |
| Design | CSS Variables, Dark/Light theming |

---

## 7. Architecture

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│  index.html • product.html • compare.html       │
│  admin.html • auth.html • tracking.html         │
│  404.html                                       │
├─────────────────────────────────────────────────┤
│                   REST API                       │
│  /api/products • /api/cart • /api/orders         │
│  /api/auth • /api/admin • /api/newsletter        │
├─────────────────────────────────────────────────┤
│                 Node.js + Express                │
│  JWT Auth • Session Management • CORS           │
├─────────────────────────────────────────────────┤
│                   SQLite DB                      │
│  products • users • carts • cart_items           │
│  orders • order_items • newsletter_subscribers   │
└─────────────────────────────────────────────────┘
```

---

## 8. API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (with filters) |
| GET | /api/products/:id | Get single product |
| GET | /api/cart | View current cart |
| POST | /api/cart/items | Add item to cart |
| PATCH | /api/cart/items/:id | Update quantity |
| DELETE | /api/cart/items/:id | Remove item |
| DELETE | /api/cart | Clear cart |
| POST | /api/orders | Place order |
| GET | /api/orders | View orders |
| GET | /api/orders/:id/tracking | Order tracking timeline |
| POST | /api/auth/signup | Create account |
| POST | /api/auth/login | Login (returns JWT) |
| GET | /api/auth/me | Get current user |
| GET | /api/admin/dashboard | Admin stats |
| GET | /api/admin/orders | All orders |
| PATCH | /api/admin/orders/:id/status | Update order status |
| GET | /api/admin/products | All products |
| POST | /api/admin/products | Add product |
| DELETE | /api/admin/products/:id | Delete product |
| GET | /api/admin/users | All users |
| POST | /api/newsletter | Subscribe |

---

## 9. Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@robotech.com | admin123 |
| Customer | (create via signup) | — |

---

## 10. Demo Flow (Presentation)

1. **Homepage** — Show hero slider, particle effects, scroll animations
2. **Browse Products** — Filter by brand, features; show skeleton loading
3. **Product Detail** — Click a drone, show specs table, star rating, related products
4. **Compare** — Open compare tool, pick 3 drones, show side-by-side specs
5. **Search** — Press `/` to open search, find a drone instantly
6. **Add to Cart** — Show fly-to-cart animation, open cart drawer
7. **Checkout** — Apply coupon DRONE20, fill form, place order
8. **Confetti** — Show celebration + order confirmation
9. **Track Order** — Copy order ID, go to tracking page, show timeline
10. **Admin Panel** — Login as admin, show dashboard, update order to "shipped"
11. **Chat Widget** — Open chat, ask "recommend" or "shipping"
12. **Theme Toggle** — Switch to light mode
13. **Mobile View** — Resize to show responsive design + bottom nav

---

## 11. Project Structure

```
project/
├── index.html              — Main store page
├── product.html            — Product detail page
├── compare.html            — Drone comparison tool
├── admin.html              — Admin dashboard
├── auth.html               — Login/Signup
├── tracking.html           — Order tracking
├── 404.html                — 404 page
├── styles.css              — Complete design system (900+ lines)
├── script.js               — Main page logic (1000+ lines)
├── product-detail.js       — Product page logic
├── product.css             — Product page styles
├── compare.js              — Comparison logic
├── compare.css             — Comparison styles
├── admin.js                — Admin dashboard logic
├── admin.css               — Admin styles
├── server.js               — Backend API server
├── package.json            — Node.js dependencies
├── images/                 — Product images
└── RoboTech_Presentation.md — This document
```

---

## 12. Roadmap

| Phase | Status |
|-------|--------|
| Static frontend + product catalog | ✅ Complete |
| Backend API + database | ✅ Complete |
| Cart + Checkout + Orders | ✅ Complete |
| User authentication (JWT) | ✅ Complete |
| Admin dashboard | ✅ Complete |
| Product comparison tool | ✅ Complete |
| Order tracking | ✅ Complete |
| Animations & UX polish | ✅ Complete |
| Live chat widget | ✅ Complete |
| Coupon system | ✅ Complete |
| Mobile responsive + bottom nav | ✅ Complete |
| PWA (installable app) | 🔲 Planned |
| Payment gateway (Stripe/Razorpay) | 🔲 Planned |
| Deploy to production | 🔲 Planned |

---

## 13. How to Run

```bash
# Install dependencies
npm install

# Start the server
node server.js

# Open in browser
http://localhost:3000
```

---

*Built with ❤️ for RoboTech — June 2026*
