const express = require('express');
const authRouter = require('./auth.routes');
const productRouter = require('./product.routes');
const router = express.Router();

router.use('/auth', authRouter);
router.use('/products', productRouter);

module.exports = router;