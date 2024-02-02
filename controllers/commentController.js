const Product = require('../models/productModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')

exports.addComment = async (req, res) => {
    const {commentText, rating} = req.body
    const userId = req.user._id
    const productId = req.params.id
    const product = await Product.findById(productId)
    const existingComment = await Comment.findOne({productId})

    if (existingComment) return res.json({error: 'Comment already exists'})

    if (!product) return res.json({error: 'Product not found'})

    const comment = new Comment({
        comment: commentText,
        userId,
        productId,
        rating
    })

    try {
        await comment.save()
        product.commentId.push(comment._id)
        await product.save()
        const user = await User.findById(userId)
        if (user) {
            user.commentId.push(comment._id)
            await user.save()
        }
        res.redirect(`/product/${productId}`)
    } catch (err) {
        console.log(err)
    }
}

exports.updateComment = async (req, res) => {
    const {commentText, rating} = req.body
    const userId = req.user._id
    const productId = req.params.id
    const commentId = req.params.commentId

    try {
        const comment = await Comment.findById(commentId)

        if (!comment) return res.json({ message: 'Comment not found' })

        if (!comment.userId || !userId || comment.userId.toString() !== userId.toString()) return res.json({ message: 'Not same user' })

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {comment: commentText, rating}, {new: true})

        res.redirect(`/product/${productId}`)
    } catch (err) {
        console.log(err)
    }
}