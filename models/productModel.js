const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: { type: String, required:true },
    description: { type: String, required:true },
    category:{type: String, required:true} ,
    price: { type: Number, required:true  },
    quantity: { type: Number, required:true},
    date: { type: Date, default: Date.now },
    file:{type: Array},
    historyId:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HistoryModel'
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

productSchema.pre('save', function (next) {
    if (Array.isArray(this.file)) {
        this.file = this.file.map(filename => {
            return filename.replace(/\\/g, '/')
        })
    } else if (this.file) {
        this.file = this.file.replace(/\\/g, '/')
    }
    next()
})


const ProductModel = mongoose.model('ProductModel', productSchema)

module.exports = ProductModel