const express = require('express');
const Database = require('better-sqlite3');
const cors = require('cors');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;
const JWT_SECRET = 'robotech-jwt-secret-change-in-production';

// ===========================
// MIDDLEWARE
// ===========================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve frontend files

app.use(session({
    secret: 'robotech-secret-key-change-in-production',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 24 hours
}));

// ===========================
// DATABASE SETUP
// ===========================

const db = new Database(path.join(__dirname, 'robotech.db'));

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');

// Create tables
db.exec(`
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT,
        features TEXT,
        brand TEXT,
        image TEXT,
        badge TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS carts (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS cart_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cart_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL DEFAULT 1,
        added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (cart_id) REFERENCES carts(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS orders (
        id TEXT PRIMARY KEY,
        session_id TEXT NOT NULL,
        user_id INTEGER,
        total REAL NOT NULL,
        status TEXT DEFAULT 'confirmed',
        customer_email TEXT,
        customer_name TEXT,
        shipping_address TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        confirmed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        processing_at DATETIME,
        shipped_at DATETIME,
        delivered_at DATETIME
    );

    CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id TEXT NOT NULL,
        product_id INTEGER NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY (order_id) REFERENCES orders(id),
        FOREIGN KEY (product_id) REFERENCES products(id)
    );

    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'customer',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT UNIQUE NOT NULL,
        subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
`);

// ===========================
// SEED PRODUCTS (if empty)
// ===========================

const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get();

