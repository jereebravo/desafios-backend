const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];
  }

 
    addProduct = async (title, description, price, thumbnail, code, stock) => {

      let prodId = this.products.length > 0 ? Math.max(...this.products.map((product) => product.id)) + 1 : 1;
      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log("todos los campos son obligatorios");
      } else if (!this.products.some((p) => p.code === code)) {
        let newProduct = {
          id: prodId,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        };
        this.products.push(newProduct);
  
        await fs.promises.writeFile(this.path, JSON.stringify(this.products , null, 2), 'utf-8');
      } else {
        console.log(`el codigo ${code} ya existe en otro producto`);
      }
    }
  
  async getProductsFs() {
     return await fs.promises.readFile(this.path, "utf-8")
    .then((res) => {
      let products = JSON.parse(res);
      //console.log(products); comento este console.log para que no se ejecute cada vez que uso el endpoint.
       return products;
    })
    .catch((err) => {
      console.log('error:',err)
    });
  }

  getProductsById(id) {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        let products = JSON.parse(res);
        let productId = products.find((product) => product.id === id);
        //console.log(productId) comento este console.log para que no se ejecute cada vez que uso el endpoint.
        return productId
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateProduct(id, contentUpdated) {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const productIndex = products.findIndex((product) => product.id === id);

      if (productIndex !== -1) {
        Object.assign(products[productIndex], contentUpdated);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );

        console.log(`Producto con ID ${id} actualizado exitosamente.`);
      } else {
        console.log(`Producto con ID ${id} no encontrado.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async deleteProduct(id) {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const productId = products.findIndex((product) => product.id === id);

      if (productId) {
        products.splice(productId, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log(`Producto con id: ${id} eliminado exitosamente.`);
      } else {
        console.log(`El producto con el id: ${id} no fue encontrado`);
      }
    } catch (err) {
      console.log("A ocurrido un error: ", err);
    }
  }
}

const product = new ProductManager();
/*
product.addProduct('libro' , 'libro de harry potter', 230, 'img-url' , 233, 10);
product.addProduct('libro' , 'libro de maquiavelico', 350, 'img-url' , 333, 20);
product.addProduct('libro' , 'libro de programacion', 330, 'img-url' , 433, 6);
product.addProduct('libro' , 'libro de el señor de los anillos', 500, 'img-url' , 533, 7);
product.addProduct('juguete' ,'barby', 500, 'img-url' , 633, 13);
product.addProduct('juguete' , 'max steel', 450, 'img-url' , 733, 9);
product.addProduct('juguete' , 'lego', 600, 'img-url' , 833, 20);
product.addProduct('teclado' , 'redragon kurama',1000, 'img-url' , 933, 7);
product.addProduct('mouse' , 'logitech', 1500, 'img-url' , 1033, 23);
product.addProduct('monitor' , 'lg', 2500, 'img-url' , 1133, 4);
*/

//product.updateProduct(1 , {price: 300});

//product.getProductsFs();

//product.getProductsById(2);

//product.deleteProduct();

module.exports = ProductManager;



