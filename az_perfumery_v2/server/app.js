const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const dbConnect = require('./src/config/db');
const router = require('./src/routes');
const cookieParser = require('cookie-parser');
const app = express();
dbConnect();

app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? ['https://az-perfumery-v2-uvpk.vercel.app']
        : 'http://localhost:5173',
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