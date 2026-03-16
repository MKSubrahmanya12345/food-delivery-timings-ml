# DeliverEase AI — CodeME.md

## 1. Project Overview & Business Goal

**DeliverEase AI** is a next-generation food delivery application designed for a 24-hour hackathon, aiming to secure an 'A' grade in a DBMS class. Its core innovation lies in empowering users to specify a desired delivery time for their orders and then leveraging a sophisticated AI predictive model to provide hyper-accurate Estimated Time of Arrival (ETA) for food deliveries.

**Core Problem Solved:** Inaccurate and unpredictable delivery times are a major pain point in food delivery. Existing apps often provide static or loosely estimated ETAs, leading to customer frustration and operational inefficiencies. DeliverEase AI addresses this by allowing customers to *schedule* deliveries and dynamically adjusting ETAs based on real-time and historical data.

**User Roles:**
*   **Customer:** Browses restaurants, views menus, places timed orders, tracks delivery status, and sees AI-predicted ETAs.
*   **Restaurant Owner:** Manages restaurant details, menu items, and processes incoming orders.
*   **Delivery Person:** Receives delivery assignments, updates delivery status, and uses optimized routes/ETAs.

**Hackathon Context & Winning Angle:**
This project is built by two developers within a 24-hour hackathon timeframe, with a strong emphasis on demonstrating a robust DBMS design for an 'A' grade. The winning angle is the seamless integration of a three-schema DBMS architecture (External: React UI, Conceptual: Node.js/Sequelize ORM, Internal: MySQL) with a cutting-edge, personalized AI predictive model (trained on Kaggle data) for delivery ETAs. This combination showcases both strong database fundamentals and innovative AI application, making it a standout entry.

## 2. Tech Stack (Exact Versions)

| Component           | Technology           | Version     | Description                                                                 |
| :------------------ | :------------------- | :---------- | :-------------------------------------------------------------------------- |
| **Frontend**        | React                | `^18.2.0`   | UI library for building interactive user interfaces.                        |
|                     | Vite                 | `^5.0.0`    | Fast development build tool for React.                                      |
|                     | Axios                | `^1.6.0`    | Promise-based HTTP client for the browser and Node.js.                      |
|                     | React Router DOM     | `^6.21.0`   | Declarative routing for React.                                              |
|                     | Tailwind CSS         | `^3.4.0`    | Utility-first CSS framework for rapid UI development.                       |
| **Backend**         | Node.js              | `^20.10.0`  | JavaScript runtime environment.                                             |
|                     | Express              | `^4.18.2`   | Fast, unopinionated, minimalist web framework for Node.js.                  |
|                     | Sequelize            | `^6.35.2`   | Promise-based Node.js ORM for MySQL.                                        |
|                     | MySQL2               | `^3.6.5`    | MySQL client for Node.js, used by Sequelize.                                |
|                     | Dotenv               | `^16.3.1`   | Loads environment variables from a `.env` file.                             |
|                     | Bcrypt.js            | `^5.1.1`    | Library for hashing passwords.                                              |
|                     | JSON Web Token (JWT) | `^9.0.2`    | Standard for creating access tokens.                                        |
|                     | Cors                 | `^2.8.5`    | Node.js middleware for handling Cross-Origin Resource Sharing.              |
| **Database**        | MySQL                | `^8.0.35`   | Relational database management system.                                      |
| **ML Microservice** | Python               | `^3.10.0`   | Programming language for the ML service.                                    |
|                     | Flask                | `^2.3.3`    | Lightweight WSGI web application framework for Python.                      |
|                     | Pandas               | `^2.1.3`    | Data manipulation and analysis library.                                     |
|                     | Scikit-learn         | `^1.3.2`    | Machine learning library (for model training and prediction).               |
|                     | Gunicorn             | `^21.2.0`   | WSGI HTTP server for Unix (for production deployment of Flask app).         |

## 3. Project Folder Structure

```
.
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── assets/              # Static assets like images, icons
│   │   ├── components/          # Reusable UI components
│   │   │   ├── Header.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── RestaurantCard.jsx
│   │   │   ├── MenuItemCard.jsx
│   │   │   ├── OrderItemDisplay.jsx
│   │   │   └── ...
│   │   ├── pages/               # Top-level page components, connected to routes
│   │   │   ├── HomePage.jsx
│   │   │   ├── RegisterPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── DashboardPage.jsx # General dashboard, renders specific content based on user role
│   │   │   ├── RestaurantDetailPage.jsx
│   │   │   ├── OrderPlacementPage.jsx
│   │   │   ├── OrderHistoryPage.jsx
│   │   │   ├── OrderTrackingPage.jsx
│   │   │   └── ...
│   │   ├── api/                 # Axios instances and API utility functions
│   │   │   └── axiosConfig.js
│   │   ├── hooks/               # Custom React hooks (e.g., useAuth)
│   │   ├── context/             # React Context for global state (e.g., AuthContext)
│   │   ├── App.jsx              # Main application component, sets up routing
│   │   ├── main.jsx             # Entry point for React app
│   │   └── index.css            # Global styles, Tailwind CSS imports
│   ├── .env                     # Frontend environment variables
│   ├── package.json             # Frontend dependencies and scripts
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   └── vite.config.js           # Vite configuration
├── backend/
│   ├── src/
│   │   ├── config/              # Database configuration and environment settings
│   │   │   └── db.js            # Sequelize connection setup
│   │   ├── controllers/         # Business logic functions for routes
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── restaurantController.js
│   │   │   ├── menuController.js
│   │   │   ├── orderController.js
│   │   │   ├── deliveryController.js
│   │   │   └── mlController.js  # Handles calls to the ML service
│   │   ├── middleware/          # Express middleware (e.g., authentication, error handling)
│   │   │   ├── authMiddleware.js
│   │   │   └── errorHandler.js
│   │   ├── models/              # Sequelize model definitions (Conceptual Schema)
│   │   │   ├── User.js
│   │   │   ├── Restaurant.js
│   │   │   ├── MenuItem.js
│   │   │   ├── Order.js
│   │   │   ├── OrderItem.js
│   │   │   ├── Delivery.js      # Stores data relevant for ML prediction and actuals
│   │   │   └── index.js         # Central file for model associations
│   │   ├── routes/              # Express route definitions
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── restaurantRoutes.js
│   │   │   ├── menuRoutes.js
│   │   │   ├── orderRoutes.js
│   │   │   └── deliveryRoutes.js
│   │   ├── utils/               # Utility functions (e.g., password hashing, JWT generation)
│   │   │   └── jwt.js
│   │   └── app.js               # Main Express application setup
│   ├── .env                     # Backend environment variables
│   ├── package.json             # Backend dependencies and scripts
│   └── server.js                # Entry point for the Node.js server
├── ml_service/
│   ├── data/                    # Directory for raw and processed data, and trained model
│   │   ├── food_delivery_data.csv # Kaggle dataset
│   │   └── delivery_eta_model.pkl # Trained ML model
│   ├── model_training.ipynb     # Jupyter notebook for ML model training and evaluation
│   ├── app.py                   # Flask application for ML prediction API
│   ├── requirements.txt         # Python dependencies for ML service
│   └── .env                     # ML service environment variables
├── .gitignore                   # Specifies intentionally untracked files to ignore
├── README.md                    # Project README
└── CODEME.md                    # This document
```

