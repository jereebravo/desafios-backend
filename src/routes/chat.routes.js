const express = require('express');
const chatManager = require('../dao/db/chatManager');
const {Router} = express;

const routerChat = new Router();

const chat = new chatManager;


routerChat.get('/' , async (req , res) =>{
     try{
        const messages = await chat.getMessages();

        if(messages){
            req.io.emit("allMesagges" , messages);
            res.status(200).send({
                msg: "messages",
                data: messages
            });
            
        }
        else{
            res.status(404).send({error: 'Mensajes no encontrados'});
        }


     }
     catch(err){
        res.status(500).send('Error del servidor');

     }
})

routerChat.post('/' , async(req , res) => {
    try{
        const createChat = await chat.createChat();

        if(createChat){
            res.send('chat creado correctamente');
        }
        else{
            res.send('Error al crear el chat');
        }

    }
    catch(err){
        console.log(err);
    }
})

routerChat.delete('/:cid' , async (req , res) => {
    try{
        const id = req.params.cid;
        const messageDel = await chat.deleteMessages(id);

        if(messageDel){
            res.send("Chat eliminado correctamente")
        }
        else{
            console.log("Error al eliminar el chat");
        }



    }
    catch(err){
        console.log(err);

    }
})









module.exports = routerChat;