const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const dbConnect = require('./src/config/db');
const router = require('./src/routes');
const cookieParser = require('cookie-parser');
const app = express();
dbConnect();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api', router);

app.listen(config.port, () => {
    console.log('Server is running');
});
