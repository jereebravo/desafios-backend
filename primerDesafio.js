const fs = require("fs");

class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.ProductId = 1;
    this.path = "./product.JSON";
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("todos los campos son obligatorios");
    } else if (!this.products.some((p) => p.code === code)) {
      let newProduct = {
        id: this.ProductId++,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);
    } else {
      console.log(`el codigo ${code} ya existe en otro producto`);
    }
  }

  getProducts() {
    return this.products;
  }

  getProductsFs() {
    fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        let productString = JSON.parse(res);
        console.log(productString);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getProductsById(id) {
    fs.promises.readFile(this.path, "utf-8")
      .then((res) => {
        let products = JSON.parse(res);
        let productId = products.find((product) => product.id === id);
        console.log(productId);
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

        await fs.promises.writeFile(this.path,JSON.stringify(products, null, 2),"utf-8");

        console.log(`Producto con ID ${id} actualizado exitosamente.`);
      } else {
        console.log(`Producto con ID ${id} no encontrado.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  saveProductsInFs() {
    const content = JSON.stringify(product.getProducts(), null, 2);
    try {
      fs.promises.writeFile("product.JSON", content, "utf-8");
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProduct(id){

    try{
      const content = await fs.promises.readFile(this.path, 'utf-8');
    const products = JSON.parse(content);

    const productId = products.findIndex((product) => product.id === id);

    if(productId){
      products.splice(productId, 1);
      await fs.promises.writeFile(this.path, JSON.stringify(products, null , 2), 'utf-8');
      console.log(`Producto con id: ${id} eliminado exitosamente.`)

    }
    else{
      console.log(`El producto con el id: ${id} no fue encontrado`)
    }

    }
    catch(err){
      console.log("A ocurrido un error: ", err);
    }

  }
}

const product = new ProductManager();

product.addProduct("libro", "libro de harry potter", 230, "img.url", 233, 5);
product.addProduct("juego de sabanas","color azul y blanco",150,"img.url",500,10);
product.addProduct("remera", "color negro", 200, "img.url", 333, 5);
product.addProduct("pantalon", "tipo jean color gris", 250, "img.url", 123, 3);
product.addProduct("zapatillas", "color negro", 400, "img.url", 400, 200);
product.addProduct("musculosa", "color negro", 250, "image.url", 489, 10);

 //product.saveProductsInFs(); Este meotodo guarda todos los productos en nuestro archivo json.
 //product.deleteProduct(2); Este metodo elimina un producto de nuestro archivo dependiendo el id que le pasemos.
 //product.updateProduct(2 , {price:200}); Este metodo actualiza alguna propiedad de nuestro prodcutos, recibe 2 parametro, el id del producto y la propiedad a actualizar(en forma de objeto).
//product.getProductsById(2); Este metodo nos devuelve en forma de objeto js un producto de nuestro archivo JSON.
//product.getProductsFs(); Este metodo nos devuelve en forma de array js, nuestro array alojado en nuestro archivo JSON.