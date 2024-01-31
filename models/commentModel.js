const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    comment: {type: String, required:true},
    rating:{type:Number, min:1, max:5},
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    subcommentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subcomment'
    }]
});

const CommentModel = mongoose.model('CommentModel', commentSchema)

module.exports = CommentModel