## 4. Database Schemas

The following Sequelize models represent the **Conceptual Schema** of the DeliverEase AI application. Sequelize will manage the creation and interaction with the **Internal Schema** (MySQL tables) based on these definitions.

```javascript
// backend/src/config/db.js (Example connection setup)
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false, // Set to true to see SQL queries in console
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // For PlanetScale, adjust as needed
      }
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
```

```javascript
// backend/src/models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true, // Optional for some roles
  },
  role: {
    type: DataTypes.ENUM('customer', 'restaurant_owner', 'delivery_person'),
    allowNull: false,
    defaultValue: 'customer',
  },
  address: { // For customer, can be JSON for multiple addresses or text
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: { // For customer/delivery person's current or default location
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: { // For customer/delivery person's current or default location
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
  deliveryPersonAge: { // Specific to delivery_person role
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deliveryPersonRatings: { // Specific to delivery_person role
    type: DataTypes.DECIMAL(2, 1),
    allowNull: true,
    defaultValue: 0.0,
  },
  vehicleCondition: { // Specific to delivery_person role
    type: DataTypes.ENUM('Good', 'Average', 'Bad'),
    allowNull: true,
  },
  typeOfVehicle: { // Specific to delivery_person role
    type: DataTypes.ENUM('Motorcycle', 'Scooter', 'Electric_scooter', 'Bicycle'),
    allowNull: true,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await bcrypt.genSalt(12);
        user.password = await bcrypt.hash(user.password, salt);
      }
    },
  },
});

User.prototype.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = User;
```

```javascript
// backend/src/models/Restaurant.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Restaurant = sequelize.define('Restaurant', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { // Foreign key to User (role: restaurant_owner)
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false,
  },
  cuisineType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  openingTime: {
    type: DataTypes.TIME, // e.g., "09:00:00"
    allowNull: false,
  },
  closingTime: {
    type: DataTypes.TIME, // e.g., "22:00:00"
    allowNull: false,
  },
  city: { // Derived from address, for ML model
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Restaurant;
```

```javascript
// backend/src/models/MenuItem.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const MenuItem = sequelize.define('MenuItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  restaurantId: { // Foreign key to Restaurant
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = MenuItem;
```

```javascript
// backend/src/models/Order.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: { // Foreign key to User (customer)
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  restaurantId: { // Foreign key to Restaurant
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id',
    },
  },
  deliveryPersonId: { // Foreign key to User (delivery_person), assigned later
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  orderDate: {
    type: DataTypes.DATEONLY, // YYYY-MM-DD
    allowNull: false,
  },
  timeOrdered: {
    type: DataTypes.TIME, // HH:MM:SS
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
  scheduledDeliveryTime: { // The time the user specified for delivery
    type: DataTypes.DATE, // Full datetime, or just TIME if date is always orderDate
    allowNull: false,
  },
  predictedEtaMinutes: { // Predicted ETA from ML service (minutes)
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  actualDeliveryTime: { // When the order was actually delivered
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  indexes: [
    {
      fields: ['userId'],
    },
    {
      fields: ['restaurantId'],
    },
    {
      fields: ['deliveryPersonId'],
    },
  ],
});

module.exports = Order;
```

```javascript
// backend/src/models/OrderItem.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: { // Foreign key to Order
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  menuItemId: { // Foreign key to MenuItem
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'MenuItems',
      key: 'id',
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
    },
  },
  priceAtOrder: { // Price of the item at the time of order
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = OrderItem;
```

```javascript
// backend/src/models/Delivery.js
// This model captures the specific features required by the ML model for historical and real-time prediction.
// It is created when an order is assigned to a delivery person.
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Delivery = sequelize.define('Delivery', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  orderId: { // Foreign key to Order
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true, // Each order has one delivery record for ML
    references: {
      model: 'Orders',
      key: 'id',
    },
  },
  deliveryPersonId: { // Foreign key to User (delivery_person)
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  restaurantId: { // Foreign key to Restaurant
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Restaurants',
      key: 'id',
    },
  },
  // Features directly from Kaggle dataset for ML prediction
  deliveryPersonAge: {
    type: DataTypes.INTEGER,
    allowNull: false, // Copied from User.deliveryPersonAge
  },
  deliveryPersonRatings: {
    type: DataTypes.DECIMAL(2, 1),
    allowNull: false, // Copied from User.deliveryPersonRatings
  },
  restaurantLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false, // Copied from Restaurant.latitude
  },
  restaurantLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false, // Copied from Restaurant.longitude
  },
  deliveryLocationLatitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: false, // Copied from Order.deliveryLatitude
  },
  deliveryLocationLongitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: false, // Copied from Order.deliveryLongitude
  },
  orderDate: { // Date of the order (YYYY-MM-DD)
    type: DataTypes.DATEONLY,
    allowNull: false, // Copied from Order.orderDate
  },
  timeOrdered: { // Time the order was placed (HH:MM:SS)
    type: DataTypes.TIME,
    allowNull: false, // Copied from Order.timeOrdered
  },
  timeOrderPicked: { // Time the delivery person picked up the order (HH:MM:SS)
    type: DataTypes.TIME,
    allowNull: true, // Updated by delivery person
  },
  weatherConditions: {
    type: DataTypes.ENUM('Sunny', 'Stormy', 'Sandstorms', 'Cloudy', 'Fog', 'Windy'),
    allowNull: true, // Could be fetched from an external weather API or mocked
  },
  roadTrafficDensity: {
    type: DataTypes.ENUM('Low', 'Medium', 'High', 'Jam'),
    allowNull: true, // Could be fetched from a mapping API or mocked
  },
  vehicleCondition: {
    type: DataTypes.INTEGER, // 0 for good, 1 for bad (simplified from Kaggle)
    allowNull: false, // Copied from User.vehicleCondition
  },
  typeOfOrder: {
    type: DataTypes.ENUM('Buffet', 'Drinks', 'Snack', 'Meal'),
    allowNull: false, // Simplified from Kaggle, could be derived from menu items
    defaultValue: 'Meal',
  },
  typeOfVehicle: {
    type: DataTypes.ENUM('Motorcycle', 'Scooter', 'Electric_scooter', 'Bicycle'),
    allowNull: false, // Copied from User.typeOfVehicle
  },
  multipleDeliveries: {
    type: DataTypes.INTEGER, // 0 or 1, if delivery person is handling multiple orders (simplified)
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
    allowNull: false, // Copied from Restaurant.city
  },
  // ML Prediction and Actuals
  predictedEtaMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true, // Result from ML service
  },
  actualDeliveryMinutes: {
    type: DataTypes.INTEGER,
    allowNull: true, // Calculated based on timeOrderPicked and actualDeliveryTime
  },
});

module.exports = Delivery;
```

