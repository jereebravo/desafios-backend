//importo express
const express = require('express');
//traigo handlebars
const handlebars = require('express-handlebars');
const app = express();
//traigo http
const http = require('http');
const server = http.createServer(app);
//socket
const { Server } = require('socket.io');
const io = new Server(server);
app.use(express.static(__dirname+'/public'))

//traigo mi class products
const productManager = require('../src/models/productManager')
const product = new productManager();

//importo mi ruta de productos
const routerProd = require('./routes/products.routes')
const routerCart = require('./routes/carts.routes')
const routerView = require('./routes/home.routes');



//motor de plantilla
app.engine('handlebars' , handlebars.engine());
app.set(`view engine` , 'handlebars');
app.set('views' , __dirname+'/views');




const port = 8080 || process.env.PORT;

app.use(express.json());

//Routes de los Productos
app.use('/api/products' , routerProd);
//Routes de los carts
app.use('/api/carts' , routerCart);
//Routes de las vistas
app.use('/home' ,  routerView);


io.on('connection' , async (socket) => {
    console.log('user conectado')
    socket.on('message' , (data) =>{
        console.log(data);
    })
    const prods = await product.getProductsFs();
    io.sockets.emit('products' , prods );
})

server.listen(port, ()=> {
    console.log('server run on port 8080');
})








