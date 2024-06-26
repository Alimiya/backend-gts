const User = require('../models/userModel')
const Comment = require('../models/commentModel')
const Product = require('../models/productModel')
const History = require('../models/historyModel')

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).populate([
            {
                path:'historyId'
            },
            {
                path:'commentId'
            },
            {
                path:'subcommentId'
            },
            {
                path:'like'
            }
        ])
        res.json({users})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getUserById = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await User.findOne({_id: userId}, {__v: 0})
        res.json({user})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate([
            {
                path:'historyId'
            },
            {
                path:'commentId'
            },
            {
                path:'subcommentId'
            }
        ])
        res.json({products})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findById(productId)
        res.json({product})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.createProduct = async (req, res) => {
    const {title, description, category, quantity, price} = req.body
    const files = req.files

    if (!files || files.length === 0) return res.json({message: 'No files'})

    const images = files.map(file => {
        const uploadedPath = file.filename
        return '/uploads/' + uploadedPath
    })
    const newProduct = new Product({
        title,
        description,
        category,
        quantity,
        price,
        file: images,
    })
    try {
        await newProduct.save()
        res.redirect('/admin')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.deleteProductById = async (req, res) => {
    const productId = req.params.id
    try {
        const product = await Product.findByIdAndDelete(productId)
        res.redirect('/admin')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.updateProductById = async (req, res) => {
    const {title, description, category, quantity, price} = req.body
    const productId = req.params.id
    try {
        const product = await Product.findByIdAndUpdate(productId, {title, description, category, quantity, price})
        res.redirect('/admin')
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.find()
        res.json({comments})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getCommentsByProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const comments = await Comment.find({productId: productId}, {__v: 0})
        res.json({comments})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

exports.getHistories = async (req, res) => {
    try {
        const histories = await History.find()
        res.json({histories})
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}