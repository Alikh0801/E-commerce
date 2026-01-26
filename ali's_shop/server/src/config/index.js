require('dotenv').config();

const config = {
    port: process.env.PORT,
    db: process.env.MONGO_URI,
    jwt_secret: process.env.SECRET_KEY
}

module.exports = config;