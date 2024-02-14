const chat = require('../db/models/chat.model');

class chatManager {
    constructor() {
      
    }
  
    addMessage = async ( user, text ) => {
     
      try{
          
        await chat.create(user , text);
        console.log("nuevo mensaje");
        return true;
        
       }
     catch(err){
       console.log(err);
       
        
     }
    };
}

module.exports = chatManager;