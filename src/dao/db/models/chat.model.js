const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  messages : [
   {
   user: {
      type: String,
      required: true
     },
     text: {
      type: String,
      required: true
     }

  }
]
   
});


const chat = mongoose.model('Chat' , chatSchema);

module.exports = chat;