```javascript
// backend/src/models/index.js (Associations)
const User = require('./User');
const Restaurant = require('./Restaurant');
const MenuItem = require('./MenuItem');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Delivery = require('./Delivery');

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
```

## 5. API Endpoints (Complete)

All endpoints are prefixed with `/api`.

### Authentication & User Management

*   **POST /api/auth/register**
    *   Auth: Public
    *   Request Body: `{ email: string, password: string, name: string, role: 'customer' | 'restaurant_owner' | 'delivery_person', phone?: string, address?: string, latitude?: number, longitude?: number, deliveryPersonAge?: number, deliveryPersonRatings?: number, vehicleCondition?: 'Good' | 'Average' | 'Bad', typeOfVehicle?: 'Motorcycle' | 'Scooter' | 'Electric_scooter' | 'Bicycle' }`
    *   Response: `{ token: string, user: { id: number, email: string, name: string, role: string, ... } }`
    *   Description: Registers a new user with a specified role. Hashes password. Returns JWT and user info.
*   **POST /api/auth/login**
    *   Auth: Public
    *   Request Body: `{ email: string, password: string }`
    *   Response: `{ token: string, user: { id: number, email: string, name: string, role: string, ... } }`
    *   Description: Logs in a user, validates credentials, and returns JWT and user info.
*   **GET /api/auth/me**
    *   Auth: Required (Any role)
    *   Request Body: None
    *   Response: `{ id: number, email: string, name: string, role: string, ... }`
    *   Description: Retrieves the profile of the currently authenticated user.
*   **PUT /api/users/:id**
    *   Auth: Required (User must match ID or be admin - for hackathon, simplify to user matching ID)
    *   Request Body: `{ name?: string, phone?: string, address?: string, latitude?: number, longitude?: number, deliveryPersonAge?: number, deliveryPersonRatings?: number, vehicleCondition?: 'Good' | 'Average' | 'Bad', typeOfVehicle?: 'Motorcycle' | 'Scooter' | 'Electric_scooter' | 'Bicycle' }`
    *   Response: `{ message: string, user: { id: number, email: string, name: string, ... } }`
    *   Description: Updates a user's profile information.

### Restaurant Management

*   **POST /api/restaurants**
    *   Auth: Required (restaurant_owner)
    *   Request Body: `{ name: string, address: string, latitude: number, longitude: number, cuisineType?: string, openingTime: string, closingTime: string, city: string }`
    *   Response: `{ message: string, restaurant: { id: number, name: string, ... } }`
    *   Description: Creates a new restaurant associated with the authenticated restaurant owner.
*   **GET /api/restaurants**
    *   Auth: Public
    *   Request Body: None
    *   Response: `[{ id: number, name: string, address: string, ... }]`
    *   Description: Retrieves a list of all restaurants.
*   **GET /api/restaurants/:id**
    *   Auth: Public
    *   Request Body: None
    *   Response: `{ id: number, name: string, address: string, ... }`
    *   Description: Retrieves details for a specific restaurant.
*   **PUT /api/restaurants/:id**
    *   Auth: Required (restaurant_owner, must own restaurant)
    *   Request Body: `{ name?: string, address?: string, latitude?: number, longitude?: number, cuisineType?: string, openingTime?: string, closingTime?: string, city?: string }`
    *   Response: `{ message: string, restaurant: { id: number, name: string, ... } }`
    *   Description: Updates details for a specific restaurant.
*   **DELETE /api/restaurants/:id**
    *   Auth: Required (restaurant_owner, must own restaurant)
    *   Request Body: None
    *   Response: `{ message: string }`
    *   Description: Deletes a specific restaurant and its associated menu items.

### Menu Management

*   **POST /api/restaurants/:restaurantId/menu-items**
    *   Auth: Required (restaurant_owner, must own restaurant)
    *   Request Body: `{ name: string, description?: string, price: number, category?: string, imageUrl?: string }`
    *   Response: `{ message: string, menuItem: { id: number, name: string, ... } }`
    *   Description: Adds a new menu item to a specific restaurant.
*   **GET /api/restaurants/:restaurantId/menu-items**
    *   Auth: Public
    *   Request Body: None
    *   Response: `[{ id: number, name: string, price: number, ... }]`
    *   Description: Retrieves all menu items for a specific restaurant.
*   **GET /api/menu-items/:id**
    *   Auth: Public
    *   Request Body: None
    *   Response: `{ id: number, name: string, price: number, ... }`
    *   Description: Retrieves details for a specific menu item.
*   **PUT /api/menu-items/:id**
    *   Auth: Required (restaurant_owner, must own restaurant of menu item)
    *   Request Body: `{ name?: string, description?: string, price?: number, category?: string, imageUrl?: string }`
    *   Response: `{ message: string, menuItem: { id: number, name: string, ... } }`
    *   Description: Updates details for a specific menu item.
*   **DELETE /api/menu-items/:id**
    *   Auth: Required (restaurant_owner, must own restaurant of menu item)
    *   Request Body: None
    *   Response: `{ message: string }`
    *   Description: Deletes a specific menu item.

### Order Management

*   **POST /api/orders**
    *   Auth: Required (customer)
    *   Request Body: `{ restaurantId: number, deliveryAddress: string, deliveryLatitude: number, deliveryLongitude: number, scheduledDeliveryTime: string (ISO 8601 datetime), items: [{ menuItemId: number, quantity: number }] }`
    *   Response: `{ message: string, order: { id: number, status: string, totalAmount: number, predictedEtaMinutes: number, ... } }`
    *   Description: Places a new order. Calculates total, calls ML service for initial ETA, stores order and items.
*   **GET /api/orders**
    *   Auth: Required (customer: gets own orders; restaurant_owner: gets orders for their restaurant; delivery_person: gets assigned orders)
    *   Request Body: None
    *   Response: `[{ id: number, status: string, totalAmount: number, restaurant: { name: string }, customer: { name: string }, deliveryPerson: { name: string }, items: [...], predictedEtaMinutes: number, ... }]`
    *   Description: Retrieves orders based on the authenticated user's role. Includes associated restaurant, customer, delivery person, and items.
*   **GET /api/orders/:id**
    *   Auth: Required (customer: must own order; restaurant_owner: must own restaurant for order; delivery_person: must be assigned order)
    *   Request Body: None
    *   Response: `{ id: number, status: string, totalAmount: number, restaurant: { name: string }, customer: { name: string }, deliveryPerson: { name: string }, items: [...], predictedEtaMinutes: number, ... }`
    *   Description: Retrieves details for a specific order.
*   **PUT /api/orders/:id/status**
    *   Auth: Required (restaurant_owner: to confirm/prepare; delivery_person: to pick up/deliver)
    *   Request Body: `{ status: 'confirmed' | 'preparing' | 'out_for_delivery' | 'delivered' | 'cancelled', timeOrderPicked?: string (ISO 8601 datetime) }`
    *   Response: `{ message: string, order: { id: number, status: string, ... } }`
    *   Description: Updates the status of an order. `timeOrderPicked` is required when status becomes 'out_for_delivery'. When 'out_for_delivery', re-calculates ETA. When 'delivered', calculates actual delivery time.
