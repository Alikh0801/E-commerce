const express = require('express');
const { register, login, getMe, logout } = require('../controller/auth.controller');
const { protect } = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.get('/me', protect, getMe);
authRouter.post('/logout', logout);

module.exports = authRouter;