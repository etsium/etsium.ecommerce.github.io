import { productServices } from "../js/services.js";

window.addEventListener("load", () => { 
    setTimeout( () => {
        const buttonsedit  =document.querySelectorAll('.svg__edit');
        buttonsedit.forEach(button => {
            button.addEventListener('click', () => {
                const url = new URL(button.parentElement.parentElement.parentElement.querySelector('.producto__enlace').href);
                const idProducto = url.searchParams.get("Producto");
                window.location.href = `creador.html?Producto=${idProducto}`;                           
            });
        });
    }, 500);
});
