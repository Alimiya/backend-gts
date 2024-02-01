const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    like:{type:Boolean, required:true},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel'
    },
    subcommentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubcommentModel'
    },
})

const LikeModel = mongoose.model('LikeModel', likeSchema)

module.exports = LikeModel