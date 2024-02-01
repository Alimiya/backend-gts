const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {type: String, required:true},
    rating:{type:Number, min:1, max:5},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    subcommentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubcommentModel'
    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikeModel'
    }]

})

const CommentModel = mongoose.model('CommentModel', commentSchema)

module.exports = CommentModel