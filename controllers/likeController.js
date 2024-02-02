const Like = require('../models/likeModel')
const Comment = require('../models/commentModel')
const Subcomment = require('../models/subcommentModel')
const User = require("../models/userModel")
const History = require("../models/historyModel")
const Product = require("../models/productModel")

exports.isLike = async (req, res) => {
    const {isLike} = req.body
    const productId = req.params.id
    const commentId = req.params.commentId
    const userId = req.user._id

    try {
        const user = await User.findById(userId).populate('historyId')
        if (!user) return res.json({message: 'Not same user'})
        const product = await Product.findById(productId)
        if (!product) return res.json({message: 'Product not found'})
        const productInHistory = user.historyId.some(history => history.productId.includes(productId))
        if (!productInHistory) return res.json({ message: 'Product not found in user history' })


        if (commentId) {
            const comment = await Comment.findById(commentId)
            if (!comment) return res.json({message: 'Comment not found'})
        }

        let like = await Like.findOne({userId, commentId, productId})

        if (!like) {
            like = new Like({
                like: isLike,
                userId,
                productId,
                commentId,
            })
        } else {
                like.like = isLike
        }

        await like.save()

        if (commentId) {
            const comment = await Comment.findById(commentId)
            if (comment) {
                if (isLike) {
                    comment.likes += 1
                    comment.dislikes -= like.like ? 1 : 0
                } else {
                    comment.dislikes += 1
                    comment.likes -= like.like ? 0 : 1
                }
                await comment.save()
            }
        }

        await User.findByIdAndUpdate(userId, {$addToSet: {like: like._id}})
        await Product.findByIdAndUpdate(productId, {$addToSet: {like: like._id}})
        await Comment.findByIdAndUpdate(commentId, {$addToSet: {like: like._id}})
    } catch (err) {
        console.log(err)
    }
}

exports.isLikeSubcomment = async (req, res) => {
    const {isLike} = req.body
    const productId = req.params.id
    const commentId = req.params.commentId
    const subcommentId = req.params.subcommentId
    const userId = req.user._id

    try {
        const user = await User.findById(userId).populate('historyId')
        if (!user) return res.json({message: 'Not same user'})
        const product = await Product.findById(productId)
        if (!product) return res.json({message: 'Product not found'})
        const productInHistory = user.historyId.some(history => history.productId.includes(productId))
        if (!productInHistory) return res.json({ message: 'Product not found in user history' })

        if (commentId) {
            const comment = await Comment.findById(commentId)
            if (!comment) return res.json({message: 'Comment not found'})
        }

        if (subcommentId) {
            const subcomment = await Subcomment.findById(subcommentId)
            if (!subcomment) return res.json({message: 'Subcomment not found'})
        }

        let like = await Like.findOne({userId, commentId, productId, subcommentId})

        if (!like) {
            like = new Like({
                like: isLike,
                userId,
                productId,
                commentId,
                subcommentId
            })
        } else {
                like.like = isLike
        }

        await like.save()

        if (subcommentId) {
            const subcomment = await Subcomment.findById(subcommentId)
            if (subcomment) {
                if (isLike) {
                    subcomment.likes += 1
                    subcomment.dislikes -= like.like ? 1 : 0
                } else {
                    subcomment.dislikes += 1
                    subcomment.likes -= like.like ? 0 : 1
                }
                await subcomment.save()
            }
        }

        await User.findByIdAndUpdate(userId, {$addToSet: {like: like._id}})
        await Product.findByIdAndUpdate(productId, {$addToSet: {like: like._id}})
        await Comment.findByIdAndUpdate(commentId, {$addToSet: {like: like._id}})
        await Subcomment.findByIdAndUpdate(subcommentId, {$addToSet: {like: like._id}})
    } catch (err) {
        console.log(err)
    }
}