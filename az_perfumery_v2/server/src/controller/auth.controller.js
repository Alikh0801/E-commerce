const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const config = require('../config');

const register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        // 1. İlkin yoxlamalar (Bütün xanalar doldurulubmu?)
        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ ok: false, message: 'Bütün xanaları doldurun!' });
        }

        // 2. Şifrə uzunluğu
        if (password.length < 8) {
            return res.status(400).json({ ok: false, message: 'Şifrə 8 simvoldan az olmamalıdır!' });
        }

        // 3. Nömrənin təmizlənməsi və formatı
        const cleanPhone = phone.replace(/\s+/g, '').replace('+994', '');
        const finalPhone = `+994${cleanPhone}`;
        const azPhoneRegex = /^\+994(50|51|55|70|77|99|10|60)\d{7}$/;

        if (!azPhoneRegex.test(finalPhone)) {
            return res.status(400).json({ ok: false, message: 'Düzgün mobil nömrə daxil edin' });
        }

        // 4. Dublikat yoxlanışı (Email və ya Telefon)
        const userExists = await userModel.findOne({
            $or: [{ email }, { phone: finalPhone }]
        });

        if (userExists) {
            const isEmail = userExists.email === email;
            return res.status(400).json({
                ok: false,
                message: isEmail ? 'Bu email artıq istifadə olunub!' : 'Bu nömrə artıq qeydiyyatdan keçib!'
            });
        }

        // 5. Şifrənin hash-lənməsi və bazaya yazılma
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({
            fullName,
            email,
            phone: finalPhone,
            password: hashedPassword
        });
        await newUser.save();

        // 6. Token və Cookie təyini
        const token = jwt.sign({ id: newUser._id }, config.jwt_secret, { expiresIn: '1d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: config.node_env === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            ok: true,
            message: 'Qeydiyyat uğurla tamamlandı',
            user: {
                id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone
            }
        });

    } catch (error) {
        if (error.name === 'ValidationError') {
            const message = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ ok: false, message: message[0] });
        }
        res.status(500).json({ ok: false, message: error.message });
    }
};

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
                message: 'E-mail və ya şifrə yanlışdır!'
            })
        }

        const isMatch = await bcrypt.compare(password, foundUser.password);

        if (!isMatch) {
            return res.status(401).json({
                ok: false,
                message: 'E-mail və ya şifrə yanlışdır!'
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