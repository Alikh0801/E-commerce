require('dotenv').config();

const config = {
    port: process.env.PORT,
    db: process.env.MONGO_URI,
    jwt_secret: process.env.SECRET_KEY,
    node_env: process.env.NODE_ENV
}

module.exports = config;