import { productServices } from "../js/services.js"
import { valida, validarElemento } from "./validaciones.controller.js";
const buttonLogin = document.querySelector("#button__login");

window.addEventListener('load', () => {    
    const inputs = document.querySelectorAll('input');

    validarElemento(inputs, 'input');
})

buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.querySelector('#input__email');
    const password = document.querySelector('#input__password');
    let valido = true; 
    if(!valida(email)){
        valido=false;
    }
    if(!valida(password)){
        valido=false;
    }
    if(valido){
        logeo(email.value, password.value);
    }
});



const logeo = async (email, password) => {
    const auth = await productServices.login(email, password);
    if(auth){
        document.querySelector('.input-message-error').textContent = '';
        window.location.href = 'index.html';
    }else{
        const loginform = document.querySelector('.login__form');
        const mensajeError = document.createElement('span');
        mensajeError.textContent = 'Email o contraseña incorrecto';
        mensajeError.classList.add('invalid');
        loginform.appendChild(mensajeError);
    }
}
