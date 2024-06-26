const mongoose = require('mongoose')

const subcommentSchema = new mongoose.Schema({
    subcomment: {
        type: String
    },
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
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikeModel'
    }]
})

const SubcommentModel = mongoose.model('SubcommentModel', subcommentSchema)

module.exports = SubcommentModel