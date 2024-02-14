const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect('mongodb+srv://jeremiasbravo44:lX2pskpSIPV5FdWE@cluster0.syzrcnr.mongodb.net/ecommerce')
        .then(()=>{
            console.log('conexion a DB exitosa')
        })
        .catch((err) =>{
            console.log(err);
        })
    }
}