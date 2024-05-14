const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Subcomment = require('../models/subcommentModel')
const History = require('../models/historyModel')
const Product = require('../models/productModel')

exports.addSubcomment = async (req, res) => {
    const {subcommentText} = req.body
    const userId = req.user._id
    const productId = req.params.id
    const commentId = req.params.commentId

    try {
        const comment = await Comment.findById(commentId)
        if (!comment) return res.json({error: 'Comment not found'})

        const product = await Product.findById(productId)
        if (!product) return res.json({ error: 'Product not found' })

        const subcomment = new Subcomment({
            subcomment: subcommentText,
            userId: userId,
            productId: productId,
            commentId: commentId
        })

        await subcomment.save()

        const user = await User.findById(userId).populate('historyId')
        if (!user) return res.json({error: 'Not same user'})

        const productInHistory = user.historyId.some(History => History.productId.toString() === productId)
        if (!productInHistory) return res.json({error: 'Product not bought by the user'})

        product.subcommentId.push(subcomment._id)
        user.subcommentId.push(subcomment._id)
        comment.subcommentId.push(subcomment._id)

        await product.save()
        await user.save()
        await comment.save()

        res.redirect(`/product/info/${productId}`)
    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}