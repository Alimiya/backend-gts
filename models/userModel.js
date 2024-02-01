const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String },
    address: { type: String },
    phone: { type: Number },
    password: { type: String, required: true },
    role: { type: String, default:'User' },
    createdAt:{type:Date, default:Date.now()},
    avatar:{type:String},
    historyId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HistoryModel"
    }],
    commentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CommentModel"
    }],
    subcommentId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SubcommentModel"
    }],
    like: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LikeModel'
    }]
})

const UserModel = mongoose.model('UserModel', userSchema)

module.exports = UserModel
