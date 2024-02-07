const Product = require('../models/productModel')

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({}, {
            title: 1,
            description: 1,
            category: 1,
            quantity: 1,
            price: 1,
            date: 1,
            file: 1,
            commentId:1
        }).populate({
            path:'commentId',
            select:'rating'
        })
        res.json({products})
    } catch (err) {
        console.log(err)
    }
}

exports.getProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId, {
            title: 1,
            description: 1,
            category: 1,
            quantity: 1,
            price: 1,
            date: 1,
            file: 1,
            commentId:1
        }).populate({
            path:'historyId'
        })
        res.json({product})
    } catch (err) {
        console.log(err)
    }
}