*   **PUT /api/orders/:id/assign-delivery**
    *   Auth: Required (restaurant_owner)
    *   Request Body: `{ deliveryPersonId: number }`
    *   Response: `{ message: string, order: { id: number, deliveryPersonId: number, predictedEtaMinutes: number, ... } }`
    *   Description: Assigns a delivery person to an order. Triggers initial `Delivery` record creation and ML ETA prediction.

### Delivery & ETA Prediction

*   **GET /api/deliveries/:orderId/eta**
    *   Auth: Required (customer: for their order; restaurant_owner: for their restaurant's orders; delivery_person: for their assigned orders)
    *   Request Body: None
    *   Response: `{ orderId: number, predictedEtaMinutes: number, currentStatus: string }`
    *   Description: Retrieves the current predicted ETA and status for a specific order. This will fetch from the `Order` table.
*   **POST /api/ml-predict-eta** (Internal endpoint, called by backend)
    *   Auth: Internal (not exposed directly to frontend)
    *   Request Body: `{ deliveryPersonAge: number, deliveryPersonRatings: number, restaurantLatitude: number, restaurantLongitude: number, deliveryLocationLatitude: number, deliveryLocationLongitude: number, orderDate: string (YYYY-MM-DD), timeOrdered: string (HH:MM:SS), timeOrderPicked?: string (HH:MM:SS), weatherConditions?: string, roadTrafficDensity?: string, vehicleCondition: number (0/1), typeOfOrder: string, typeOfVehicle: string, multipleDeliveries: number (0/1), festival: string ('No'/'Yes'), city: string }`
    *   Response: `{ predicted_eta: number }`
    *   Description: Sends delivery features to the ML microservice and returns the predicted ETA in minutes. This is handled by the `mlController` in the backend.

## 6. Real-time Events (Socket.io / WebSockets)

This project does not include real-time events via Socket.io or WebSockets. The architecture graph indicates a direct API call for prediction requests and responses, and the CTO conversation did not explicitly re-confirm real-time updates after the initial mention of Socket.io. For a 24-hour hackathon, a polling mechanism or manual refresh for order status and ETA updates will be used to simplify the implementation, aligning with the DBMS A-grade focus.

## 7. Frontend Pages & Components

The **External Schema** of the three-schema architecture is represented by these frontend pages and components.

### Pages

*   **`/` (HomePage.jsx)**
    *   Renders: A welcoming landing page with a brief description, call-to-action for browsing restaurants or logging in.
    *   APIs Called: None directly.
    *   State: None specific.
    *   Edge Cases: Should redirect authenticated users to their respective dashboards.
*   **`/register` (RegisterPage.jsx)**
    *   Renders: A form for user registration (email, password, name, role selection: customer, restaurant_owner, delivery_person). Additional fields conditionally rendered based on role (e.g., restaurant details for owner, delivery person details).
    *   APIs Called: `POST /api/auth/register`
    *   State: Form input fields, loading state, error messages.
    *   Edge Cases: Email already exists, password validation fails. On success, stores token and redirects to `/dashboard`.
*   **`/login` (LoginPage.jsx)**
    *   Renders: A form for user login (email, password).
    *   APIs Called: `POST /api/auth/login`
    *   State: Form input fields, loading state, error messages.
    *   Edge Cases: Invalid credentials. On success, stores token and redirects to `/dashboard`.
*   **`/dashboard` (DashboardPage.jsx)**
    *   Renders: A dynamic dashboard based on the authenticated user's role.
        *   **Customer:** Lists current/past orders, allows searching for restaurants.
        *   **Restaurant Owner:** Displays owned restaurant(s), current orders for their restaurant, menu management options.
        *   **Delivery Person:** Lists assigned deliveries, current delivery status, and allows updating status.
    *   APIs Called:
        *   `GET /api/auth/me` (to determine role)
        *   `GET /api/orders` (filtered by role)
        *   `GET /api/restaurants/:id` (for restaurant owners)
        *   `GET /api/restaurants/:restaurantId/menu-items` (for restaurant owners)
    *   State: User object, list of orders/restaurants/menu items, loading state.
    *   Edge Cases: No orders found, no restaurants owned.
*   **`/restaurants` (RestaurantListPage.jsx)**
    *   Renders: A list of all available restaurants, possibly with search/filter options. Each restaurant displayed using a `RestaurantCard` component.
    *   APIs Called: `GET /api/restaurants`
    *   State: List of restaurants, loading state, search/filter terms.
    *   Edge Cases: No restaurants available.
*   **`/restaurants/:id` (RestaurantDetailPage.jsx)**
    *   Renders: Detailed information about a specific restaurant, including its menu items. Provides an interface for customers to add items to a cart and place an order.
    *   APIs Called:
        *   `GET /api/restaurants/:id`
        *   `GET /api/restaurants/:id/menu-items`
    *   State: Restaurant details, list of menu items, current cart items, total amount.
    *   Edge Cases: Restaurant not found.
*   **`/order-placement/:restaurantId` (OrderPlacementPage.jsx)**
    *   Renders: A form to finalize an order. Displays cart items, allows selecting delivery address (from user profile or new), and specifying a `scheduledDeliveryTime`.
    *   APIs Called: `POST /api/orders`
    *   State: Cart items, delivery address, scheduled delivery time, loading state, order confirmation/error.
    *   Edge Cases: Empty cart, invalid delivery time.
*   **`/orders/:id` (OrderTrackingPage.jsx)**
    *   Renders: Detailed view of a single order, including order items, current status, and the dynamically predicted ETA.
    *   APIs Called:
        *   `GET /api/orders/:id`
        *   `GET /api/deliveries/:orderId/eta` (for current ETA)
    *   State: Order details, status, predicted ETA, loading state.
    *   Edge Cases: Order not found, delivery not yet assigned. Polling for ETA updates (e.g., every 10-15 seconds) can be implemented.
*   **`/my-orders` (OrderHistoryPage.jsx)**
    *   Renders: A list of all orders placed by the authenticated customer.
    *   APIs Called: `GET /api/orders` (filtered by current user)
    *   State: List of customer's orders, loading state.
    *   Edge Cases: No previous orders.
*   **`/restaurant-manage/:id` (RestaurantManagePage.jsx)**
    *   Renders: For restaurant owners to view/edit their restaurant details and manage menu items (add, edit, delete).
    *   APIs Called:
        *   `GET /api/restaurants/:id`
        *   `PUT /api/restaurants/:id`
        *   `GET /api/restaurants/:id/menu-items`
        *   `POST /api/restaurants/:id/menu-items`
        *   `PUT /api/menu-items/:id`
        *   `DELETE /api/menu-items/:id`
    *   State: Restaurant details, menu item list, form for new/edited menu item, loading/error states.
    *   Edge Cases: Restaurant not found, not authorized to manage.

### Key Components

*   **`Header.jsx`**: Displays app logo, navigation links (Home, Restaurants, Dashboard), and conditional Auth/User dropdown (Login/Register vs. Profile/Logout).
*   **`Footer.jsx`**: Standard footer with copyright, etc.
*   **`RestaurantCard.jsx`**: Displays a single restaurant's name, cuisine, address. Clickable to navigate to `RestaurantDetailPage`.
*   **`MenuItemCard.jsx`**: Displays a single menu item's name, description, price. Includes an "Add to Cart" button for customers.
*   **`OrderCard.jsx`**: Summarizes an order (ID, restaurant, status, total, current ETA). Clickable to navigate to `OrderTrackingPage`.
*   **`AuthForm.jsx`**: Reusable component for login and registration forms, handling input fields and submission.
*   **`PrivateRoute.jsx`**: A React Router wrapper component that checks for authentication and redirects to login if not authenticated.

## 8. Authentication & Authorization Flow

The application uses JSON Web Tokens (JWT) for stateless authentication.

1.  **Registration (`POST /api/auth/register`):**
    *   User (customer, restaurant_owner, or delivery_person) submits `email`, `password`, `name`, `role`, and other role-specific details.
    *   Backend validates input, checks for unique `email`.
    *   Password is **hashed using `bcrypt.js` (cost 12)** and stored in the `Users` table.
    *   A new `User` record is created.
    *   A JWT is generated, signed with `JWT_SECRET`, containing the user's `id`, `email`, and `role`.
    *   The JWT and basic user information (`id`, `email`, `name`, `role`) are returned to the client.

2.  **Login (`POST /api/auth/login`):**
    *   User submits `email` and `password`.
    *   Backend retrieves user by `email`.
    *   The provided `password` is compared with the stored hashed password using `bcrypt.compare`.
    *   If credentials are valid, a new JWT is generated and returned along with basic user information.

3.  **Token Storage (Frontend):**
    *   Upon successful registration or login, the frontend receives the JWT.
    *   The JWT is securely stored in the browser's **`localStorage`**. This token will be sent with subsequent requests.

4.  **Protected Route Guard (Frontend):**
    *   A `PrivateRoute` component (or similar logic in `App.jsx` using `React Router DOM`) checks for the presence of a JWT in `localStorage`.
    *   If no token is found, the user is redirected to the `/login` page.

5.  **Protected API Access (Backend):**
    *   For protected API endpoints, a custom **`authMiddleware.js`** is applied to Express routes.
    *   This middleware intercepts incoming requests and expects the JWT in the `Authorization` header as a `Bearer` token (`Authorization: Bearer <token>`).
    *   The token is verified using `jwt.verify` with `JWT_SECRET`.
    *   If the token is valid, the user's payload (`id`, `email`, `role`) is attached to the `req.user` object, allowing downstream controllers to access authenticated user information.
    *   If the token is missing or invalid, a `401 Unauthorized` or `403 Forbidden` response is returned.

6.  **Authorization (Role-based):**
    *   Specific routes in the backend will employ additional middleware or controller logic to check `req.user.role` against required roles (e.g., `restaurant_owner` for managing restaurant details, `delivery_person` for updating delivery status).
    *   If the user's role does not meet the requirements, a `403 Forbidden` response is sent.

7.  **Logout:**
    *   The frontend provides a "Logout" button.
    *   Clicking this button simply **removes the JWT from `localStorage`** and redirects the user to the `/login` or `/` page. No backend API call is strictly necessary for logout as JWTs are stateless.

## 9. Environment Variables

### Frontend (`frontend/.env`)

| Variable             | Type   | Description                                 | Example Value                         |
| :------------------- | :----- | :------------------------------------------ | :------------------------------------ |
| `VITE_API_BASE_URL`  | string | Base URL for the backend API.               | `http://localhost:5000/api`           |
|                      |        |                                             | `https://deliverease-api.railway.app/api` |

### Backend (`backend/.env`)

| Variable           | Type   | Description                                       | Example Value                                  |
| :----------------- | :----- | :------------------------------------------------ | :--------------------------------------------- |
| `PORT`             | number | Port for the Express server to listen on.         | `5000`                                         |
| `DB_HOST`          | string | MySQL database host.                              | `aws.connect.psdb.cloud`                       |
| `DB_USER`          | string | MySQL database username.                          | `your_db_user`                                 |
| `DB_PASSWORD`      | string | MySQL database password.                          | `your_db_password`                             |
| `DB_NAME`          | string | MySQL database name.                              | `deliverease_db`                               |
| `JWT_SECRET`       | string | Secret key for signing and verifying JWTs.        | `supersecretjwtkey123`                         |
| `ML_SERVICE_URL`   | string | Base URL for the Python ML prediction microservice. | `http://localhost:8000/predict`                |
|                    |        |                                                   | `https://deliverease-ml.railway.app/predict`   |

### ML Microservice (`ml_service/.env`)

| Variable | Type   | Description                               | Example Value |
| :------- | :----- | :---------------------------------------- | :------------ |
| `PORT`   | number | Port for the Flask ML service to listen on. | `8000`        |

## 10. Hosting & Deployment

The application components will be deployed to their respective agreed-upon platforms.

### Frontend (React + Vite) on Vercel

1.  **Prepare for Deployment:**
    *   Ensure `VITE_API_BASE_URL` in `frontend/.env` points to the deployed backend URL (e.g., `https://deliverease-api.railway.app/api`).
    *   Build the React app: `npm run build` in `frontend/`. This creates an optimized `dist/` folder.
2.  **Vercel Setup:**
    *   Create a Vercel account and install the Vercel CLI (`npm i -g vercel`).
    *   Link your Vercel project to your Git repository (e.g., GitHub, GitLab, Bitbucket).
    *   **Project Settings:**
        *   **Framework Preset:** Select `Vite`.
        *   **Build Command:** `npm run build`
        *   **Output Directory:** `dist`
    *   **Environment Variables:** Add `VITE_API_BASE_URL` in Vercel's Project Settings -> Environment Variables.
3.  **Deployment:**
    *   Vercel will automatically detect new commits on your linked branch (e.g., `main`) and trigger a new deployment (CI/CD).
    *   Alternatively, deploy manually from the `frontend/` directory using `vercel`.
    *   **CORS:** Vercel automatically handles serving static files. CORS concerns are primarily on the backend.

### Backend (Node.js + Express) on Railway

1.  **Prepare for Deployment:**
    *   Ensure `server.js` starts the Express app and listens on `process.env.PORT`.
    *   Ensure `backend/.env` is configured for production (e.g., `DB_HOST` pointing to PlanetScale, `ML_SERVICE_URL` pointing to the deployed ML service URL).
2.  **Railway Setup:**
    *   Create a Railway account.
    *   Connect your Git repository (e.g., GitHub).
    *   Create a new project and add a new service, selecting "Deploy from GitHub Repo". Choose your repository and the `backend/` folder.
    *   **Environment Variables:** Add `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `ML_SERVICE_URL` in Railway's service settings.
    *   **Build/Start Commands:** Railway typically auto-detects Node.js projects.
        *   Build: `npm install`
        *   Start: `node server.js`
    *   **Health Check:** Configure a health check endpoint (e.g., `/api/health`) if desired.
3.  **Deployment:**
    *   Railway will automatically deploy on new commits to the selected branch.
    *   **CORS:** In `backend/src/app.js`, configure `cors` middleware to allow requests from your Vercel frontend URL:
        ```javascript
        const cors = require('cors');
        app.use(cors({
          origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Your Vercel URL
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        ```
        (Add `FRONTEND_URL` to Railway env vars).

### Database (MySQL) on PlanetScale

1.  **PlanetScale Setup:**
    *   Create a PlanetScale account.
    *   Create a new database.
    *   Go to your database dashboard, then "Connect". Select "Connect with: Node.js" and copy the connection string and credentials.
    *   **Branching:** PlanetScale uses database branching. For a hackathon, you can deploy to the `main` branch directly.
    *   **Schema Changes:** `sequelize.sync({ alter: true })` can be used for development, but for production, PlanetScale recommends using `pscale deploy` or manual schema changes through their UI. For this hackathon, `sequelize.sync({ alter: true })` is acceptable as part of the initial deployment script if data loss is not a concern, or `sequelize.sync({ force: true })` for a fresh start.
2.  **Integration:**
    *   Use the credentials provided by PlanetScale to populate `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` in your **Backend Railway service environment variables**.
    *   Ensure your `backend/src/config/db.js` includes `ssl: { rejectUnauthorized: false }` in `dialectOptions` for PlanetScale connection.

### ML Microservice (Python + Flask) on Railway

1.  **Prepare for Deployment:**
    *   Ensure `ml_service/app.py` runs the Flask app and listens on `process.env.PORT`.
    *   Ensure `ml_service/requirements.txt` lists all Python dependencies (`flask`, `pandas`, `scikit-learn`, `gunicorn`).
    *   The `delivery_eta_model.pkl` and `food_delivery_data.csv` files should be present in `ml_service/data/`.
2.  **Railway Setup:**
    *   In your Railway project, add another new service, selecting "Deploy from GitHub Repo". Choose your repository and the `ml_service/` folder.
    *   **Environment Variables:** Add `PORT` in Railway's service settings.
    *   **Build/Start Commands:** Railway typically auto-detects Python projects and uses `gunicorn` by default.
        *   Build: `pip install -r requirements.txt`
        *   Start: `gunicorn --bind 0.0.0.0:$PORT app:app`
3.  **Deployment:**
    *   Railway will automatically deploy on new commits.
    *   The ML service URL will be generated by Railway and should be used to update the `ML_SERVICE_URL` environment variable in the **Backend Railway service**.

## 11. Dev Setup & Run Commands

### Global Prerequisites

*   Node.js (v20.x)
*   npm (v10.x)
*   Python (v3.10.x)
*   MySQL client (optional, for direct DB access)
*   Git

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd deliverease-ai
```

### 2. Backend Setup

```bash
cd backend/
npm install
cp .env.example .env # Create .env file
# Edit .env with your local MySQL credentials and JWT_SECRET
# DB_HOST=localhost
# DB_USER=root
# DB_PASSWORD=your_password
# DB_NAME=deliverease_db_dev
# JWT_SECRET=dev_secret
# ML_SERVICE_URL=http://localhost:8000/predict
```

### 3. ML Service Setup

```bash
cd ml_service/
pip install -r requirements.txt
cp .env.example .env # Create .env file
# Edit .env with ML service port
# PORT=8000

# Train the model (run this once to generate delivery_eta_model.pkl)
jupyter notebook model_training.ipynb # Run all cells in the notebook
# Or, if you have a pre-trained model, ensure it's in ml_service/data/delivery_eta_model.pkl
```

### 4. Frontend Setup

```bash
cd frontend/
npm install
cp .env.example .env # Create .env file
# Edit .env with your local backend API URL
# VITE_API_BASE_URL=http://localhost:5000/api
```

### 5. Database Setup (Local MySQL)

*   Ensure your local MySQL server is running.
*   Create the database:
    ```sql
    CREATE DATABASE deliverease_db_dev;
    ```
*   The backend will handle table creation and migrations using Sequelize.

### 6. Run Commands

**Start ML Microservice (First)**

```bash
cd ml_service/
python app.py
# The ML service will start on http://localhost:8000
```

**Start Backend Server (Second)**

```bash
cd backend/
npm run dev
# The backend server will start on http://localhost:5000
```

**Start Frontend Development Server (Third)**

```bash
cd frontend/
npm run dev
# The frontend app will open in your browser, typically at http://localhost:5173
```

**Other useful commands:**

*   **Backend: Sync Database (Create/Update Tables)**
    ```bash
    cd backend/
    node -e "require('./src/models').sequelize.sync({ alter: true }).then(() => console.log('DB Synced')).catch(err => console.error('DB Sync Error:', err));"
    # Use { force: true } for a fresh start (drops existing tables) if needed:
    # node -e "require('./src/models').sequelize.sync({ force: true }).then(() => console.log('DB Synced (Forced)')).catch(err => console.error('DB Sync Error:', err));"
    ```
*   **Frontend: Build for Production**
    ```bash
    cd frontend/
    npm run build
    ```

## 12. Agent Task Checklist (Ordered Build Steps)

The AI coding agent must follow these steps precisely. Each step is granular and verifiable.

### Phase 1: Project Setup & Backend Core

1.  **Project Initialization:**
    *   Create the top-level project directory `deliverease-ai/`.
    *   Initialize a Git repository.
    *   Create `frontend/`, `backend/`, `ml_service/` directories.
    *   Add `.gitignore` at the root, configured for Node.js, Python, and frontend build artifacts.
2.  **Backend Setup (`backend/`):**
    *   Initialize Node.js project: `npm init -y`.
    *   Install core dependencies: `npm install express sequelize mysql2 dotenv bcryptjs jsonwebtoken cors`.
    *   Create `server.js` to import `app.js` and start the server.
    *   Create `src/app.js`: Initialize Express app, apply `cors` middleware (allowing all origins for dev), JSON body parser.
    *   Create `src/config/db.js`: Set up Sequelize connection to MySQL using environment variables (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`). Export `sequelize` instance and `connectDB` function.
    *   Create `backend/.env.example` and `.env` with placeholders for `PORT`, `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `ML_SERVICE_URL`.
    *   Modify `package.json` scripts: `start: "node server.js"`, `dev: "nodemon server.js"`.
3.  **ML Service Setup (`ml_service/`):**
    *   Create `requirements.txt`: `flask`, `pandas`, `scikit-learn`, `gunicorn`.
    *   Install dependencies: `pip install -r requirements.txt`.
    *   Create `ml_service/.env.example` and `.env` with `PORT`.
    *   Create `data/` directory.
    *   Create `model_training.ipynb`:
        *   Load `food_delivery_data.csv` (provided by user, assume it's placed in `data/`).
        *   Perform necessary data cleaning and preprocessing (handle missing values, encode categorical features, feature scaling).
        *   Train a regression model (e.g., `RandomForestRegressor` or `XGBoost`) to predict `Time_taken(min)` based on relevant features.
        *   Evaluate the model (MAE, RMSE).
        *   Save the trained model to `data/delivery_eta_model.pkl` using `joblib` or `pickle`.
    *   Create `app.py`:
        *   Initialize Flask app.
        *   Load the trained model (`data/delivery_eta_model.pkl`) on startup.
        *   Define a `POST /predict` endpoint that accepts a JSON payload (matching Kaggle columns, e.g., `Restaurant_latitude`, `Delivery_location_latitude`, `Weatherconditions`, `Road_traffic_density`, etc.).
        *   Preprocess input data from the request to match model's training input format.
        *   Use the loaded model to make a prediction.
        *   Return the `predicted_eta` (integer minutes) in a JSON response.
        *   Run Flask app on `PORT` from environment variables.
4.  **Database Models & Associations (`backend/src/models/`):**
    *   Create `User.js` (with `id`, `email`, `password`, `name`, `role`, `phone`, `address`, `latitude`, `longitude`, `deliveryPersonAge`, `deliveryPersonRatings`, `vehicleCondition`, `typeOfVehicle`). Implement `beforeCreate`/`beforeUpdate` hooks for bcrypt hashing and `comparePassword` method.
    *   Create `Restaurant.js` (with `id`, `userId`, `name`, `address`, `latitude`, `longitude`, `cuisineType`, `openingTime`, `closingTime`, `city`).
    *   Create `MenuItem.js` (with `id`, `restaurantId`, `name`, `description`, `price`, `category`, `imageUrl`).
    *   Create `Order.js` (with `id`, `userId`, `restaurantId`, `deliveryPersonId`, `orderDate`, `timeOrdered`, `deliveryAddress`, `deliveryLatitude`, `deliveryLongitude`, `status`, `totalAmount`, `scheduledDeliveryTime`, `predictedEtaMinutes`, `actualDeliveryTime`).
    *   Create `OrderItem.js` (with `id`, `orderId`, `menuItemId`, `quantity`, `priceAtOrder`).
    *   Create `Delivery.js` (with `id`, `orderId`, `deliveryPersonId`, `restaurantId`, and all relevant Kaggle prediction features like `deliveryPersonAge`, `restaurantLatitude`, `weatherConditions`, `roadTrafficDensity`, etc., plus `predictedEtaMinutes`, `actualDeliveryMinutes`).
    *   Create `index.js`: Define all `hasMany`, `belongsTo`, `hasOne` associations between models.
    *   Add a script in `package.json` or a standalone file to run `sequelize.sync({ alter: true })` to create/update tables in the database.

### Phase 2: Backend API Endpoints & Logic

1.  **Auth Middleware (`backend/src/middleware/authMiddleware.js`):**
    *   Implement `protect` middleware: Verifies JWT from `Authorization` header, attaches `req.user` (`id`, `email`, `role`). Returns 401 if invalid.
    *   Implement `authorize` middleware: Accepts an array of roles, checks `req.user.role` against them. Returns 403 if not authorized.
2.  **Auth Routes & Controllers (`backend/src/routes/authRoutes.js`, `backend/src/controllers/authController.js`):**
    *   `POST /api/auth/register`: Create user, hash password, generate JWT, return token and user data.
    *   `POST /api/auth/login`: Validate credentials, generate JWT, return token and user data.
    *   `GET /api/auth/me` (protected): Return `req.user` data.
3.  **User Routes & Controllers (`backend/src/routes/userRoutes.js`, `backend/src/controllers/userController.js`):**
    *   `PUT /api/users/:id` (protected, `authorize('customer', 'restaurant_owner', 'delivery_person')` + check ownership): Update user profile.
4.  **Restaurant Routes & Controllers (`backend/src/routes/restaurantRoutes.js`, `backend/src/controllers/restaurantController.js`):**
    *   `POST /api/restaurants` (protected, `authorize('restaurant_owner')`): Create restaurant, link to `req.user.id`.
    *   `GET /api/restaurants`: List all restaurants.
    *   `GET /api/restaurants/:id`: Get single restaurant by ID.
    *   `PUT /api/restaurants/:id` (protected, `authorize('restaurant_owner')` + check ownership): Update restaurant.
    *   `DELETE /api/restaurants/:id` (protected, `authorize('restaurant_owner')` + check ownership): Delete restaurant.
5.  **Menu Item Routes & Controllers (`backend/src/routes/menuRoutes.js`, `backend/src/controllers/menuController.js`):**
    *   `POST /api/restaurants/:restaurantId/menu-items` (protected, `authorize('restaurant_owner')` + check restaurant ownership): Add menu item.
    *   `GET /api/restaurants/:restaurantId/menu-items`: List menu items for a restaurant.
    *   `GET /api/menu-items/:id`: Get single menu item by ID.
    *   `PUT /api/menu-items/:id` (protected, `authorize('restaurant_owner')` + check menu item's restaurant ownership): Update menu item.
    *   `DELETE /api/menu-items/:id` (protected, `authorize('restaurant_owner')` + check menu item's restaurant ownership): Delete menu item.
6.  **ML Integration Controller (`backend/src/controllers/mlController.js`):**
    *   Create a function `getPredictedEta(deliveryData)`:
        *   Construct the payload for the ML service based on the `deliveryData` object (matching Kaggle columns).
        *   Make an HTTP `POST` request to `ML_SERVICE_URL/predict`.
        *   Return the `predicted_eta` from the ML service response.
        *   Handle potential errors from the ML service.
7.  **Order Routes & Controllers (`backend/src/routes/orderRoutes.js`, `backend/src/controllers/orderController.js`):**
    *   `POST /api/orders` (protected, `authorize('customer')`):
        *   Create `Order` record, link to `req.user.id`.
        *   Create `OrderItem` records for each item in the request.
        *   Calculate `totalAmount`.
        *   **Initial ETA Prediction:**
            *   Gather necessary data from `Order`, `User`, `Restaurant` models.
            *   Call `mlController.getPredictedEta` with the collected data.
            *   Store `predictedEtaMinutes` in the `Order` record.
        *   Return order details including initial `predictedEtaMinutes`.
    *   `GET /api/orders` (protected, `authorize('customer', 'restaurant_owner', 'delivery_person')`):
        *   Filter orders based on `req.user.role` (e.g., customer sees own orders, restaurant owner sees orders for their restaurant).
        *   Include associated `User`, `Restaurant`, `Delivery` details.
    *   `GET /api/orders/:id` (protected, `authorize(...)` + check ownership/assignment): Get single order details.
    *   `PUT /api/orders/:id/status` (protected, `authorize('restaurant_owner', 'delivery_person')` + check ownership/assignment):
        *   Update order `status`.
        *   If `status` is `out_for_delivery`:
            *   Update `timeOrderPicked` in `Delivery` record.
            *   Re-call `mlController.getPredictedEta` with updated `timeOrderPicked` and other data.
            *   Update `predictedEtaMinutes` in the `Order` record.
        *   If `status` is `delivered`:
            *   Set `actualDeliveryTime` in `Order`.
            *   Calculate `actualDeliveryMinutes` (from `timeOrderPicked` to `actualDeliveryTime`) and store in `Delivery` record.
    *   `PUT /api/orders/:id/assign-delivery` (protected, `authorize('restaurant_owner')` + check restaurant ownership):
        *   Assign `deliveryPersonId` to `Order`.
        *   Create a new `Delivery` record, copying relevant data from `Order`, `User` (delivery person), `Restaurant`.
        *   Call `mlController.getPredictedEta` to get initial prediction for this delivery.
        *   Store `predictedEtaMinutes` in both `Order` and `Delivery` records.
8.  **Delivery Routes & Controllers (`backend/src/routes/deliveryRoutes.js`, `backend/src/controllers/deliveryController.js`):**
    *   `GET /api/deliveries/:orderId/eta` (protected, `authorize(...)` + check ownership/assignment): Retrieve `predictedEtaMinutes` and `status` from the `Order` table.

### Phase 3: Frontend Implementation

1.  **Frontend Setup (`frontend/`):**
    *   Initialize React + Vite: `npm create vite@latest frontend -- --template react`.
    *   Install dependencies: `npm install react-router-dom axios tailwindcss postcss autoprefixer`.
    *   Configure `tailwind.config.js` and `index.css` for Tailwind CSS.
    *   Create `frontend/.env.example` and `.env` with `VITE_API_BASE_URL`.
    *   Create `src/api/axiosConfig.js`: Setup Axios instance with base URL and JWT interceptor.
2.  **Routing (`frontend/src/App.jsx`):**
    *   Set up `BrowserRouter` and define routes for `/`, `/register`, `/login`, `/dashboard`, `/restaurants`, `/restaurants/:id`, `/order-placement/:restaurantId`, `/orders/:id`, `/my-orders`, `/restaurant-manage/:id`.
    *   Implement `PrivateRoute` component to protect dashboard and order-related routes.
3.  **Authentication UI & Logic:**
    *   `src/components/Header.jsx`: Conditional rendering for login/register links vs. user profile/logout.
    *   `src/pages/RegisterPage.jsx`: Form for user registration, handles role selection and conditional input fields. Calls `POST /api/auth/register`. Stores JWT in `localStorage`, redirects to `/dashboard`.
    *   `src/pages/LoginPage.jsx`: Form for user login. Calls `POST /api/auth/login`. Stores JWT in `localStorage`, redirects to `/dashboard`.
    *   `src/context/AuthContext.jsx` (optional but recommended): Provides user authentication state globally.
4.  **Dashboard (`frontend/src/pages/DashboardPage.jsx`):**
    *   Fetch `GET /api/auth/me` to determine user role.
    *   Conditionally render content based on role:
        *   **Customer:** Display recent orders, link to `RestaurantListPage`.
        *   **Restaurant Owner:** Display owned restaurants, link to `RestaurantManagePage`, list new orders for approval.
        *   **Delivery Person:** List assigned orders, allow updating order status (e.g., "picked up", "delivered").
5.  **Restaurant & Menu Browsing:**
    *   `src/pages/RestaurantListPage.jsx`:
        *   Fetch `GET /api/restaurants`.
        *   Render `RestaurantCard` components for each restaurant.
    *   `src/pages/RestaurantDetailPage.jsx`:
        *   Fetch `GET /api/restaurants/:id`.
        *   Fetch `GET /api/restaurants/:id/menu-items`.
        *   Render restaurant details and `MenuItemCard` components.
        *   Implement local state for a shopping cart.
6.  **Order Placement:**
    *   `src/pages/OrderPlacementPage.jsx`:
        *   Display cart items and total.
        *   Input for delivery address and `scheduledDeliveryTime`.
        *   Call `POST /api/orders` on submission. Redirect to `OrderTrackingPage`.
7.  **Order Tracking & History:**
    *   `src/pages/OrderTrackingPage.jsx`:
        *   Fetch `GET /api/orders/:id`.
        *   Fetch `GET /api/deliveries/:orderId/eta` (e.g., poll every 15 seconds).
        *   Display order details, status, and dynamic `predictedEtaMinutes`.
    *   `src/pages/OrderHistoryPage.jsx`:
        *   Fetch `GET /api/orders` (for customer's orders).
        *   Render `OrderCard` components.
8.  **Restaurant Management (for owners):**
    *   `src/pages/RestaurantManagePage.jsx`:
        *   Fetch `GET /api/restaurants/:id` (owned restaurant).
        *   Forms to update restaurant details (`PUT /api/restaurants/:id`).
        *   List menu items.
        *   Forms to add new menu items (`POST /api/restaurants/:id/menu-items`).
        *   Edit/Delete buttons for menu items, calling `PUT /api/menu-items/:id` and `DELETE /api/menu-items/:id`.
9.  **General UI Components (`frontend/src/components/`):**
    *   Implement `Header`, `Footer`, `RestaurantCard`, `MenuItemCard`, `OrderCard`, `AuthForm`, etc. using Tailwind CSS.

### Phase 4: Deployment & Final Touches

1.  **Update Environment Variables:**
    *   Update `frontend/.env` (`VITE_API_BASE_URL`) to point to the deployed backend URL.
    *   Update `backend/.env` (`DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `ML_SERVICE_URL`) to point to deployed PlanetScale and ML service URLs.
    *   Update `backend/src/app.js` CORS configuration to explicitly allow the deployed Vercel frontend URL.
2.  **Deploy ML Microservice:**
    *   Ensure `ml_service/data/delivery_eta_model.pkl` is present.
    *   Deploy `ml_service/` to Railway.
    *   Verify the deployed ML service URL.
3.  **Deploy Backend:**
    *   Deploy `backend/` to Railway.
    *   Ensure Railway environment variables are correctly set for `DB_HOST`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `ML_SERVICE_URL`, and `FRONTEND_URL` (for CORS).
    *   Run initial `sequelize.sync({ alter: true })` command on the deployed backend to create tables in PlanetScale.
4.  **Deploy Frontend:**
    *   Deploy `frontend/` to Vercel.
    *   Ensure Vercel environment variable `VITE_API_BASE_URL` is correctly set.
5.  **Testing & Verification:**
    *   Perform end-to-end tests: User registration (all roles), login, restaurant browsing, order placement, order tracking (verify ETA), restaurant management, delivery status updates.
    *   Verify database records are created and updated correctly.
    *   Verify ML service is called and returns predictions.
6.  **Documentation:**
    *   Update `README.md` with project description, setup instructions, and deployment details.