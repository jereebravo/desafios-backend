let socket = io();

socket.emit('message' , "hola me estoy comunicando desde el cliente");

console.log("estoy funcionando");

socket.on("mensaje-servidor" , (data) =>{
    console.log(data);
})

socket.on('products' , (data) =>{
    renderProds(data);
})

const renderProds = (data) => {
    const products = data.map(element => {
        return (`
        <li class="list-group-item"> <p class="propiedad">TITLE:</p> ${element.title}</li>
        <li class="list-group-item"><p class="propiedad">ID:</p> ${element.id}</li>
        `)
    }).join('');

     document.querySelector('.list-group').innerHTML = products;
     return false



}