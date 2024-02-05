const mongoose = require('mongoose')

const historySchema = new mongoose.Schema({
    quantity:{type:Number, required:true},
    createdAt:{type:Date, default:Date.now()},
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserModel',
        required:true
    },
    productId: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ProductModel',
        required:true
    }]
})

const HistoryModel = mongoose.model('HistoryModel', historySchema)

module.exports = HistoryModel