if (productCount.count === 0) {
    const insertProduct = db.prepare(`
        INSERT INTO products (name, category, price, description, features, brand, image, badge)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const seedProducts = [
        ["SkyMaster Pro X1", "drones", 1299, "Professional 4K drone with advanced AI navigation", "ai,4k,gps", "skymaster", "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=400&h=400&fit=crop", "Best Seller"],
        ["DroneX Racing Edition", "drones", 899, "High-speed racing drone with carbon fiber body", "4k,gps", "robotech", "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=400&fit=crop", null],
        ["Industrial Cargo Drone", "drones", 4599, "Heavy-duty drone for industrial delivery tasks", "ai,autonomous,gps", "robotech", "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop", "Premium"],
        ["AeroView 360", "drones", 1599, "360° panoramic camera drone with AI tracking", "4k,gps,ai", "skymaster", "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=400&h=400&fit=crop", null],
        ["Mini Explorer Drone", "drones", 499, "Compact beginner-friendly drone with propeller guards", "4k", "skymaster", "https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=400&h=400&fit=crop", "Budget"],
        ["Vision AI Drone", "drones", 1999, "AI-powered surveillance and object tracking drone", "ai,4k,gps,autonomous", "robotech", "images/image (7).png", "Featured"],
        ["Cinema Pro Drone", "drones", 3499, "Professional cinematography drone with 8K camera", "4k,gps,ai", "skymaster", "images/image (2).png", "Pro"],
        ["SpeedRacer FPV", "drones", 799, "High-performance FPV racing drone", "gps", "robotech", "images/image (1).png", "Popular"],
        ["Tactical Security Drone", "drones", 2199, "Professional security and monitoring drone", "ai,autonomous,gps", "autobot", "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=400&h=400&fit=crop", null],
        ["Delivery Drone XL", "drones", 3999, "Large capacity autonomous delivery drone", "ai,autonomous,gps", "robotech", "images/image (3).png", "New"],
        ["Pocket Drone Mini", "drones", 299, "Ultra-portable pocket-sized drone", "", "skymaster", "images/image (4).png", null],
        ["Pro Camera Drone", "drones", 1899, "Professional drone with advanced camera gimbal", "4k,ai,gps", "skymaster", "images/image (5).png", null]
    ];

    const insertMany = db.transaction((products) => {
        for (const p of products) {
            insertProduct.run(...p);
        }
    });

    insertMany(seedProducts);
    console.log('✅ Database seeded with', seedProducts.length, 'products');
}

// Seed admin user if not exists
const adminExists = db.prepare('SELECT COUNT(*) as count FROM users WHERE role = ?').get('admin');
if (adminExists.count === 0) {
    const hashedPassword = bcrypt.hashSync('admin123', 10);
    db.prepare('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)').run('Admin', 'admin@robotech.com', hashedPassword, 'admin');
    console.log('✅ Admin user created (admin@robotech.com / admin123)');
}

// ===========================
// HELPER: Get or create cart
// ===========================

function getOrCreateCart(sessionId) {
    let cart = db.prepare('SELECT * FROM carts WHERE session_id = ?').get(sessionId);

    if (!cart) {
        const cartId = uuidv4();
        db.prepare('INSERT INTO carts (id, session_id) VALUES (?, ?)').run(cartId, sessionId);
        cart = { id: cartId, session_id: sessionId };
    }

    return cart;
}

// ===========================
// API ROUTES: PRODUCTS
// ===========================

// GET /api/products - List all products with optional filters
app.get('/api/products', (req, res) => {
    const { category, brand, minPrice, maxPrice, features, sort } = req.query;

    let query = 'SELECT * FROM products WHERE 1=1';
    const params = [];

    if (category && category !== 'all') {
        query += ' AND category = ?';
        params.push(category);
    }

    if (brand) {
        const brands = brand.split(',');
        query += ` AND brand IN (${brands.map(() => '?').join(',')})`;
        params.push(...brands);
    }

    if (minPrice) {
        query += ' AND price >= ?';
        params.push(parseFloat(minPrice));
    }

    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(parseFloat(maxPrice));
    }

    if (features) {
        const featureList = features.split(',');
        featureList.forEach(feature => {
            query += ' AND features LIKE ?';
            params.push(`%${feature}%`);
        });
    }

    // Sorting
    switch (sort) {
        case 'price-low':
            query += ' ORDER BY price ASC';
            break;
        case 'price-high':
            query += ' ORDER BY price DESC';
            break;
        case 'newest':
            query += ' ORDER BY id DESC';
            break;
        default:
            query += ' ORDER BY id ASC';
    }

    const products = db.prepare(query).all(...params);

    // Convert features string to array
    const formatted = products.map(p => ({
        ...p,
        features: p.features ? p.features.split(',').filter(Boolean) : []
    }));

    res.json({ success: true, products: formatted, total: formatted.length });
});

// GET /api/products/:id - Get single product
app.get('/api/products/:id', (req, res) => {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);

    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    product.features = product.features ? product.features.split(',').filter(Boolean) : [];
    res.json({ success: true, product });
});

// ===========================
// API ROUTES: CART
// ===========================

// GET /api/cart - Get current cart
app.get('/api/cart', (req, res) => {
    const cart = getOrCreateCart(req.session.id);

    const items = db.prepare(`
        SELECT ci.id as cart_item_id, ci.quantity, ci.added_at,
               p.id as product_id, p.name, p.price, p.image, p.brand, p.category
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
        ORDER BY ci.added_at DESC
    `).all(cart.id);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
        success: true,
        cart: {
            id: cart.id,
            items,
            total: Math.round(total * 100) / 100,
            totalItems
        }
    });
});

// POST /api/cart/items - Add item to cart
app.post('/api/cart/items', (req, res) => {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
        return res.status(400).json({ success: false, error: 'productId is required' });
    }

    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(productId);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }

    const cart = getOrCreateCart(req.session.id);

    // Check if item already in cart
    const existingItem = db.prepare(
        'SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?'
    ).get(cart.id, productId);

    if (existingItem) {
        // Update quantity
        db.prepare(
            'UPDATE cart_items SET quantity = quantity + ? WHERE id = ?'
        ).run(quantity, existingItem.id);
    } else {
        // Add new item
        db.prepare(
            'INSERT INTO cart_items (cart_id, product_id, quantity) VALUES (?, ?, ?)'
        ).run(cart.id, productId, quantity);
    }

    // Update cart timestamp
    db.prepare('UPDATE carts SET updated_at = CURRENT_TIMESTAMP WHERE id = ?').run(cart.id);

    // Return updated cart
    const items = db.prepare(`
        SELECT ci.id as cart_item_id, ci.quantity,
               p.id as product_id, p.name, p.price, p.image
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
    `).all(cart.id);

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

    res.status(201).json({
        success: true,
        message: `${product.name} added to cart`,
        cart: { total: Math.round(total * 100) / 100, totalItems }
    });
});

// PATCH /api/cart/items/:id - Update item quantity
app.patch('/api/cart/items/:id', (req, res) => {
    const { quantity } = req.body;
    const cartItemId = req.params.id;

    if (!quantity || quantity < 0) {
        return res.status(400).json({ success: false, error: 'Valid quantity is required' });
    }

    if (quantity === 0) {
        db.prepare('DELETE FROM cart_items WHERE id = ?').run(cartItemId);
    } else {
        db.prepare('UPDATE cart_items SET quantity = ? WHERE id = ?').run(quantity, cartItemId);
    }

    res.json({ success: true, message: 'Cart updated' });
});

// DELETE /api/cart/items/:id - Remove item from cart
app.delete('/api/cart/items/:id', (req, res) => {
    const result = db.prepare('DELETE FROM cart_items WHERE id = ?').run(req.params.id);

    if (result.changes === 0) {
        return res.status(404).json({ success: false, error: 'Item not found' });
    }

    res.json({ success: true, message: 'Item removed from cart' });
});

// DELETE /api/cart - Clear entire cart
app.delete('/api/cart', (req, res) => {
    const cart = getOrCreateCart(req.session.id);
    db.prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cart.id);

    res.json({ success: true, message: 'Cart cleared' });
});

// ===========================
// API ROUTES: ORDERS
// ===========================

// POST /api/orders - Create order from cart
app.post('/api/orders', (req, res) => {
    const { email, name, address } = req.body;
    const cart = getOrCreateCart(req.session.id);

    const items = db.prepare(`
        SELECT ci.quantity, p.id as product_id, p.price, p.name
        FROM cart_items ci
        JOIN products p ON ci.product_id = p.id
        WHERE ci.cart_id = ?
    `).all(cart.id);

    if (items.length === 0) {
        return res.status(400).json({ success: false, error: 'Cart is empty' });
    }

    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const orderId = uuidv4();

    const createOrder = db.transaction(() => {
        db.prepare(
            'INSERT INTO orders (id, session_id, total, customer_email, customer_name, shipping_address, status, confirmed_at) VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)'
        ).run(orderId, req.session.id, total, email || null, name || null, address || null, 'confirmed');

        const insertOrderItem = db.prepare(
            'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)'
        );

        for (const item of items) {
            insertOrderItem.run(orderId, item.product_id, item.quantity, item.price);
        }

        db.prepare('DELETE FROM cart_items WHERE cart_id = ?').run(cart.id);
    });

    createOrder();

    res.status(201).json({
        success: true,
        order: {
            id: orderId,
            total: Math.round(total * 100) / 100,
            itemCount: items.length,
            status: 'confirmed'
        }
    });
});

// GET /api/orders - Get user's orders
app.get('/api/orders', (req, res) => {
    const orders = db.prepare(
        'SELECT * FROM orders WHERE session_id = ? ORDER BY created_at DESC'
    ).all(req.session.id);

    res.json({ success: true, orders });
});

// GET /api/orders/:id - Get single order details
app.get('/api/orders/:id', (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const items = db.prepare(`
        SELECT oi.*, p.name, p.image
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
    `).all(order.id);

    res.json({ success: true, order: { ...order, items } });
});

// ===========================
// API ROUTES: NEWSLETTER
// ===========================

app.post('/api/newsletter', (req, res) => {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ success: false, error: 'Valid email is required' });
    }

    try {
        db.prepare('INSERT INTO newsletter_subscribers (email) VALUES (?)').run(email);
        res.status(201).json({ success: true, message: 'Successfully subscribed!' });
    } catch (err) {
        if (err.code === 'SQLITE_CONSTRAINT_UNIQUE') {
            res.json({ success: true, message: 'Already subscribed!' });
        } else {
            res.status(500).json({ success: false, error: 'Something went wrong' });
        }
    }
});

// ===========================
// API ROUTES: STATS
// ===========================

app.get('/api/stats', (req, res) => {
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const totalSubscribers = db.prepare('SELECT COUNT(*) as count FROM newsletter_subscribers').get().count;

    res.json({
        success: true,
        stats: {
            totalProducts,
            totalOrders,
            totalSubscribers,
            dronesSold: 500,
            countriesServed: 50,
            satisfaction: 98,
            awards: 25
        }
    });
});

// ===========================
// AUTH MIDDLEWARE
// ===========================

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, error: 'Access token required' });
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ success: false, error: 'Invalid or expired token' });
    }
}

function requireAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ success: false, error: 'Admin access required' });
    }
    next();
}

// ===========================
// API ROUTES: AUTH
// ===========================

// POST /api/auth/signup
app.post('/api/auth/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ success: false, error: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, error: 'Password must be at least 6 characters' });
    }

    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
        return res.status(409).json({ success: false, error: 'Email already registered' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const result = db.prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)').run(name, email, hashedPassword);

    const token = jwt.sign({ id: result.lastInsertRowid, email, name, role: 'customer' }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
        success: true,
        message: 'Account created successfully',
        token,
        user: { id: result.lastInsertRowid, name, email, role: 'customer' }
    });
});

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
        return res.status(401).json({ success: false, error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
        success: true,
        message: 'Login successful',
        token,
        user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
});

// GET /api/auth/me
app.get('/api/auth/me', authenticateToken, (req, res) => {
    const user = db.prepare('SELECT id, name, email, role, created_at FROM users WHERE id = ?').get(req.user.id);
    res.json({ success: true, user });
});

// ===========================
// API ROUTES: ORDER TRACKING
// ===========================

// GET /api/orders/:id/tracking
app.get('/api/orders/:id/tracking', (req, res) => {
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);

    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const items = db.prepare(`
        SELECT oi.*, p.name, p.image
        FROM order_items oi
        JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ?
    `).all(order.id);

    const timeline = [
        { status: 'confirmed', label: 'Order Confirmed', time: order.confirmed_at, icon: '✓', active: true },
        { status: 'processing', label: 'Processing', time: order.processing_at, icon: '⚙️', active: !!order.processing_at },
        { status: 'shipped', label: 'Shipped', time: order.shipped_at, icon: '🚚', active: !!order.shipped_at },
        { status: 'delivered', label: 'Delivered', time: order.delivered_at, icon: '📦', active: !!order.delivered_at }
    ];

    res.json({
        success: true,
        order: { ...order, items },
        timeline
    });
});

// ===========================
// API ROUTES: ADMIN
// ===========================

// GET /api/admin/dashboard
app.get('/api/admin/dashboard', authenticateToken, requireAdmin, (req, res) => {
    const totalProducts = db.prepare('SELECT COUNT(*) as count FROM products').get().count;
    const totalOrders = db.prepare('SELECT COUNT(*) as count FROM orders').get().count;
    const totalUsers = db.prepare('SELECT COUNT(*) as count FROM users').get().count;
    const totalRevenue = db.prepare('SELECT COALESCE(SUM(total), 0) as total FROM orders').get().total;
    const recentOrders = db.prepare(`
        SELECT o.*, 
               (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
        FROM orders o 
        ORDER BY o.created_at DESC LIMIT 10
    `).all();

    const ordersByStatus = db.prepare(`
        SELECT status, COUNT(*) as count FROM orders GROUP BY status
    `).all();

    // Revenue by day (last 7 days)
    const revenueByDay = db.prepare(`
        SELECT DATE(created_at) as date, SUM(total) as revenue, COUNT(*) as orders
        FROM orders
        WHERE created_at >= datetime('now', '-7 days')
        GROUP BY DATE(created_at)
        ORDER BY date ASC
    `).all();

    res.json({
        success: true,
        dashboard: {
            totalProducts,
            totalOrders,
            totalUsers,
            totalRevenue: Math.round(totalRevenue * 100) / 100,
            recentOrders,
            ordersByStatus,
            revenueByDay
        }
    });
});

// GET /api/admin/orders
app.get('/api/admin/orders', authenticateToken, requireAdmin, (req, res) => {
    const orders = db.prepare(`
        SELECT o.*,
               (SELECT COUNT(*) FROM order_items WHERE order_id = o.id) as item_count
        FROM orders o
        ORDER BY o.created_at DESC
    `).all();

    res.json({ success: true, orders });
});

// PATCH /api/admin/orders/:id/status
app.patch('/api/admin/orders/:id/status', authenticateToken, requireAdmin, (req, res) => {
    const { status } = req.body;
    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered'];

    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, error: 'Invalid status' });
    }

    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(req.params.id);
    if (!order) {
        return res.status(404).json({ success: false, error: 'Order not found' });
    }

    const timeField = `${status}_at`;
    db.prepare(`UPDATE orders SET status = ?, ${timeField} = CURRENT_TIMESTAMP WHERE id = ?`).run(status, req.params.id);

    res.json({ success: true, message: `Order status updated to ${status}` });
});

// GET /api/admin/products
app.get('/api/admin/products', authenticateToken, requireAdmin, (req, res) => {
    const products = db.prepare('SELECT * FROM products ORDER BY id ASC').all();
    res.json({ success: true, products });
});

// POST /api/admin/products
app.post('/api/admin/products', authenticateToken, requireAdmin, (req, res) => {
    const { name, category, price, description, features, brand, image, badge } = req.body;

    if (!name || !price) {
        return res.status(400).json({ success: false, error: 'Name and price are required' });
    }

    const result = db.prepare(
        'INSERT INTO products (name, category, price, description, features, brand, image, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
    ).run(name, category || 'drones', price, description || '', features || '', brand || '', image || '', badge || null);

    res.status(201).json({ success: true, productId: result.lastInsertRowid });
});

// DELETE /api/admin/products/:id
app.delete('/api/admin/products/:id', authenticateToken, requireAdmin, (req, res) => {
    const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, message: 'Product deleted' });
});

// GET /api/admin/users
app.get('/api/admin/users', authenticateToken, requireAdmin, (req, res) => {
    const users = db.prepare('SELECT id, name, email, role, created_at FROM users ORDER BY created_at DESC').all();
    res.json({ success: true, users });
});

// ===========================
// START SERVER
// ===========================

app.listen(PORT, () => {
    console.log('');
    console.log('🤖 ═══════════════════════════════════════');
    console.log('   RoboTech Store Backend');
    console.log('═══════════════════════════════════════════');
    console.log(`   🌐 Server:  http://localhost:${PORT}`);
    console.log(`   📦 API:     http://localhost:${PORT}/api`);
    console.log('   📁 DB:      robotech.db (SQLite)');
    console.log('═══════════════════════════════════════════');
    console.log('');
    console.log('   API Endpoints:');
    console.log('   GET    /api/products       - List products');
    console.log('   GET    /api/products/:id   - Get product');
    console.log('   GET    /api/cart           - View cart');
    console.log('   POST   /api/cart/items     - Add to cart');
    console.log('   PATCH  /api/cart/items/:id - Update quantity');
    console.log('   DELETE /api/cart/items/:id - Remove item');
    console.log('   DELETE /api/cart           - Clear cart');
    console.log('   POST   /api/orders         - Place order');
    console.log('   GET    /api/orders         - View orders');
    console.log('   POST   /api/newsletter     - Subscribe');
    console.log('');
});
