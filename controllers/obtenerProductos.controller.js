import { productServices } from "../js/services.js";
const srcGaleriaImagenes = 'https://raw.githubusercontent.com/etsium/Ecommerse..github.io/main/img/';

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
                divProducto.innerHTML = crearProducto(producto.nombre, producto.precio, producto.id);              
                seccion.appendChild(divProducto);    
            });
            break;
        
        case "index.html":
            for (let index = 0 ; index < 3; index++) {
                const categoria = document.querySelector(`#seccion__${data[index].id} .productos__seccion__nombre`).textContent;
                const seccion = document.querySelector(`#seccion__${index+1}`);
                const productos = obtenerListaProductoPorCategoria(categoria, data);        
    
                for (let i = 0; i < 6; i++) {
                    const divProducto = document.createElement('div');
                    divProducto.classList.add('producto');
                    divProducto.classList.add(`producto${i+1}`);
                    divProducto.innerHTML = crearProducto(productos[i].nombre, productos[i].precio, productos[i].id);              
                    seccion.appendChild(divProducto);    
                }
            }
            break;
        
        case "exhibidor.html":
            const productoId = new URLSearchParams(window.location.search).get('Producto');
            const producto = encontraProductoPorId(data, productoId);
            const productosSimilares = obtenerListaProductoPorCategoria(producto.categoria, data);

            crearExhibidorProducto(producto);
            crearSeccionSimilares(productosSimilares, producto.id);

            break;

        default:
            break;
    }
});

const crearSeccionSimilares = (productosSimilares, idActual) => {
    const seccion = document.querySelector(`.productos__seccion`);

    for (let i = 0; i < 6; i++) {
        if(productosSimilares[i].id != idActual){
            const divProducto = document.createElement('div');
            divProducto.classList.add('producto');
            divProducto.classList.add(`producto${i+1}`);
            divProducto.innerHTML = crearProducto(productosSimilares[i].nombre, productosSimilares[i].precio, productosSimilares[i].id);              
            seccion.appendChild(divProducto);    
        }        
    }
};

const crearExhibidorProducto = (producto) =>{
    const exhibidor = document.querySelector(".exhibidor__producto");
    const contenedorExhibidor = crearExhibidor(producto.nombre,producto.precio,producto.descripcion);

    exhibidor.innerHTML = contenedorExhibidor
    document.querySelector('.exhibidor__producto__imagen').style.backgroundImage = `url('${srcGaleriaImagenes}producto${producto.id}.png')`;

};

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

const obtenerListaProductoPorCategoria = (categoria, data) => {
    let productos = [];
    data.forEach(producto => {
        if(categoria == producto.categoria){
            productos.push(producto);
        }
    });
    return productos;
};

const crearProducto = (nombre, precio, id) => {
    const contenido = 
    `
    <a class="producto__enlace" href="exhibidor.html?Producto=${id}">
        <div class="producto__imagen">
            <img src="${srcGaleriaImagenes}producto${id}.png" alt="Imagen del producto">
        </div>
        <h4 class="producto__nombre">${nombre}</h4>
        <p class="producto__precio">${precio}</p>
        Ver producto
    </a>
    `;

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

