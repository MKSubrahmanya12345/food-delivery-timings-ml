const express = require('express');
const router = express.Router();
const { createRestaurant, getAllRestaurants, getRestaurantById, updateRestaurant, deleteRestaurant } = require('../controllers/restaurantController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/', getAllRestaurants);
router.get('/:id', getRestaurantById);

router.post('/', protect, authorize('restaurant_owner'), createRestaurant);
router.put('/:id', protect, authorize('restaurant_owner'), updateRestaurant);
router.delete('/:id', protect, authorize('restaurant_owner'), deleteRestaurant);

module.exports = router;
