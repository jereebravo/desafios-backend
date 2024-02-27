const express = require('express');
const { Router } = express;
const routerProd = new Router();



/*
const ProductManager = require('../dao/FileSystem/models/productManager');
const products = new ProductManager();
*/

const ProductManagerMongo = require('../dao/db/ProductMongoManager')






const product = new ProductManagerMongo;







routerProd.get('/' , async (req , res) => {
    try{
        const prods = await product.getProducts();
        const limit = req.query.limit;
        const LimitPrds = prods.slice(0 , limit);
        if(limit){
            req.io.emit("allProdsLimit" , LimitPrds);
            res.status(200).send({
                msg: "Productos",
                data: LimitPrds
            }
               
        )}else{
            req.io.emit("allProds" ,  prods);
            res.send({
                msg: "Todos los Productos",
                data: prods
           });
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
})

routerProd.get('/:pid' , async (req , res) => {
    try{
        const prodId = req.params.pid;
        const producto = await product.getProductsById(prodId);

        if(product) {
            res.status(200).send({
                msg:`Producto con id: ${prodId}`,
                data: producto
            });
        } else {
            res.status(404).send({error: 'Producto no encontrado'});
        } }catch(err){
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
})

routerProd.post('/' , async (req , res) =>{
    try{
        const prod = req.body;
  
        const conf = await product.addProduct(prod);
        if(conf){
            req.io.emit("addProd" , conf);
            res.status(201).send('Producto creado exitosamente');
        }
        else{
            res.status(400).send({
                msg: "no se pudo crear el producto"
            });
        }

   
   } catch(err){
    console.log(err);
    res.status(500).send(err);
 }
   
})


routerProd.put('/:pid' , async (req , res) =>{
    try{
        const id = req.params.pid;
        const success = await product.updateProduct(id , req.body);
        if(success){
            req.io.emit("updatedProd" , success);
            res.status(200).send(`Producto con id:${id} actualizado correctamente`);
        }
        else{
            res.status(404).send('No se encontro el producto');
        }


    }
    catch(err){
        console.log(err);
        res.status(500).send('Error en el servidor');
    }
})

routerProd.delete('/:pid' , async (req , res) => {
    try{
        const id = req.params.pid;
        const conf = await product.deleteProduct(id)

        if(conf){
            req.io.emit("deletedProd" , id);
            res.send(`Producto con id: ${id} eliminado correctamente`)
        }
        else{
            res.send(`No se pudo encontrar el producto con id: ${id}`)
        }

    }
    catch(err){
        console.log(err);
        res.status(500).send('Error en el servidor');
    }

})




module.exports = routerProd;

