const fs = require('fs');
const uuid4 = require("uuid4");
const id = uuid4();


class cartManager {
    constructor (){
        this.path = './src/carts.json';
        this.id = id;
    }




   createCart = async () => {
    try{
        const content = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);

        const newCart = {
            id: this.id,
            products: []
        }

    carts.push(newCart);
    await fs.promises.writeFile(this.path , JSON.stringify(carts , null , 2), 'utf-8');
    console.log("Carrito agregado correctamente");
    return true;

    }
    catch(err){
        console.log(err);
    }

    }

    addProducCart = async(id , prodId) =>{
        try{
            //traigo los carts
        const content = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(content);
            //traigo los productos
        const content2 = await fs.promises.readFile('./src/products.json' , 'utf-8');
        const products = JSON.parse(content2);

           //Busco el carrito correspondiente segun el id
         const cartIndex = carts.findIndex((cart) => cart.id === id);
         //busco el producto correspondiente segun el id
         const product = products.find((product) => product.id === prodId);
         console.log(product);


         if(cartIndex !== -1){
            const cart = carts[cartIndex];

            const ProductExists = cart.products.findIndex((product) => product.id === prodId);

            if(ProductExists !== -1) {
                cart.products[ProductExists].quantity += 1;
            }
            else{
                const newProd = {
                    id: product.id,
                    quantity: 1
                }
                cart.products.push(newProd);
            }

            await fs.promises.writeFile(this.path , JSON.stringify(carts, null, 2),  'utf-8');
            console.log(`Producto agregado al carrito con id: ${id}`)
            return true;
         }
         else{
            console.log(`No se encontro el id: ${id}`);
            return false;
         }
        }
        catch(err){
            console.log(err);
            return false;
        }

    }

    showProdsCart = async (id) =>{

        try{
            const content = await fs.promises.readFile(this.path, 'utf-8');
            const carts = JSON.parse(content);

            const cart = carts.find((c) => c.id === id);

            if (cart){
                const productsCart = cart.products;
                if(productsCart.length > 0){
                    return productsCart;
                }
                else{
                  return "Aun no hay productos en el carrito"
                }
            }
            else{
                return null;
            }

        }
        catch(err){
            console.log(err);

        }

    } 
}


module.exports = cartManager;