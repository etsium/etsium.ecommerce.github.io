const listaProductos = () => fetch("https://etsium.github.io/etsium.ecommerce.github.io/dbproductos.json").then( (respuesta) => respuesta.json());
//const listaProductos = () => fetch("http://localhost:3000/producto").then( (respuesta) => respuesta.json());

const login = (email, password) => fetch('https://etsium.github.io/etsium.ecommerce.github.io/dbusers.json').then( (respuesta) => respuesta.json()).then(({users})=>{
    return new Promise((resolve, reject) => {
        let i = 0;
        let login= false;
        while( i < data.length && !login ){
            if(data[i].email === email && data[i].password === password){           
                login = true;
                sessionStorage.setItem('rol', users[i].rol);
            }else{
                login = false;
            }
            i++;
        }
        resolve(login);
    });
    
});

const buttonPageLogin = document.querySelector('#header__button__login');

const ActivarElementosPorRol = () =>{
    switch (obtenerRol()) {
        case 'admin':
            buttonPageLogin.textContent = 'Cerrar Sesión'; 
            activarHerramientasAdmin();       
            break;
    
        default:
            buttonPageLogin.textContent = 'Iniciar Sesión';
            desactivarHerramientasAdmin();       
            break;
    }
}

const obtenerRol = () => {
    return sessionStorage.getItem('rol');
}

buttonPageLogin.addEventListener('click', () => {
    switch (buttonPageLogin.textContent) {
        case 'Cerrar Sesión':
            sessionStorage.setItem('rol', '');
            window.location.reload();
            break;

        default:
            window.location.href = 'login.html';
            break;
    }
});

const activarHerramientasAdmin = () =>{
    switch (window.location.pathname) {
        case '/index.html':
            break;

        case '/catalogo.html':
            document.querySelector('#button__addProduct').style.visibility = 'visible';
            document.querySelector('#button__addProduct').addEventListener('click', () => {
                window.location.href ='creador.html';
            });
        break;    
    
        default:
            break;
    }
}

const desactivarHerramientasAdmin = () =>{
    switch (window.location.pathname) {
        case '/index.html':
            break;

        case '/catalogo.html':
            document.querySelector('#button__addProduct').style.visibility = 'hidden';
        break;    
    
        default:
            break;
    }
}

const encontraProductoPorId = (array, productoId) =>{
    let producto;
    let encontrado= false;
    let i = 0;
    while (i <= array.length && !encontrado) {
        if(productoId == array[i].id){
            encontrado = true;
            producto = array[i];
        }
        i++;
    }

    return producto;
};

const eliminarProductoPorId = (idProducto) =>{
    return fetch(`http://localhost:3000/producto/${idProducto}`, {
        method: 'DELETE'
    });  
}

const crearProducto = (imagen, nombre, precio, descripcion) => {
    console.log(imagen);
    return fetch("http://localhost:3000/producto", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagen,nombre,precio,descripcion}),
    });
}

const actualizarProducto = (imagen, nombre, precio, descripcion ,id) => {
    return fetch(`http://localhost:3000/producto/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({imagen,nombre,precio,descripcion}),
    })
    .then( (respuesta) => respuesta)
    .catch( (err) => alert(err) );
}

function getBase64(file, onLoadCallback) {
    return new Promise(function(resolve, reject) {
        var reader = new FileReader();
        reader.onload = function() { resolve(reader.result); };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

const getBase64FromUrl = async (url) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob); 
        reader.onloadend = () => {
        const base64data = reader.result;   
        resolve(base64data);
        }
    });
}

const obtenerListaProductoPorCoincidencia = (conincidencia, data) => {
    let productos = [];
    data.forEach(producto => { 
        if(producto.nombre.replace(/ /g,"").search((new RegExp(conincidencia.replace(/ /g,""), "i"))) != -1 || producto.descripcion.replace(/ /g,"").search((new RegExp(conincidencia.replace(/ /g,""), "i"))) != -1 ){
            productos.push(producto);
        }
    });
    return productos;
};

ActivarElementosPorRol();

export const productServices = {
    crearProducto,
    listaProductos,
    encontraProductoPorId,
    login,
    obtenerRol,
    eliminarProductoPorId,
    getBase64,
    getBase64FromUrl,
    obtenerListaProductoPorCoincidencia,
    actualizarProducto,
}
