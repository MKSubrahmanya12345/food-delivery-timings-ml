const express = require('express');
const router = express.Router();
const { Order } = require('../models');
const { protect } = require('../middleware/authMiddleware');

router.get('/:orderId/eta', protect, async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.orderId, {
            attributes: ['id', 'predictedEtaMinutes', 'status']
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json({
            orderId: order.id,
            predictedEtaMinutes: order.predictedEtaMinutes,
            currentStatus: order.status
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
