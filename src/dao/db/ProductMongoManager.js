const Product = require('./models/products.model')

class ProductManager {
    constructor() {
      
    }
  
    addProduct = async ({title, description, code, price, status, stock , category ,thumbnail} ) => {
     
      try{
          
        await Product.create({title, description, code, price, status, stock , category ,thumbnail});
        console.log("El producto se creo exitosamente");
        return true;
        
       }
     catch(err){
       console.log(err);
       
        
     }
    };
  
    async getProducts() {
      try{
        const allProds = await Product.find().lean();
        //console.log(allProds);
        return allProds;

      }
      catch(err){
        console.log(err)
        return err;

      }
    }
  
    async getProductsById(id) {
     const prod = await Product.findById(id)
     console.log(prod);
     return prod;
    }
  
    async updateProduct(id, contentUpdated) {
      try {
        const productUpdated = await Product.findByIdAndUpdate(id , contentUpdated , { new: true }); 

          if(productUpdated){
              console.log("Producto actualizado correctamente");
              return true;

          }else{
            
            console.log("ocurrio un error al actualizar el producto");
          }
          
      }
    catch (error) {
        console.error("Error:", error);
        return false;
      }
    }
  
    async deleteProduct(id) {
      try {
      const productDeleted = await Product.findByIdAndDelete(id);

      if(productDeleted) {

        console.log(`Producto con id: ${id} eliminado correctamente`)

      return true;
      }

        console.log(`No se puedo eliminar el producto con id: ${id}`);
        return false
      

      } catch (err) {
        console.log("A ocurrido un error: ", err);
      }
    }
  }
  

  

  module.exports = ProductManager;