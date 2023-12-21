class ProductManager {
  constructor(products = []) {
    this.products = products;
    this.ProductId = 1;
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

  getProducts(){
    return this.products
  }

  getProductsById(id){
    return this.products.find((product) => product.id === id);
  }
}

const product = new ProductManager();

product.addProduct("Producto 1" , "producto de prueba" , 200 ,"sin imagen" , "abc1" , 4);
product.addProduct("Producto 2" , "producto de prueba" , 300 ,"sin imagen" , "abc2" , 8);
product.addProduct("Producto 3" , "producto de prueba" , 400 ,"sin imagen" , "abc3" , 6);

console.log("metodo getproducts que muestra el array de productos")
console.log(product.getProducts());

console.log("-------------------------")
console.log("")
console.log("muestro repeticion del code")
product.addProduct("Producto 3" , "producto de prueba" , 400 ,"sin imagen" , "abc3" , 6);

console.log("-----------------------")
console.log("")

console.log("muestro metodo getProducsById")
console.log(product.getProductsById(1));
console.log(product.getProductsById(2));
console.log(product.getProductsById(3));