const Product = require('../models/productModel')
const Comment = require('../models/commentModel')
const User = require('../models/userModel')

exports.getCommentsByProduct = async (req, res) => {
    const productId = req.params.id
    try {
        const comments = await Comment.find({productId: productId}, {__v: 0}).populate([
            {
                path: 'userId',
                select: 'username'
            },
            {
                path: 'subcommentId',
                select: ['subcomment', 'userId'],
                populate: {
                    path: 'userId',
                    select: 'username'
                },
            },
            {
                path: 'like'
            }
        ])
        res.json({comments})
    } catch (err) {
        console.log(err)
    }
}

exports.addComment = async (req, res) => {
    const {commentText, rating} = req.body
    const userId = req.user._id
    const productId = req.params.id
    const product = await Product.findById(productId)
    const existingComment = await Comment.findOne({productId})
    const user = await User.findById(userId)

    if (!user.historyId || !user.historyId.some(history => history.productId === productId)) {
        return res.json({ error: 'You must purchase the product before adding a comment.' });
    }

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
        if (user) {
            user.commentId.push(comment._id)
            await user.save()
        }
        res.redirect(`/product/info/${productId}`)
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

        if (!comment) return res.json({message: 'Comment not found'})

        if (!comment.userId  || comment.userId.toString() !== userId.toString()) return res.json({message: 'Not same user'})

        const updatedComment = await Comment.findByIdAndUpdate(commentId, {comment: commentText, rating}, {new: true})

        res.redirect(`/product/info/${productId}`)
    } catch (err) {
        console.log(err)
    }
}