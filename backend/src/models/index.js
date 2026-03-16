const User = require('./User');
const Restaurant = require('./Restaurant');
const MenuItem = require('./MenuItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Delivery = require('./Delivery');
const { sequelize } = require('../config/db');

// User Associations
User.hasMany(Restaurant, { foreignKey: 'userId', as: 'ownedRestaurants' });
User.hasMany(Order, { foreignKey: 'userId', as: 'customerOrders' });
User.hasMany(Order, { foreignKey: 'deliveryPersonId', as: 'assignedDeliveries' });
User.hasMany(Delivery, { foreignKey: 'deliveryPersonId', as: 'deliveryRecords' });

// Restaurant Associations
Restaurant.belongsTo(User, { foreignKey: 'userId', as: 'owner' });
Restaurant.hasMany(MenuItem, { foreignKey: 'restaurantId', as: 'menuItems' });
Restaurant.hasMany(Order, { foreignKey: 'restaurantId', as: 'orders' });
Restaurant.hasMany(Delivery, { foreignKey: 'restaurantId', as: 'deliveryRecords' });

// MenuItem Associations
MenuItem.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menuItemId', as: 'orderItems' });

// Order Associations
Order.belongsTo(User, { foreignKey: 'userId', as: 'customer' });
Order.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });
Order.belongsTo(User, { foreignKey: 'deliveryPersonId', as: 'deliveryPerson' });
Order.hasMany(OrderItem, { foreignKey: 'orderId', as: 'items' });
Order.hasOne(Delivery, { foreignKey: 'orderId', as: 'deliveryDetails' });

// OrderItem Associations
OrderItem.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
OrderItem.belongsTo(MenuItem, { foreignKey: 'menuItemId', as: 'menuItem' });

// Delivery Associations
Delivery.belongsTo(Order, { foreignKey: 'orderId', as: 'order' });
Delivery.belongsTo(User, { foreignKey: 'deliveryPersonId', as: 'deliveryPerson' });
Delivery.belongsTo(Restaurant, { foreignKey: 'restaurantId', as: 'restaurant' });

module.exports = {
  sequelize,
  User,
  Restaurant,
  MenuItem,
  Order,
  OrderItem,
  Delivery,
};
