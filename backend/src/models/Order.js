const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  restaurantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id',
    },
  },
  deliveryPersonId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  orderDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  timeOrdered: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  deliveryAddress: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  deliveryLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  deliveryLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered', 'cancelled'),
    allowNull: false,
    defaultValue: 'pending',
  },
  totalAmount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  scheduledDeliveryTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  predictedEtaMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  actualDeliveryTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  indexes: [
    { fields: ['userId'] },
    { fields: ['restaurantId'] },
    { fields: ['deliveryPersonId'] },
  ],
});

module.exports = Order;
