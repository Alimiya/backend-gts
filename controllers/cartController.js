const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const History = require('../models/historyModel')
const User = require('../models/userModel')

exports.getCartById = async (req, res) => {
    try {
        const userId = req.user._id
        console.log(userId)
        const cart = await Cart.findOne({userId: userId}, {__v: 0})
        res.json({cart})
    } catch (err) {
        console.log(err)
    }
}

exports.addToCart = async (req, res) => {
    const userId = req.user._id
    const productId = req.params.id
    const existingCart = await Cart.findOne({userId: userId})

    if (existingCart && existingCart.productId.includes(productId)) return res.json({message: 'Product exists'})

    try {
        const updatedCart = await Cart.findOneAndUpdate(
            {userId: userId},
            {$push: {productId: productId}},
            {upsert: true, new: true}
        )
        res.json({updatedCart})
    } catch (err) {
        console.log(err)
    }

}

exports.removeFromCart = async (req, res) => {
    const userId = req.user._id
    const productId = req.params.id

    try {
        const cart = await Cart.findOneAndUpdate(
            {userId: userId},
            {$pull: {productId: productId}},
            {new: true}
        )
        res.json({cart})
    } catch (err) {
        console.log(err)
    }
}

exports.buyCart = async (req, res) => {
    const {quantity} = req.body
    const userId = req.user._id
    const cart = await Cart.findOne({userId: userId})

    if (!cart || !cart.productId.length) return res.status(400).json({message: "Cart is empty"})

    const history = []

    try {
    for (const productId of cart.productId) {
        const product = await Product.findById(productId)
        if (!product) return res.status(400).json({ message: "Product not found" });

        const purchasedProduct = quantity
        if (purchasedProduct > product.quantity) return res.json({message: "Too many quantity for product"})

        console.log(purchasedProduct)
        product.quantity -= purchasedProduct
        console.log(product)
        await product.save()

        history.push({
            userId: userId,
            productId: product._id,
            quantity: purchasedProduct
        })
    }
        const newHistory = await History.insertMany(history)
        await User.findOneAndUpdate({ _id: userId }, { $push: { historyId: { $each: newHistory.map(history => history._id) } } });
        await Cart.findOneAndUpdate({userId: userId}, {$set: {productId: []}})
        res.json({newHistory})
    } catch (err) {
        console.log(err)
    }
}