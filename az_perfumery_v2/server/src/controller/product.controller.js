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

        const discountPercent = Number(productData.discountPercent) || 0;
        if (discountPercent > 0 && Array.isArray(productData.options) && productData.options.length > 0) {
            productData.options = productData.options.map((opt) => {
                const originalPrice = Number(opt.price) || 0;
                const newPrice = originalPrice * (1 - discountPercent / 100);
                return {
                    ...opt,
                    price: Math.round(newPrice * 100) / 100,
                    oldPrice: originalPrice
                };
            });
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

const applyDiscountToProduct = (product) => {
    const doc = product.toObject ? product.toObject() : { ...product };
    const discountPercent = Number(doc.discountPercent) || 0;
    if (!Array.isArray(doc.options)) return doc;

    if (discountPercent > 0) {
        doc.options = doc.options.map((opt) => {
            const originalPrice = Number(opt.oldPrice) ?? Number(opt.price) ?? 0;
            const newPrice = originalPrice * (1 - discountPercent / 100);
            return {
                ...opt,
                price: Math.round(newPrice * 100) / 100,
                oldPrice: originalPrice
            };
        });
    } else {
        doc.options = doc.options.map((opt) => {
            const originalPrice = Number(opt.oldPrice) ?? Number(opt.price) ?? 0;
            return {
                ...opt,
                price: originalPrice,
                oldPrice: undefined
            };
        });
    }
    return doc;
};

const getAllProducts = async (req, res) => {
    try {
        const products = await productModel.find().sort('-createdAt');
        const data = products.map((p) => applyDiscountToProduct(p));

        res.status(200).json({
            ok: true,
            count: data.length,
            data
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