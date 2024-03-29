const express = require('express');
const { Router } = express;
const routerCart = new Router();

const cartManager = require('../dao/db/cartManagerMongo');
const cart = new cartManager();

routerCart.post('/' , async (req , res) =>{
    try{
        const conf = await cart.createCart({});
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
        console.log(productsInCart);

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

routerCart.post('/:cid/products/:pid' , async (req , res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    try{
        const addProductCart = await cart.addProdCart(cartId , prodId);

        if(addProductCart){
            res.status(200).send(`Se agrego el producto con id: ${prodId} , al carrito con id: ${cartId} `)
        }else{
            res.status(400).send('No se pudo agregar el producto al carrito');

        }

    }
    catch(err){
        console.log(err);
    }
})

routerCart.put('/:cid/products/:pid' , async (req , res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;
    const quantity = req.body.quantity;

    try{
        const addQuantity = await cart.addProdQuantity(cartId , prodId , quantity);

        if(addQuantity){
            res.status(200).send(`Se agregaron ${quantity} productos de ${prodId} al carrito ${cartId}`)
        }
        else{
            res.status(400).send('Error al agregar el producto');
        }

    }
    catch(err){

    }
})

routerCart.delete('/:cid' , async (req , res) => {
    const cartId = req.params.cid;
    try{
        const eliminarCarrito = cart.deleteCart(cartId);

        if(eliminarCarrito){
            res.status(200).send(`El carrito con id: ${cartId} se elimino correctamente`)
        }
        else{
            res.status(400).send("No se pudo eliminar el carrito");
        }

    }
    catch(err){
        console.log(err);
    }
})

routerCart.delete('/:cid/products/:pid' , async (req , res) => {
    const cartId = req.params.cid;
    const prodId = req.params.pid;

    try{
        const deleteProduct = cart.deleteProdCart(cartId , prodId);

        if(deleteProduct){
            res.status(200).send(`El producto con id: ${prodId} fue eliminado exitosamente del carrito con id: ${cartId}`);
        }
        else{
            res.status(400).send('No se pudo eliminar el carrito');
        }

    }
    catch(err){
        console.log(err);

    }
})

module.exports = routerCart;