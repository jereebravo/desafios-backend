const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
product: [
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    amount: {
      type: Number,
    }
  }
 
]
  
 
  
})

const Cart = mongoose.model('Carts' , cartSchema);

module.exports = Cart;