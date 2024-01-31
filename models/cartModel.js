const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    productId: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductModel'
        }
    ],

})

const Cart = mongoose.model('Cart', cartSchema)

module.exports = Cart
