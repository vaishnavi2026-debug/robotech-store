# 🤖 RoboTech Store

A full-stack e-commerce platform for premium drones and robotics.

![Node.js](https://img.shields.io/badge/Node.js-v24-green) ![Express](https://img.shields.io/badge/Express-4.x-blue) ![SQLite](https://img.shields.io/badge/SQLite-3-orange)

## Features

- 🛒 Full e-commerce flow (browse, filter, cart, checkout, order tracking)
- 🔐 JWT authentication (signup/login/roles)
- 🛡️ Admin dashboard (orders, products, users, revenue chart)
- ⚖️ Drone comparison tool (side-by-side specs)
- 💬 Live chat widget with smart responses
- 🎨 Dark/Light theme toggle
- 📱 Responsive design with mobile bottom navigation
- ✨ Animations (particles, scroll reveal, confetti, fly-to-cart)
- 🔍 Live search with keyboard shortcut
- ❤️ Wishlist with localStorage persistence
- 🎟️ Coupon code system

## Quick Start

```bash
npm install
node server.js
```

Open **http://localhost:3000**

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@robotech.com | admin123 |

## Pages

- `/` — Store homepage
- `/product.html?id=X` — Product detail
- `/compare.html` — Compare drones
- `/auth.html` — Login/Signup
- `/admin.html` — Admin dashboard
- `/tracking.html` — Order tracking

## Tech Stack

- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Backend:** Node.js, Express.js
- **Database:** SQLite (better-sqlite3)
- **Auth:** JWT + bcrypt

## API

Full REST API with 20+ endpoints for products, cart, orders, auth, and admin operations.

---

*Built with ❤️ by RoboTech Team*
