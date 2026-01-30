const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const config = require('../config');

const register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({
                ok: false,
                message: 'All fields are required!'
            })
        }

        const userExists = await userModel.findOne({ email })

        if (userExists) {
            return res.status(400).json({
                ok: false,
                message: 'User already in use'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new userModel({
            fullName,
            email,
            phone,
            password: hashedPassword
        })
        await newUser.save();

        res.status(201).json({
            ok: true,
            message: 'User registered successfully',
            data: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone
            }
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error',
            error: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                ok: false,
                message: 'email and password are required'
            })
        }

        const foundUser = await userModel.findOne({ email }).select('+password');

        if (!foundUser) {
            return res.status(401).json({
                ok: false,
                message: 'email or password is incorrect!'
            })
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                message: 'email or password is incorrect!'
            })
        }

        const token = jwt.sign(
            { id: foundUser._id },
            config.jwt_secret,
            { expiresIn: '1d' }
        )

        res.cookie('token', token, {
            httpOnly: true,
            secure: config.node_env === 'production',
            sameSite: 'lax',
            maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
        });

        return res.status(200).json({
            ok: true,
            message: 'login successful',
            user: {
                id: foundUser._id,
                fullName: foundUser.fullName,
                email: foundUser.email
            }
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: "Internal server error"
        });
    }
}

const getMe = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id).select('-password');

        res.status(200).json({
            ok: true,
            user
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Internal server error'
        });
    }
}

const logout = async (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            expires: new Date(0),
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax'
        });

        res.status(200).json({
            ok: true,
            message: 'Logged out successfully'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Logout failed'
        })
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout
}