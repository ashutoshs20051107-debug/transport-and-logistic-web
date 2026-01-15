require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// --- 1. MIDDLEWARE & CONFIGURATION ---
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'logistics_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 } 
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// --- 2. DATABASE CONNECTION ---
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/transportLogix';
mongoose.connect(mongoURI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ Connection Error:", err));

// --- 3. MODELS ---
const User = require('./models/User');
const Booking = require('./models/Booking');
const Contact = require('./models/Contact');

// --- 4. ROUTES ---

app.get('/', (req, res) => res.render('index'));
app.get('/service', (req, res) => res.render('service'));

// CONTACT ROUTES (Fixed Success variable error)
app.get('/contact', (req, res) => {
    // We must pass success: false here so the EJS knows the variable exists
    res.render('contact', { success: false }); 
});

app.post('/contact', async (req, res) => {
    try {
        const newMessage = new Contact(req.body);
        await newMessage.save();
        // Pass success: true after saving to database
        res.render('contact', { success: true });
    } catch (err) {
        res.status(500).send("Error saving message.");
    }
});

// TRACKING ROUTES
app.get('/tracking', (req, res) => res.render('tracking', { shipment: null, error: null }));

app.post('/tracking/search', async (req, res) => {
    const { trackingId } = req.body;
    try {
        const shipment = await Booking.findById(trackingId.trim());
        if (shipment) res.render('tracking', { shipment, error: null });
        else res.render('tracking', { shipment: null, error: "ID not found." });
    } catch (err) {
        res.render('tracking', { shipment: null, error: "Invalid ID format." });
    }
});

// AUTHENTICATION
app.get('/login', (req, res) => res.render('login', { error: null }));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            req.session.user = user;
            res.redirect('/dashboard');
        } else {
            res.render('login', { error: "Invalid Credentials" });
        }
    } catch (err) { res.render('login', { error: "Login error" }); }
});

app.get('/register', (req, res) => res.render('register', { error: null, success: false }));

app.post('/register', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.render('register', { error: null, success: true });
    } catch (err) { res.render('register', { error: "Registration failed", success: false }); }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// DASHBOARD & MANAGEMENT
app.get('/dashboard', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.render('dashboard', { bookings });
    } catch (err) { res.status(500).send("Dashboard Error"); }
});

app.post('/dashboard/status/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        await Booking.findByIdAndUpdate(req.params.id, { status: 'Delivered' });
        res.redirect('/dashboard');
    } catch (err) { res.status(500).send("Error updating status"); }
});

app.post('/dashboard/delete/:id', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        await Booking.findByIdAndDelete(req.params.id);
        res.redirect('/dashboard');
    } catch (err) { res.status(500).send("Error deleting booking"); }
});

app.get('/book', (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    res.render('book', { success: false, trackingId: null });
});

app.post('/book', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    try {
        const newBooking = new Booking(req.body);
        const saved = await newBooking.save();
        res.render('book', { success: true, trackingId: saved._id });
    } catch (err) { res.status(500).send("Booking Failed"); }
});

app.listen(3000, () => console.log(`🚀 Server: http://localhost:3000`));