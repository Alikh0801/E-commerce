const express = require('express');
const cors = require('cors');
const config = require('./src/config');
const dbConnect = require('./src/config/db');
const app = express();
dbConnect();

app.use(cors());
app.use(express.json());

app.listen(config.port, () => {
    console.log('Server is running');

})