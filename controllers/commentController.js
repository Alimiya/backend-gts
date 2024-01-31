const Product = require('../models/productModel')
const Comment = require('../models/commentModel')

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
        product.comments.push(comment._id)
        await product.save()
        res.json({comment, product})
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
        const updatedComment = await Comment.findByIdAndUpdate(commentId, {comment: commentText, rating}, {new: true})
        if (!updatedComment) return res.status(404).json({error: 'Comment not found'})
        if (updatedComment.userId.toString() !== user.toString()) return res.json({error: 'Not same user'})
        res.json({updatedComment})
    } catch (err) {
        console.log(err)
    }
}