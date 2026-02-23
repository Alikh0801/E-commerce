const productModel = require("../models/product.model")


const createProduct = async (req, res) => {
    try {
        const productData = { ...req.body };

        if (req.file) {
            productData.image = req.file.path;
        }

        if (req.body.options && typeof req.body.options === 'string') {
            productData.options = JSON.parse(req.body.options);
        }

        const product = await productModel.create(productData);

        res.status(201).json({
            ok: true,
            data: product
        })

    } catch (error) {
        res.status(400).json({
            ok: false,
            message: error.message
        })
    }
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort('-createdAt')

        res.status(200).json({
            ok: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts
}