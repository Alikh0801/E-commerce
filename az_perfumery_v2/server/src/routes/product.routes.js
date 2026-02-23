const express = require('express');
const { createProduct, getAllProducts } = require('../controller/product.controller');
const upload = require('../config/cloudinary');
const productRouter = express.Router();

productRouter.post('/', upload.single('image'), createProduct);
productRouter.get('/', getAllProducts);

module.exports = productRouter;