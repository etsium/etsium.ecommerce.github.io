import { productServices } from "../js/services.js";

const cargarProductos = productServices.listaProductos().then((res)=> {
    const data = res.producto;
    const url = document.URL.split("/").pop().split("?").shift();

    switch (url) {
        case "catalogo.html":
            const seccion = document.querySelector(`.productos__seccion`);
            data.forEach(producto => {
                const divProducto = document.createElement('div');
                divProducto.classList.add('producto');
                divProducto.classList.add(`producto${producto.id}`);
                divProducto.innerHTML = crearProducto(producto.imagen, producto.nombre, producto.precio, producto.id);              
                seccion.appendChild(divProducto);    
            });
            break;
        
        case "index.html":
            for (let index = 0 ; index < 3; index++) {

                const seccionNombre = document.querySelector(`#seccion__${index+1} .productos__seccion__nombre`).textContent;
                const seccion = document.querySelector(`#seccion__${index+1}`);
                const productos = productServices.obtenerListaProductoPorCoincidencia(seccionNombre, data);
                let i = 0;
                while( i < productos.length && i < 6){
                    const divProducto = document.createElement('div');
                    divProducto.classList.add('producto');
                    divProducto.classList.add(`producto${i+1}`);
                    divProducto.innerHTML = crearProducto(productos[i].imagen, productos[i].nombre, productos[i].precio, productos[i].id);              
                    seccion.appendChild(divProducto);
                    i++;
                }                
            }
            break;
        
        case "exhibidor.html":
            const productoId = new URLSearchParams(window.location.search).get('Producto');
            const producto = productServices.encontraProductoPorId(data, productoId);
            const productosSimilares = productServices.obtenerListaProductoPorCoincidencia(producto.nombre, data);
            crearExhibidorProducto(producto);
            crearSeccionSimilares(productosSimilares, producto.id);
            break;

        default:
            break;
    }
});

const crearSeccionSimilares = (productosSimilares, idActual) => {
    const seccion = document.querySelector(`.productos__seccion`);
    let i = 0 ;
    let cantidad = 1;

    while ( i < productosSimilares.length && cantidad != 7 ) {
        if( productosSimilares[i].id != idActual ){          
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            divProducto.classList.add(`producto${cantidad}`);
            divProducto.innerHTML = crearProducto(productosSimilares[i].imagen, productosSimilares[i].nombre, productosSimilares[i].precio, productosSimilares[i].id);              
            seccion.appendChild(divProducto);    
            cantidad++;
        }
        i++;
    }
    
};

const crearExhibidorProducto = (producto) =>{
    const exhibidor = document.querySelector(".exhibidor__producto");
    const contenedorExhibidor = crearExhibidor(producto.nombre,producto.precio,producto.descripcion);

    exhibidor.innerHTML = contenedorExhibidor
    document.querySelector('.exhibidor__producto__imagen').style.backgroundImage = `url('${producto.imagen}')`;

};

const crearProducto = (imagen, nombre, precio, id) => {
    let contenido;
    if(productServices.obtenerRol() === 'admin'){
        contenido = 
        `
        <div class="producto__menu">
            <a>
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="svg__icono__menu svg__delete"
                width="24" 
                height="24" 
                transform: ;
                msFilter:;">
                <path d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"></path>
            </svg>
            </a>
            <a>
            <svg 
                xmlns="http://www.w3.org/2000/svg"
                class="svg__icono__menu svg__edit"
                width="24" height="24" 
                transform: ;
                msFilter:;">
            <path d="M8.707 19.707 18 10.414 13.586 6l-9.293 9.293a1.003 1.003 0 0 0-.263.464L3 21l5.242-1.03c.176-.044.337-.135.465-.263zM21 7.414a2 2 0 0 0 0-2.828L19.414 3a2 2 0 0 0-2.828 0L15 4.586 19.414 9 21 7.414z"></path>
            </svg>
            </a>
        </div>
        <a class="producto__enlace" href="exhibidor.html?Producto=${id}">
            <div class="producto__imagen">
                <img src="${imagen}" alt="Imagen del producto">
            </div>
            <h4 class="producto__nombre">${nombre}</h4>
            <p class="producto__precio">${precio}</p>
            Ver producto
        </a>
        `;
    }else{
        contenido =
        `
        <a class="producto__enlace" href="exhibidor.html?Producto=${id}">
            <div class="producto__imagen">
                <img src="${imagen}" alt="Imagen del producto">
            </div>
            <h4 class="producto__nombre">${nombre}</h4>
            <p class="producto__precio">${precio}</p>
            Ver producto
        </a>
        `;
    }   

    return contenido;
}

const crearExhibidor = (nombre, precio, descripcion) => {
    const contenido = 
    `
    <div class="exhibidor__producto__imagen"></div>
    <div class="exhibidor__producto__info">
        <h1 class="exhibidor__producto__titulo">${nombre}</h1>
        <p class="exhibidor__producto__precio">${precio}</p>
        <p class="exhibidor__producto__descripcion">${descripcion}</p>
    </div>
    `;

    return contenido;
}

cargarProductos;

