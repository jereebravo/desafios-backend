//importo express
const express = require('express');
const app = express();

//importo mi ruta de productos
const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')


const port = 8080
app.use(express.json());

//Routes de los Productos
app.use('/api/products' , routerProd);
//Routes de los carts
app.use('/api/carts' , routerCart);

app.listen(port, ()=> {
    console.log('server run on port 8080');
})







