const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.products = [];
  }

  addProduct = async ({ title, description, code, price, status, stock , category ,thumbnail }) => {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      let prodId =
        products.length > 0
          ? Math.max(...products.map((product) => product.id)) + 1
          : 1;

      if ( !title || !description || !code || !price || !stock || !category ) {
        console.log("todos los campos son obligatorios");
      } else if (!products.some((p) => p.code === code)) {
        const newProduct = {
          id: prodId,
          title,
          description,
          code,
          price,
          stock,
          category,
          status:true,
          thumbnail:[],
          
        };

        products.push(newProduct);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log("Producto agregado exitosamente");
        return true;
      } else {
        console.log(`el codigo ${code} ya existe en otro producto`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  async getProductsFs() {
    return await fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        let products = JSON.parse(res);
        //console.log(products); comento este console.log para que no se ejecute cada vez que uso el endpoint.
        return products;
      })
      .catch((err) => {
        console.log("error:", err);
      });
  }

  getProductsById(id) {
    return fs.promises
      .readFile(this.path, "utf-8")
      .then((res) => {
        let products = JSON.parse(res);
        let productId = products.find((product) => product.id === id);
        //console.log(productId) comento este console.log para que no se ejecute cada vez que uso el endpoint.
        return productId;
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

      if('id' in contentUpdated){
        console.log("No se puede actualizar el id");
        return false;
      }

      else if (productIndex !== -1 ) {
        Object.assign(products[productIndex], contentUpdated);

        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );

        console.log(`Producto con ID ${id} actualizado exitosamente.`);
        return true;
      } 
      else{
        console.log(`Producto con ID ${id} no encontrado.`)
      }
    } catch (error) {
      console.error("Error:", error);
      return false;
    }
  }

  async deleteProduct(id) {
    try {
      const content = await fs.promises.readFile(this.path, "utf-8");
      const products = JSON.parse(content);

      const productId = products.findIndex((product) => product.id === id);

      if (productId !== -1) {
        products.splice(productId, 1);
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(products, null, 2),
          "utf-8"
        );
        console.log(`Producto con id: ${id} eliminado exitosamente.`);
        this.products = products;
        return true;
      } else {
        console.log(`El producto con el id: ${id} no fue encontrado`);
      }
    } catch (err) {
      console.log("A ocurrido un error: ", err);
    }
  }
}

const product = new ProductManager();

//product.updateProduct(1 , {price: 300});

//product.getProductsFs();

//product.getProductsById(2);

//product.deleteProduct();

module.exports = ProductManager;
