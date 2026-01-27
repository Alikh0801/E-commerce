const jwt = require('jsonwebtoken');
const config = require('../config');

const protect = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                ok: false,
                message: 'Not authorized, no token'
            });
        }

        //check token
        const decoded = jwt.verify(token, config.jwt_secret);

        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            message: 'Not authorized, token failed'
        });
    }
};

module.exports = { protect };