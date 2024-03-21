const express = require('express');
const { Router } = express;
const routerProd = new Router();



/*
const ProductManager = require('../dao/FileSystem/models/productManager');
const products = new ProductManager();
*/

const ProductManagerMongo = require('../dao/db/ProductMongoManager')
const ProductModel = require('../dao/db/models/products.model');






const product = new ProductManagerMongo;




routerProd.get('/' , async (req , res) => {
    try{
        const prods = await product.getProducts();
        //Query para el limite de productos, si no recibe nada muestra 10
        const limit = req.query.limit || 10;
        //Query para las paginas, si no recibe nada por defecto es 1
        const page = req.query.page || 1;
        //Query que puede recibir caulquier categoria correspondiente a los productos
        const category = req.query.category;
        //Query para ordenar por precio, puede recibir asc o desc
        const sort = req.query.sort;

        //Configuro las diferentes propiedades que va a usar mi paginacion.
        const options = {
            page: page,
            limit: limit,
            sort: sort ? {price: req.query.sort} : undefined
        }

        


        if(category === "tecnologia" || category === "peluches" || category === "juguetes"){
            //Si recibe alguna categoria hace lo siguiente:

           const mensaje = `Productos de ${category}`;

            const prodsCategory = await ProductModel.paginate({category: category} , options);
            const response = {
                status:"success",
                payload: prodsCategory.docs,
                totalPages: prodsCategory.totalPages,
                prevPage: prodsCategory.prevPage,
                nextPage: prodsCategory.nextPage,
                page: page,
                hasPrevPage: prodsCategory.hasPrevPage,
                hasNextPage: prodsCategory.hasNextPage,
                prevLink: prodsCategory.hasPrevPage ? "http://localhost:8080/api/products/" : false,
                nextLink: prodsCategory.hasNextPage ? "http://localhost:8080/api/products/" : false
    
            }
            res.status(200).send({
                msg: mensaje ,
                data: response

            })
            

        }
        else{
            //Si no recibe ninguna categoria, muestra todos los productos de la base de datos
            
            const prods = await ProductModel.paginate({} , options);
            const response = {
                status:"success",
                payload: prods.docs,
                totalPages: prods.totalPages,
                prevPage: prods.prevPage,
                nextPage: prods.nextPage,
                page: page,
                hasPrevPage: prods.hasPrevPage,
                hasNextPage: prods.hasNextPage,
                prevLink: prods.hasPrevPage ? `http://localhost:8080/api/products/?page=${page - 1} `: false,
                nextLink: prods.hasNextPage ? `http://localhost:8080/api/products/?page=${page + 1}` : false
    
            }

            
            res.status(200).send({
                msg:"Productos",
                data: response

            })

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

