const Comment = require('../models/commentModel')
const User = require('../models/userModel')
const Subcomment = require('../models/subcommentModel')

exports.addSubcomment = async (req, res) => {
    const {subcommentText} = req.body
    const userId = req.user._id
    const productId = req.params.id
    const commentId = req.params.commentId
    const comment = await Comment.findById(commentId)
    const user = await User.findById(userId)
    const productInHistory = user.historyId.includes(productId)
    if (!productInHistory) return res.json({ error: 'Buy product' })

    const subcomment = new Subcomment({
        subcomment: subcommentText,
        userId,
        productId,
        commentId: comment._id
    })
    await subcomment.save()
    comment.subcommentId.push(subcomment._id)
    await comment.save()
    res.json({subcomment, comment})
}