require('dotenv').config();

const config = {
    port: process.env.PORT,
    db: process.env.MONGO_URI,
}

module.exports = config;