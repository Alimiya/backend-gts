const Product = require('../models/productModel')

exports.getProduct = async (req, res) => {
    try {
        const products = await Product.find({}, {
            title: 1,
            description: 1,
            category: 1,
            quantity: 1,
            price: 1,
            date: 1,
            file: 1
        })
        res.json({products})
    } catch (err) {
        console.log(err)
    }
}