const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  deliveryPersonId: {
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
  deliveryPersonAge: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deliveryPersonRatings: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false,
  },
  restaurantLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  restaurantLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  deliveryLocationLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  deliveryLocationLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  orderDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  timeOrdered: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  timeOrderPicked: {
    type: DataTypes.TIME,
    allowNull: true,
  },
  weatherConditions: {
    type: DataTypes.ENUM('Sunny', 'Stormy', 'Sandstorms', 'Cloudy', 'Fog', 'Windy'),
    allowNull: true,
  },
  roadTrafficDensity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Jam'),
    allowNull: true,
  },
  vehicleCondition: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  typeOfOrder: {
    type: DataTypes.ENUM('Buffet', 'Drinks', 'Snack', 'Meal'),
    allowNull: false,
    defaultValue: 'Meal',
  },
  typeOfVehicle: {
    type: DataTypes.ENUM('Motorcycle', 'Scooter', 'Electric_scooter', 'Bicycle'),
    allowNull: false,
  },
  multipleDeliveries: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  festival: {
    type: DataTypes.ENUM('No', 'Yes'),
    allowNull: false,
    defaultValue: 'No',
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  predictedEtaMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  actualDeliveryMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

module.exports = Delivery;
