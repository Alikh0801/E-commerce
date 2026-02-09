const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const userModel = require('../models/user.model');
const config = require('../config');
const sendEmail = require('../utils/sendEmail');

const register = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({ ok: false, message: 'Bütün xanaları doldurun!' });
        }

        const cleanPhone = phone.replace(/\s+/g, '').replace('+994', '');
        const finalPhone = `+994${cleanPhone}`;
        const azPhoneRegex = /^\+994(50|51|55|70|77|99|10|60)\d{7}$/;

        if (!azPhoneRegex.test(finalPhone)) {
            return res.status(400).json({ ok: false, message: 'Düzgün mobil nömrə daxil edin' });
        }

        const userExists = await userModel.findOne({
            $or: [{ email }, { phone: finalPhone }]
        });

        if (userExists) {
            return res.status(400).json({
                ok: false,
                message: userExists.email === email ? 'Bu email artıq istifadə olunub!' : 'Bu nömrə artıq qeydiyyatdan keçib!'
            });
        }

        // 3. Müvəqqəti OTP və Şifrələmə
        const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        const hashedPassword = await bcrypt.hash(password, 10);

        // 4. Məlumatları JWT daxilinə bükürük (Müvəqqəti baza rolunu oynayır)
        const signupData = { fullName, email, phone: finalPhone, password: hashedPassword, otpCode };
        const signupToken = jwt.sign(signupData, config.jwt_secret, { expiresIn: '2m' });

        // 5. Email göndər
        const message = `
            <div style="font-family: sans-serif; border: 1px solid #eee; padding: 20px;">
                <h2>E-mail Təsdiqləmə</h2>
                <p>Hörmətli ${fullName}, qeydiyyatı tamamlamaq üçün təsdiq kodunuz:</p>
                <h1 style="color: #4CAF50; letter-spacing: 5px;">${otpCode}</h1>
                <p>Bu kod 2 dəqiqə ərzində keçərlidir.</p>
            </div>
        `;

        await sendEmail({
            email,
            subject: 'Hesab Təsdiqləmə Kodu',
            message
        });

        res.status(200).json({
            ok: true,
            message: 'Təsdiq kodu email ünvanınıza göndərildi!',
            signupToken, // Frontend bunu Verify sehifesine oturmelidir
            email
        });

    } catch (error) {
        res.status(500).json({ ok: false, message: error.message });
    }
};

const verifyEmail = async (req, res) => {
    try {
        const { code, signupToken } = req.body;

        if (!signupToken) {
            return res.status(400).json({ ok: false, message: 'Müvəqqəti qeydiyyat vaxtınız bitib!' });
        }

        // 1. Tokeni deşifrə edirik
        let decoded;
        try {
            decoded = jwt.verify(signupToken, config.jwt_secret);
        } catch (err) {
            return res.status(400).json({ ok: false, message: 'Vaxt bitib, yenidən qeydiyyatdan keçin.' });
        }

        // 2. OTP kodunu yoxla
        if (decoded.otpCode !== code) {
            return res.status(400).json({ ok: false, message: 'Daxil etdiyiniz kod yanlışdır!' });
        }

        const newUser = new userModel({
            fullName: decoded.fullName,
            email: decoded.email,
            phone: decoded.phone,
            password: decoded.password,
            isVerified: true
        });

        await newUser.save();

        const token = jwt.sign(
            { id: newUser._id },
            config.jwt_secret,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, {
            httpOnly: true,
            secure: config.node_env === 'production',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({
            ok: true,
            message: 'Təbriklər, qeydiyyat tamamlandı!',
            user: userResponse
        });

    } catch (error) {
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

        if (!foundUser.isVerified) {
            return res.status(401).json({
                ok: false,
                message: 'Zəhmət olmasa, əvvəlcə email ünvanınızı təsdiqləyin!'
            });
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
            secure: config.node_env === 'production',
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

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                ok: false,
                message: 'Bu email ilə istifadəçi tapılmadı!'
            });
        }

        if (user.resetPasswordExpires && user.resetPasswordExpires > Date.now() + 8 * 60 * 1000) {
            // Əgər vaxtın bitməsinə hələ 8 dəqiqədən çox qalıbsa (yəni son 2 dəqiqə ərzində göndərilibsə)
            return res.status(429).json({
                ok: false,
                message: 'Artıq bir bərpa linki göndərilib. Zəhmət olmasa 2 dəqiqə gözləyin.'
            });
        }

        //Unikal token create
        const resetToken = crypto.randomBytes(32).toString('hex')

        //Tokeni sifreliyib bazaya yaziriq
        user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10deq

        await user.save();

        const resetUrl = `${req.protocol}://${req.get('host').includes('localhost') ? 'localhost:5173' : req.get('host')}/reset-password/${resetToken}`;

        const message = `
            <h2>Şifrənin bərpası</h2>
            <p>Şifrənizi yeniləmək üçün aşağıdakı linkə klikləyin:</p>
            <a href="${resetUrl}">${resetUrl}</a>
            <p>Bu link 10 dəqiqə ərzində keçərlidir.</p>
        `;

        await sendEmail({ email: user.email, subject: 'Şifrə bərpa linki', message });

        res.status(200).json({
            ok: true,
            message: 'Bərpa linki emailinizə göndərildi!'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await userModel.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'Link yanlışdır və ya vaxtı bitib!'
            })
        }

        user.password = await bcrypt.hash(password, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({
            ok: true,
            message: 'Şifrəniz uğurla yeniləndi!'
        })

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        })
    }
}

module.exports = {
    register,
    login,
    getMe,
    logout,
    verifyEmail,
    forgotPassword,
    resetPassword
}