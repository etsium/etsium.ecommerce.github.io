const inputs = document.querySelectorAll('input');
const textareas = document.querySelectorAll('textarea');

const validar = () => {   
    const evento = 'input';

    validarElemento(inputs, evento);
    validarElemento(textareas, evento);     
};


const validarElemento = (elementos, evento) => {
    elementos.forEach( elemento => {
        elemento.addEventListener(evento, (elemento) => {
            valida(elemento.target);
            if(elemento.target.parentElement.querySelector('.input__info__cont')){
                const elementLength = elemento.target.value.length;
                const spanCont = elemento.target.parentElement.querySelector('.input__info__cont').innerHTML.split('/');
                elemento.target.parentElement.querySelector('.input__info__cont').innerHTML = `${elementLength}/${spanCont[1]}`;
            }
            
        })
    });    
};


function valida(elemento){
    const tipoDeElemento= elemento.dataset.tipo;

    switch (tipoDeElemento) {
        case 'precio':
                if(elemento.validity.valid){
                    elemento.parentElement.parentElement.classList.remove('invalid');
                    elemento.parentElement.parentElement.querySelector('span').innerHTML = '';
                }else{
                    elemento.parentElement.parentElement.classList.add('invalid');
                    elemento.parentElement.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
                }
            break;
    
        default:
                if(elemento.validity.valid){
                    elemento.parentElement.classList.remove('invalid');
                    elemento.parentElement.querySelector('span').innerHTML = '';
                }else{
                    elemento.parentElement.classList.add('invalid');
                    elemento.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
                }
            break;
    }
    
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
]

const mensajesDeError = {
    //Footer Formulario
    nombreContacto: {
        valueMissing: "El campo Nombre no puede estar vacio.",
        patternMismatch: "El nombre es demasiado largo, maximo 40 caracteres.",
    },
    mensaje: {
        valueMissing: "El campo Mensaje no puede estar vacio.",
    },

    //Crear Producto Formulario
    nombreProducto: {
        valueMissing: "El nombre del producto no puede estar vacio.",
        patternMismatch: "El nombre es demasiado largo, maximo 20 caracteres.",
    },

    precio: {
        valueMissing: "El producto tiene que tener un precio.",
    },

    descripcion: {
        valueMissing: "El producto tiene que contener una descripción.",
    },

    //Login
    email: {
        valueMissing: "Introdusca el email.",
        typeMismatch: "El formato de email es incorrecto.",
        patternMismatch: "El formato de email es incorrecto.",
    },
    password: {
        valueMissing: "Introdusca la contraseña.",
    },

}

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje;
    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje;
}

validar();