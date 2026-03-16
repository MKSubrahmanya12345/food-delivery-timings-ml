const { User } = require('../models');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, name, role, phone, address, latitude, longitude, deliveryPersonAge, deliveryPersonRatings, vehicleCondition, typeOfVehicle } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            email, password, name, role, phone, address, latitude, longitude,
            deliveryPersonAge, deliveryPersonRatings, vehicleCondition, typeOfVehicle
        });

        res.status(201).json({
            token: generateToken(user.id),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (user && (await user.comparePassword(password))) {
            res.json({
                token: generateToken(user.id),
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                }
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        next(error);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });
        res.json(user);
    } catch (error) {
        next(error);
    }
};
