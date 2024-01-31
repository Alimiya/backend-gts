const mongoose = require('mongoose')

const subcommentSchema = new mongoose.Schema({
    subcomment: {
        type: String
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel'
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel'
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CommentModel'
    },
})

const SubcommentModel = mongoose.model('SubcommentModel', subcommentSchema)