const express = require('express');
const router = express.Router({ mergeParams: true });
const { addMenuItem, getMenuItems, getMenuItemById, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);

router.post('/', protect, authorize('restaurant_owner'), addMenuItem);
router.put('/:id', protect, authorize('restaurant_owner'), updateMenuItem);
router.delete('/:id', protect, authorize('restaurant_owner'), deleteMenuItem);

module.exports = router;
