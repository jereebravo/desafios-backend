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

//Traigo base de datos desde mongo
const Database = require('./dao/db/index')



//importo mis rutas 
const routerProd = require('./routes/products.routes');
const routerCart = require('./routes/carts.routes');
const routerChat = require('./routes/chat.routes');
const {routerView , initializeSocketIo} = require('./routes/view.routes');





//motor de plantilla
app.engine('handlebars' , handlebars.engine());
app.set(`view engine` , 'handlebars');
app.set('views' , __dirname+'/views');




const port = 8080 || process.env.PORT;

//utilizo initializeSocketIo para poder exportar io a mi ruta views
initializeSocketIo(io);

app.use(express.json());
//middleware para poder usar io en cualquier parte de la aplicacion
app.use((req , res , next) => {
    req.io = io;
    return next();
});



//Routes de los Productos
app.use('/api/products' , routerProd);
//Routes de los carts
app.use('/api/carts' , routerCart);
//routes del chat
app.use('/chats' , routerChat);
//routes views
app.use('/views' , routerView);


io.on('connection', (socket) => {
    console.log('a user connected');

  });

server.listen(port, ()=> {
    console.log('server run on port 8080');
    Database.connect()
})











