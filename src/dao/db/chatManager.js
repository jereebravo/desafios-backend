const chat = require('../db/models/chat.model');

class chatManager {
    constructor() {
      
    }

    createChat = async() => {
      try{
        const Chat = chat.create({});
        console.log("chat creado exitosamente");
        return true;

      }
      catch(err){
        console.log(err);
        return false

      }
    }
  
    addMessage = async ( chatId , user, text ) => {
     
      try{
          
       const existingChat = await chat.findById(chatId);

       if(existingChat){
         const newMessage = {
          user: user,
          text: text
         }

         existingChat.messages.push(newMessage);
        await existingChat.save();
        console.log('Mensaje agregado correctamente');
        return newMessage;

       }
       else{
        console.log('No se encontro el chat');

       }
        
       }
     catch(err){
       console.log(err);
       
        
     }
    };

    getMessages = async (id) => {
    
      const existingChat = await chat.findById(id);
  
      if (existingChat) {
        const messages = existingChat.messages;
        return messages;
      } else {
        return `No se encontro el carrito con id:${id}`;
      }
   
  
    }

    deleteMessages = async (id) => {
      try{
        const messageDeleted = await chat.findByIdAndDelete(id);
        
        if(messageDeleted){
          console.log('Chat borrado')
          return true
        }
        else{
          console.log("No se pudo eliminar el chat")
          return false
        }

      }
      catch(err){
        console.log(err);

      }

    }

 }


module.exports = chatManager;