import { productServices } from "../js/services.js";

const formulario = document.querySelector('[data-form]');

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.querySelector('[data-nombre]').value;
    const precio = document.querySelector('[data-precio]').value;
    const descripcion = document.querySelector('[data-descripcion]').value;
    productServices.crearProducto(nombre, precio, descripcion)
    .then( () => {
        console.log("resgistro completado");
    }).catch((err) => console.log(err));
});