const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    options: [
        {
            size: { type: String, required: true },
            price: { type: Number, required: true },
            stock: { type: Number, default: 0 }
        }
    ],
    favCount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Product', productSchema);