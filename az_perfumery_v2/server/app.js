const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const dbConnect = require('./src/config/db');
const router = require('./src/routes');
const cookieParser = require('cookie-parser');
const app = express();
dbConnect();

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL || 'https://az-perfumery-v2-uvpk.vercel.app').split(',').map(s => s.trim()).filter(Boolean)
    : ['http://localhost:5173'];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) return callback(null, true);
        return callback(null, false);
    },
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 3500, () => {
        console.log('Server is running');
    });
};

module.exports = app;