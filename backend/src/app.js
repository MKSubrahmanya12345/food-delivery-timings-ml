const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menu-items', menuRoutes); // Alternative for specific paths ??$$$
app.use('/api/orders', orderRoutes);
app.use('/api/deliveries', deliveryRoutes);

// Detailed Restaurant sub-routes
app.use('/api/restaurants/:restaurantId/menu-items', (req, res, next) => {
    req.restaurantId = req.params.restaurantId;
    next();
}, menuRoutes);

// Error Handling
app.use(errorHandler);

module.exports = app;
