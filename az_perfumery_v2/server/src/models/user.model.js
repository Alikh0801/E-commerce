const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Ad və Soyadınızı daxil edin'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'E-mail ünvan daxil edin'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Zəhmət olmasa düzgün email daxil edin']
    },
    phone: {
        type: String,
        required: [true, 'Mobil nömrənizi daxil edin'],
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Şifrənizi daxil edin'],
        minlength: [8, 'Şifrə 8 simvoldan az olmamalıdır'],
        select: false,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);