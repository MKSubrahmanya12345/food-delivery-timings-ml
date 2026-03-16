const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, updateOrderStatus, assignDelivery } = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.use(protect);

router.post('/', authorize('customer'), placeOrder);
router.get('/', getOrders); // Filtered by role in controller
router.put('/:id/status', authorize('restaurant_owner', 'delivery_person'), updateOrderStatus);
router.put('/:id/assign-delivery', authorize('restaurant_owner'), assignDelivery);

module.exports = router;
