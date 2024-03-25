let socket = io();

//socket de la vista realtimeproducts

//renderizar la lista
socket.on("productos" , (data) => {
  const products = data;
  renderProds(products);
})
const renderProds = (data) => {
    const products = data.map(element => {
        return (`
        <li class="list-group-item"> <p class="propiedad">TITLE:</p> ${element.title}</li>
        <li class="list-group-item"><p class="propiedad">ID:</p> ${element._id}</li>
        `)
    }).join('');

     document.querySelector('.list-group').innerHTML = products;
     return false;
     
}

//agregar un producto
socket.on("addProd" , (data) => {
  addProduct(data);

})

const addProduct = (data) => {
    const title = JSON.parse(data.title);
    const id = JSON.parse(data._id);

    const productList = document.querySelector('.list-group');
    
    const product = document.createElement('li');
    product.innerHTML= `
    <p class="propiedad">ID:</p>${title}</li>
    <p class="propiedad">ID:</p>${id}</li>
    `

    product.className = "list-group-item";

    productList.appendChild(product);
    return false;
}

//eliminar un producto
socket.on("deletedProd" , (id) =>{
    deleteProd(id);

})

const deleteProd = (id) => {
const ID = id;

const productElement = document.querySelector(`.list-group-item:contains"${ID}"`);

if(productElement) {
    productElement.remove();

    console.log("Se elimino el producto con ID: ", ID);
}else{
    console.log("No se encontro el producto con ID" , ID);
}

}

//cierre

//logica del chat
socket.on('msgs' , (data) => {
    //recibo el array de mensajes y renderizo por cada mensaje un elemento
    renderMessages(data);
})

const sendMessage = (e) => {
    //funcion que recibe los mensajes escritos y la vista chat
    const message = {
        user:document.getElementById('username').value,
        text: document.getElementById('text').value
    } 

    console.log(message);
    
    //emite el mensaje generado
    socket.emit('new-message' , message);
    return false;
}

function renderMessages(data){
    const html = data.map(elem => {
        return (`
          <div>
            <strong> ${elem.user} </strong>
            <em> ${elem.text} </em>
          </div>
        `)
  }).join(' ')

  document.getElementById('caja').innerHTML = html


} 


//logica de view productos
