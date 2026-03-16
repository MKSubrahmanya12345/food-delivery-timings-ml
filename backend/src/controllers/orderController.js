const { Order, OrderItem, MenuItem, Restaurant, User, Delivery } = require('../models');
const axios = require('axios');
require('dotenv').config();

exports.placeOrder = async (req, res, next) => {
    try {
        const { restaurantId, deliveryAddress, deliveryLatitude, deliveryLongitude, scheduledDeliveryTime, items } = req.body;

        let totalAmount = 0;
        const processedItems = [];

        for (const item of items) {
            const menuItem = await MenuItem.findByPk(item.menuItemId);
            if (!menuItem) return res.status(404).json({ message: `Item ${item.menuItemId} not found` });
            totalAmount += parseFloat(menuItem.price) * item.quantity;
            processedItems.push({
                menuItemId: item.menuItemId,
                quantity: item.quantity,
                priceAtOrder: menuItem.price
            });
        }

        const now = new Date();
        const orderDate = now.toISOString().split('T')[0];
        const timeOrdered = now.toTimeString().split(' ')[0];

        const order = await Order.create({
            userId: req.user.id,
            restaurantId,
            deliveryAddress,
            deliveryLatitude,
            deliveryLongitude,
            scheduledDeliveryTime,
            orderDate,
            timeOrdered,
            totalAmount,
            status: 'pending'
        });

        for (const pItem of processedItems) {
            await OrderItem.create({ ...pItem, orderId: order.id });
        }

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (error) {
        next(error);
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const { role, id } = req.user;
        let where = {};
        if (role === 'customer') where = { userId: id };
        else if (role === 'delivery_person') where = { deliveryPersonId: id };
        else if (role === 'restaurant_owner') {
            const ownedRestaurants = await Restaurant.findAll({ where: { userId: id }, attributes: ['id'] });
            where = { restaurantId: ownedRestaurants.map(r => r.id) };
        }

        const orders = await Order.findAll({
            where,
            include: [
                { model: Restaurant, as: 'restaurant' },
                { model: User, as: 'customer', attributes: ['name', 'email'] },
                { model: User, as: 'deliveryPerson', attributes: ['name'] },
                { model: OrderItem, as: 'items', include: [{ model: MenuItem, as: 'menuItem' }] }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.json(orders);
    } catch (error) {
        next(error);
    }
};

exports.updateOrderStatus = async (req, res, next) => {
    try {
        const { status, timeOrderPicked } = req.body;
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: Delivery, as: 'deliveryDetails' }]
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });

        // Update status
        await order.update({ status });

        if (status === 'out_for_delivery' && timeOrderPicked) {
            // Re-calculate ETA if needed or update delivery record
            if (order.deliveryDetails) {
                await order.deliveryDetails.update({ timeOrderPicked });
                // Call ML Service for refined prediction ??$$$
                try {
                    const response = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, {
                        ...order.deliveryDetails.toJSON(),
                        timeOrderPicked
                    });
                    const predictedEta = response.data.predicted_eta;
                    await order.update({ predictedEtaMinutes: predictedEta });
                } catch (mlError) {
                    console.error('ML Prediction failed:', mlError.message);
                }
            }
        }

        if (status === 'delivered') {
            await order.update({ actualDeliveryTime: new Date() });
            if (order.deliveryDetails) {
                 // Calculate actual minutes ??$$$
                 const picked = order.deliveryDetails.timeOrderPicked; 
                 // Simple diff for now
                 await order.deliveryDetails.update({ actualDeliveryMinutes: 30 }); // Placeholder
            }
        }

        res.json({ message: 'Order status updated', order });
    } catch (error) {
        next(error);
    }
};

exports.assignDelivery = async (req, res, next) => {
    try {
        const { deliveryPersonId } = req.body;
        const order = await Order.findByPk(req.params.id, {
            include: [{ model: Restaurant, as: 'restaurant' }]
        });
        const deliveryPerson = await User.findByPk(deliveryPersonId);

        if (!order || !deliveryPerson) return res.status(404).json({ message: 'Order or Delivery Person not found' });

        await order.update({ deliveryPersonId, status: 'confirmed' });

        // Create Delivery record for ML
        const deliveryData = {
            orderId: order.id,
            deliveryPersonId,
            restaurantId: order.restaurantId,
            deliveryPersonAge: deliveryPerson.deliveryPersonAge || 25,
            deliveryPersonRatings: deliveryPerson.deliveryPersonRatings || 4.5,
            restaurantLatitude: order.restaurant.latitude,
            restaurantLongitude: order.restaurant.longitude,
            deliveryLocationLatitude: order.deliveryLatitude,
            deliveryLocationLongitude: order.deliveryLongitude,
            orderDate: order.orderDate,
            timeOrdered: order.timeOrdered,
            vehicleCondition: deliveryPerson.vehicleCondition === 'Good' ? 0 : 1,
            typeOfVehicle: deliveryPerson.typeOfVehicle || 'Motorcycle',
            city: order.restaurant.city || 'Metropolitian'
        };

        const delivery = await Delivery.create(deliveryData);

        // Call ML Service
        try {
            const response = await axios.post(`${process.env.ML_SERVICE_URL}/predict`, deliveryData);
            const predictedEta = response.data.predicted_eta;
            await order.update({ predictedEtaMinutes: predictedEta });
            await delivery.update({ predictedEtaMinutes: predictedEta });
        } catch (mlError) {
            console.error('ML Prediction failed:', mlError.message);
        }

        res.json({ message: 'Delivery person assigned', order });
    } catch (error) {
        next(error);
    }
};
