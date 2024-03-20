const mongoose = require('mongoose');

module.exports = {
    connect: () => {
        return mongoose.connect('mongodb+srv://jeremiasbravo44:coder.av8vdu@cluster0.syzrcnr.mongodb.net/ecommerce')
        .then(()=>{
            console.log('conexion a DB exitosa')
        })
        .catch((err) =>{
            console.log(err);
        })
    }
}