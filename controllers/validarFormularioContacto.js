import { validarElemento, valida } from "./validaciones.controller.js";

window.addEventListener('load', () => {
    const inputs = document.querySelectorAll('#formulario__contacto .form__input_validate');
    const textareas = document.querySelectorAll('#formulario__contacto textarea');
    const evento = 'input';

    validarElemento(inputs, evento);
    validarElemento(textareas, evento);  

    document.querySelector('#button__contact').addEventListener( 'submit', () => {
        window.location.href = 'index.html';
    })

    document.querySelector('#button__contact').addEventListener( 'click', (e) => {
        inputs.forEach(input => {
            valida(input);            
        });
        textareas.forEach(textarea => {
            valida(textarea);        
        });
    });
});