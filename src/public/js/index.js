let socket = io();

socket.emit('message' , "hola me estoy comunicando desde el cliente");

console.log("estoy funcionando");

socket.on("mensaje-servidor" , (data) =>{
    console.log(data);
})

socket.on('products' , (data) =>{
    //console.log(data);
    renderProds(data);
})


const renderProds = (data) => {
    console.log(data);
    const products = data.map(element => {
        return (`
        <li class="list-group-item"> <p class="propiedad">TITLE:</p> ${element.title}</li>
        <li class="list-group-item"><p class="propiedad">ID:</p> ${element._id}</li>
        `)
    }).join('');

     document.querySelector('.list-group').innerHTML = products;
     return false

}

//logica del chat
socket.on('new-message' , (data) => {
    renderMessages(data)
})

const sendMessage = (e) => {
    const message = {
        user:document.getElementById('username').value,
        text: document.getElementById('text').value
    } 

    console.log("hola");
    console.log(message);
    

    socket.emit('new-message' , message);
    return false;
}

function renderMessages(data){
    const html = data.map(elem => {
        return(`
        <div>
        <strong> ${elem.user} </strong>
        <em> ${elem.text} </em>
         
        </div>
        
        `)
    }).join('')

    document.getElementById('caja').innerHTML = html
} 