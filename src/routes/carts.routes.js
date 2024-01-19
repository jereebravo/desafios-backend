const express = require('express');
const { Router } = express;
const routerCart = new Router();

const cartManager = require('../models/cart');
const cart = new cartManager();

routerCart.post('/' , async (req , res) =>{
    try{
        const conf = await cart.createCart();
        if(conf){
            
        res.status(201).send('Carrito creado correctamente');

        }
        else{
            res.status(400).send('El carrito no se pudo crear');
        }
       

    }
    catch(err){
        console.log(err);
    }
})

routerCart.get('/:cid' , async (req , res) =>{
    const cartId = req.params.cid;
    try{
        const productsInCart = await cart.showProdsCart(cartId);

        if(productsInCart !== null){
            res.status(200).send(productsInCart);
        }
        else{
            res.status(404).send('Carrito no encontrado');
        }

    }
    catch(err){
        console.log(err);
    }
})

module.exports = routerCart;