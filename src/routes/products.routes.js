const express = require('express');
const { Router } = express;
const routerProd = new Router();

const ProductManager = require('../models/tercerDesafio');

const products = new ProductManager();


routerProd.get('/' , async (req , res) => {
    try{
        const prods = await products.getProductsFs();
        const limit = parseInt(req.query.limit);
        const LimitPrds = prods.slice(0 , limit);
        if(limit){
            res.status(200).send(LimitPrds);
        }else{
            res.send(prods);
        }
    }catch(err){
        console.log(err);
    }
})

routerProd.get('/:pid' , async (req , res) => {
    try{
        const prodId = parseInt(req.params.pid);
        const product = await products.getProductsById(prodId);

        if(product) {
            res.status(200).send(product);
        } else {
            res.status(404).send({error: 'Producto no encontrado'});
        } }catch(err){
        console.log(err);
    }
})

routerProd.post('/' , async (req , res) =>{
    try{
        const prod = req.body;
  
        const conf = await products.addProduct(prod);
        if(conf){
            res.status(201).send('Producto creado exitosamente');
        }
        else{
            res.status(400).send('No se pudo crear el producto');
        }

   
   } catch(err){
    console.log(err);
    res.status(400).send(err);
 }
   
})


routerProd.put('/:pid' , async (req , res) =>{
    try{
        const id = parseInt(req.params.pid);
        const conf = await products.updateProduct(id , req.body);
        if(conf){
            res.status(200).send(`Producto con id:${id} actualizado correctamente`);
        }
        else{
            res.status(404).send('No se encontro el producto');
        }


    }
    catch(err){
        console.log(err);
    }
})

routerProd.delete('/:pid' , async (req , res) => {
    try{
        const id = parseInt(req.params.pid);
        const conf = await products.deleteProduct(id)

        if(conf){
            res.send(`Producto con id: ${id} eliminado correctamente`)
        }
        else{
            res.send(`No se pudo encontrar el producto con id: ${id}`)
        }

    }
    catch(err){
        console.log(err);
    }

})





module.exports = routerProd;