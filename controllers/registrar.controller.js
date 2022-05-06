import { productServices } from "../js/services.js";
import { validarElemento, valida } from "./validaciones.controller.js";

const buttonAdd = document.querySelector('#product__add');
window.addEventListener('input', () => {
    validarformularioProducto();
});

buttonAdd.addEventListener('click', (e) => {
    e.preventDefault();
    if(validarformularioProducto()){        
        if(buttonAdd.textContent === 'Agregar producto'){
            const imagen = document.querySelector('#producto__imagen').files[0];
            var imagenConvertida = productServices.getBase64(imagen);
            imagenConvertida.then(function(imagen) {        
                const nombre = document.querySelector('[data-nombre]').value;
                const precio = document.querySelector('[data-precio]').value;
                const descripcion = document.querySelector('[data-descripcion]').value;
                productServices.crearProducto(imagen, nombre, precio, descripcion)
                .then( () => {
                    window.location.href = 'catalogo.html';
                }).catch((err) => console.log(err));
            });
        }else{
            const imagen = document.querySelector('#producto__imagen').files[0];
            var imagenConvertida = productServices.getBase64(imagen);
            imagenConvertida.then(function(imagen) {
            const url = new URL(window.location.href);
            const idProducto = url.searchParams.get("Producto");
            const nombre = document.querySelector('[data-nombre]').value;
            const precio = document.querySelector('[data-precio]').value;
            const descripcion = document.querySelector('[data-descripcion]').value;            
            productServices.actualizarProducto(imagen, nombre, precio, descripcion, idProducto)
            .then( () => {
                window.location.href = 'catalogo.html';
            }).catch((err) => console.log(err));
            })
        }
        
    }
});

const validarformularioProducto = () =>{
    const inputs = document.querySelectorAll('#form__producto .form__input_validate');
    const textareas = document.querySelectorAll('#form__producto textarea');
    const evento = 'input';

    validarElemento(inputs, evento);
    validarElemento(textareas, evento);  

    let valido = true;
 
    inputs.forEach(input => {
        if(!valida(input)){
            valido= false;
        }
    });
    textareas.forEach(textarea => {
        if(!valida(textarea)){
            valido= false;
        }
    });        
    return valido;
}