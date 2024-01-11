const express = require('express');
const app = express();

const ProductManager = require('./tercerDesafio');

let products = new ProductManager();

const port = 8080;

app.listen(port, ()=> {
    console.log('server run on port 8080');
})

app.get('/products', async (req, res) =>{
    try {
        const prds = await products.getProductsFs();
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.stringify(prds));
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    });

app.get('/products/:limit' , async (req, res) => {
    try{
        let limit = req.params.limit
        const prds = await products.getProductsFs();
        
        const prodsLimit = prds.slice(0 , limit);

        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.stringify(prodsLimit));
    }
    catch(err){
        console.log('error al obtener productos: ', err)

    }
})

app.get('/product/:pid' , async  (req , res) =>{
    try{
        const productId = parseInt(req.params.pid);
        const product = await products.getProductsById(productId)

        if(product) {
          res.send(product) 
        }
        else{
            res.status(404).send({error: 'producto no entontrado'})
        }
    }
    catch(err){
        console.log('error al obtener el producto', err)
        res.send({error: 'error al obtener el producto'})

    }
})


