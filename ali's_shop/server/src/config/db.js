const mongoose = require('mongoose');
const config = require('.');

const dbConnect = async () => {
    try {
        const connection = await mongoose.connect(config.db)
        console.log('DB connection successfully');
    } catch (error) {
        console.log('DB connection failed !', error);
    }
}
module.exports = dbConnect;
