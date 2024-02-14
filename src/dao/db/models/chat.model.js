const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
   user: {
    type: String,
    required: true
   },
   text: {
    type: String,
    required: true
   }
});


const chat = mongoose.model('Chat' , chatSchema);

module.exports = chat;