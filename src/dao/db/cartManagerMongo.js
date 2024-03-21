const cart = require("./models/carts.model");

class cartManager {
  constructor() {}

  createCart = async () => {
    try {
      //Creamos un carrito sin ningun producto
      const carrito = await cart.create({});
      console.log("carrito creado exitosamente");
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  addProdCart = async (cartId, idProd) => {
    try {
      //comprobamos que exista un carrito en la coleccion a traves del id
      const existingCart = await cart.findById(cartId);

      const ExistingProduct = existingCart.product.findIndex((prod) =>
        prod.productId.equals(idProd)
      );

      if (ExistingProduct !== -1) {
        existingCart.product[ExistingProduct].amount += 1;

        //Actualizamos el carrito con sus nuevos productos
        console.log("Producto agregado al carrito correctamente");
        
        
      } else {
        existingCart.product.push({
          productId: idProd,
          amount: 1,
        });

        console.log("Producto nuevo añadido correctamente");
        
        
      }
      await existingCart.save();
      return true
     
    } catch (err) {
      console.log(err);
    }
  };

  showProdsCart = async (cartId) => {
    const existingCart = cart.findById(cartId);

    if (existingCart) {
      return existingCart;
    } else {
      return `No se encontro el carrito con id:${cartId}`;
    }
  };

  deleteProdCart = async (cartId, prodId) => {
    try {
      const existingCart = await cart.findById(cartId);

      if (existingCart) {
        //Buscamos dentro de nuestro carrito el producto que coincida con el id pasado por parametro
        const prodCartIndex = existingCart.product.findIndex((prod) =>
        prod.productId.equals(prodId)
        );

        if (prodCartIndex !== -1) {
          //si findIndex encuentra el producto, le eliminamos uno al mismo.
          existingCart.product[prodCartIndex].amount -= 1;
          

          if (existingCart.product[prodCartIndex].amount === 0) {
            //si el producto va a llegar a amount = 0, eliminamos al mismo del carrito.
            existingCart.product.splice(prodCartIndex, 1);
            return true
      
          }
          
          await existingCart.save();
          return true
          

          
        } else {
          console.log("Producto no encontrado en el carrito");
          return false
        }
      } else {
        return "no se encontro el carrito";
        
      }
    } catch (err) {
      console.log(err);
    }
  };

  deleteCart = async (cartId) => {
    try {
      const carrito = await cart.findByIdAndDelete(cartId);

      if (carrito) {
        console.log("Carrito eliminado");
        return true;
      } else {
        console.log("Error al eliminar el carrito");
      }
    } catch (err) {
      console.log(err);
    }
  };
}

module.exports = cartManager;
