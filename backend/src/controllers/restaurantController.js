const { Restaurant, MenuItem } = require('../models');

exports.createRestaurant = async (req, res, next) => {
    try {
        const { name, address, latitude, longitude, cuisineType, openingTime, closingTime, city } = req.body;
        const restaurant = await Restaurant.create({
            userId: req.user.id,
            name, address, latitude, longitude, cuisineType, openingTime, closingTime, city
        });
        res.status(201).json({ message: 'Restaurant created successfully', restaurant });
    } catch (error) {
        next(error);
    }
};

exports.getAllRestaurants = async (req, res, next) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.json(restaurants);
    } catch (error) {
        next(error);
    }
};

exports.getRestaurantById = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id, {
            include: [{ model: MenuItem, as: 'menuItems' }]
        });
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        res.json(restaurant);
    } catch (error) {
        next(error);
    }
};

exports.updateRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        if (restaurant.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await restaurant.update(req.body);
        res.json({ message: 'Restaurant updated successfully', restaurant });
    } catch (error) {
        next(error);
    }
};

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const restaurant = await Restaurant.findByPk(req.params.id);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        if (restaurant.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await restaurant.destroy();
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        next(error);
    }
};
