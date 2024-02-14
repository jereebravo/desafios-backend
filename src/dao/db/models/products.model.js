const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    title: {
        type : String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        unique:true,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum:['juguetes' , 'peluches' , 'tecnologia']
    },
    thumbnail: {
        type: [String],
        default: []
    }
});

const Product = mongoose.model('Products' , ProductSchema);

module.exports = Product;