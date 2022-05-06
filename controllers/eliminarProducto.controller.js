import { productServices } from "../js/services.js";

window.addEventListener("load", () => { 
    setTimeout( () => {
        const buttonsDelete  =document.querySelectorAll('.svg__delete');
        buttonsDelete.forEach(button => {
            button.addEventListener('click', () => {
                const url = new URL(button.parentElement.parentElement.parentElement.querySelector('.producto__enlace').href);
                const idProducto = url.searchParams.get("Producto");
                productServices.eliminarProductoPorId(idProducto);
            });
        });
    }, 100);
});



