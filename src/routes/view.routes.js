const express = require('express');
const { Router } = express;
const mongoose = require('mongoose');
const ProductMongoManager = require('../dao/db/ProductMongoManager');
const chatManager = require('../dao/db/chatManager');
const cartManager = require('../dao/db/cartManagerMongo');
const productModel = require('../dao/db/models/products.model');

const product = new ProductMongoManager();
const chat = new chatManager();
const cart = new cartManager();

const routerView = new Router();





routerView.get('/home', async (req, res)=>{
    try{
        const productos = await product.getProducts();
        
        res.render('home', { productos });
    }
    catch(err){
        console.log(err);
    }
  })

  routerView.get('/realtimeproducts', async (req, res)=>{
    try{

      
      
       res.render('realTimeProducts' , { });
       const productos = await product.getProducts();
       req.io.emit("productos" , productos);
      
       
  
    }
    catch(err){
        console.log(err);
    }
  })

  //views del chat:
  
  routerView.get('/chat' , async (req , res) => {
    try{
        res.render('chat' , {});

    }
    catch(err){
      console.log(err);

    }
  })

  routerView.get('/products' , async(req , res) =>{
    const page = req.query.page || 1;
    const prods = await productModel.paginate({}, { limit: 10, page: page});


    try{
      const prodsDocs = prods.docs.map(doc => doc.toObject({ getters: true }));
      res.render('productos' , {
        prodsDocs , 
        currentpage: page , 
        hasNextPage: prods.hasNextPage , 
        hasPrevPage: prods.hasPrevPage});

    }
    catch(err){

    }

  })

  routerView.get('/carts/:cid',  async(req , res) =>{
    const carrito = req.params.cid;
    const prodsCart = await cart.showProdsCart(carrito);
    const prodsInCart = prodsCart.product.map(doc => doc.toObject({getters: true}));
    try{
      console.log(prodsInCart);
      res.render('carts' , {prodsInCart , carrito});


    }
    catch(err){

    }
  })




  const initializeSocketIo = (io) => {
    io.on('connection' , async (socket) => {
       //hago esta logica del id, para subir los mensajes al chat creado especifico guardado en mongo.
      const objectIdString = '65dd501a1939dad28cc4bdf3';
      const objectId = new mongoose.Types.ObjectId(objectIdString);

      //traigo el array messages correspondiente al chat del id;
      const Chat = await chat.getMessages(objectId);

      socket.on('new-message' , async  (data) => {
        //escucho el evento del mensaje generado en el cliente, y en el chat correspondiente del id, y genero el nuevo mensaje
       const newMessage = await chat.addMessage(objectId, data.user , data.text );
       //pusheo el mensaje al array
       Chat.push(newMessage);
       //emito el array de mensajes
        io.emit('msgs' ,Chat);

        
      });
    });
  };
   

module.exports = {routerView, initializeSocketIo};