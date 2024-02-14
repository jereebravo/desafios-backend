const mongoose = require('mongoose')

const cartSchema = new mongoose.schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

const Cart = mongoose.model('Carts' , cartSchema);

module.exports = Cart;