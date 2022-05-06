import { productServices } from "../js/services.js";
const contenidoPrincipal = document.querySelector('main').innerHTML;
const buscador = document.querySelector('#input__search');

buscador.addEventListener('input', ()=>{
    const main = document.querySelector('main');
    const conincidencia = buscador.value;
    console.log(buscador.value);
    if(buscador.value === ''){
        window.location.reload();
    }else{
        main.innerHTML = 
        `
        <div class="productos__seccion">   
            <h2 class="productos__seccion__nombre">${conincidencia}</h2>
        </div>
        `;
    
        productServices.listaProductos().then((productos) =>{
            const matchproducts = productServices.obtenerListaProductoPorCoincidencia(conincidencia, productos);
            const seccion = document.querySelector('.productos__seccion');

            cambiarGridTemplateAreasSeccion( seccion );

            matchproducts.forEach(producto => {
                const pagecontent = crearContenidoBuscado(producto);
                const productocreado = document.createElement('a');
                productocreado.innerHTML = pagecontent;
    
                seccion.appendChild(productocreado);
            });
            
        })
    }
   

    
});



const crearContenidoBuscado = (producto) => {
    const contenido = 
    `
    <a class="producto__enlace" href="exhibidor.html?Producto=${producto.id}">
        <div class="producto__imagen">
            <img src="${producto.imagen}" alt="Imagen del producto">
        </div>
        <h4 class="producto__nombre">${producto.nombre}</h4>
        <p class="producto__precio">${producto.precio}</p>
        Ver producto
    </a>
    `;

    return contenido;
}

const cambiarGridTemplateAreasSeccion = ( seccion ) => {
    if(window.matchMedia("(min-device-width: 1600px)").matches){
        seccion.style.gridTemplateAreas = '"seccion seccion seccion seccion seccion seccion" "producto1 producto2 producto3 producto4 producto5 producto6"';
    }

    if(window.matchMedia("(min-device-width: 1000px) and (max-device-width: 1600px)").matches){
        seccion.style.gridTemplateAreas = '"seccion seccion seccion seccion" "producto1 producto2 producto3 producto4"';
    }

    if(window.matchMedia("(max-device-width: 1000px)").matches){
        seccion.style.gridTemplateAreas = '"seccion seccion" "producto1 producto2"';
    }
};