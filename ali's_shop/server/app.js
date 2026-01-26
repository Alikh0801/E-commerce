const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const dbConnect = require('./src/config/db');
const router = require('./src/routes');
const app = express();
dbConnect();

app.use(cors());
app.use(express.json());

app.use('/api', router)

app.listen(config.port, () => {
    console.log('Server is running');

})