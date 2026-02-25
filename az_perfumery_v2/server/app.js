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

function isOriginAllowed(origin) {
    if (!origin) return false;
    if (allowedOrigins.includes(origin)) return true;
    if (process.env.NODE_ENV === 'production' && (origin.endsWith('.vercel.app') || origin.includes('vercel.app'))) return true;
    return false;
}

app.use((req, res, next) => {
    const origin = req.headers.origin || (req.headers.referer && req.headers.referer.replace(/\/$/, ''));
    if (origin && isOriginAllowed(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }
    next();
});

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (isOriginAllowed(origin)) return callback(null, origin);
        return callback(null, false);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
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