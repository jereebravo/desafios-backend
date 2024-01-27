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




//importo mi ruta de productos
const { routerProd, socketProducts } = require('./routes/products.routes');
const routerCart = require('./routes/carts.routes');





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





io.on('connection' , async (socket) => {
    console.log('user conectado')
    socket.on('message' , (data) =>{
        console.log(data);
    })
  
   
})

server.listen(port, ()=> {
    console.log('server run on port 8080');
})

//uso el appset para poder usar el socket en mis rutas
socketProducts(io);





