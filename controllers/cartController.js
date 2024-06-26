const Cart = require('../models/cartModel')
const Product = require('../models/productModel')
const History = require('../models/historyModel')
const User = require('../models/userModel')

exports.getCartById = async (req, res) => {
    try {
        const userId = req.user._id
        const cart = await Cart.findOne({userId: userId}, {productId: 1}).populate('productId')
        res.json({cart})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getUserId = async (req, res) => {
    try {
        const userId = req.user._id
        return res.json({userId})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
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
        res.redirect('/')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
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
        res.redirect(`/cart/${productId}`)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.buyCart = async (req, res) => {
    const {quantity} = req.body
    const userId = req.user._id
    const cart = await Cart.findOne({userId: userId}).populate({path: 'productId', select: ['_id', 'quantity']})

    if (!cart || !cart.productId.length) return res.status(400).json({message: "Cart is empty"})

    const history = []

    try {
        for (const productId of cart.productId) {
            const product = await Product.findById(productId, {quantity: 1, _id: 1}).populate({
                path: 'historyId',
                select: ['userId', 'quantity']
            })
            if (!product) return res.status(400).json({message: "Product not found"})

            const purchasedProduct = quantity
            if (purchasedProduct > product.quantity) return res.json({message: "Too many quantity for product"})

            product.quantity -= purchasedProduct
            await product.save()

            product.historyId.push({
                userId: userId,
                quantity: purchasedProduct
            })

            await product.save()

            history.push({
                userId: userId,
                productId: product._id,
                quantity: purchasedProduct
            })
        }
        const newHistory = await History.insertMany(history)
        await User.findOneAndUpdate({_id: userId}, {$push: {historyId: {$each: newHistory.map(history => history._id)}}});
        await Cart.findOneAndUpdate({userId: userId}, {$set: {productId: []}})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}