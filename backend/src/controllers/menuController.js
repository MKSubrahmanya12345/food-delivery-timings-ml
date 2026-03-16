const { MenuItem, Restaurant } = require('../models');

exports.addMenuItem = async (req, res, next) => {
    try {
        const { restaurantId } = req.params;
        const { name, description, price, category, imageUrl } = req.body;

        const restaurant = await Restaurant.findByPk(restaurantId);
        if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
        if (restaurant.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        const menuItem = await MenuItem.create({
            restaurantId, name, description, price, category, imageUrl
        });
        res.status(201).json({ message: 'Menu item added successfully', menuItem });
    } catch (error) {
        next(error);
    }
};

exports.getMenuItems = async (req, res, next) => {
    try {
        const menuItems = await MenuItem.findAll({ where: { restaurantId: req.params.restaurantId } });
        res.json(menuItems);
    } catch (error) {
        next(error);
    }
};

exports.getMenuItemById = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id);
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        res.json(menuItem);
    } catch (error) {
        next(error);
    }
};

exports.updateMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id, { include: ['restaurant'] });
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        if (menuItem.restaurant.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await menuItem.update(req.body);
        res.json({ message: 'Menu item updated successfully', menuItem });
    } catch (error) {
        next(error);
    }
};

exports.deleteMenuItem = async (req, res, next) => {
    try {
        const menuItem = await MenuItem.findByPk(req.params.id, { include: ['restaurant'] });
        if (!menuItem) return res.status(404).json({ message: 'Menu item not found' });
        if (menuItem.restaurant.userId !== req.user.id) return res.status(403).json({ message: 'Unauthorized' });

        await menuItem.destroy();
        res.json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        next(error);
    }
};
