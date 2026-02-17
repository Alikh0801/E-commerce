const express = require('express');
const { register, login, getMe, logout, verifyEmail, forgotPassword, resetPassword, uptadeMe } = require('../controller/auth.controller');
const { protect } = require('../middleware/authMiddleware');
const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/verify-email', verifyEmail)
authRouter.post('/login', login);
authRouter.get('/me', protect, getMe);
authRouter.post('/logout', logout);
authRouter.post('/forgot-password', forgotPassword)
authRouter.post('/reset-password/:token', resetPassword)
authRouter.patch('/uptade-me', protect, uptadeMe)

module.exports = authRouter;