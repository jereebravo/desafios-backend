const express = require('express');
const chatManager = require('../dao/db/chatManager');
const {Router} = express;

const routerChat = new Router();

const chat = new chatManager;
const socketChat = async (io) =>{
    io.on('connection' , async () =>{
        const messages = await chat.addMessage();
        io.sockets.emit('messages' , messages);
    })
   

}

routerChat.get('/' , (req , res) =>{
    res.render('chat' , {});
})









module.exports = {routerChat , socketChat};