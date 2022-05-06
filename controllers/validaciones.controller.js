export const validarElemento = (elementos, evento) => {
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


export function valida(elemento){
    const tipoDeElemento= elemento.dataset.tipo;
    switch (tipoDeElemento) {
        case 'precio':
                if(elemento.validity.valid){
                    elemento.parentElement.parentElement.classList.remove('invalid');
                    elemento.parentElement.parentElement.querySelector('span').innerHTML = '';
                    return true;
                }else{
                    elemento.parentElement.parentElement.classList.add('invalid');
                    elemento.parentElement.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
                    return false;
                }
            break;
    
        default:
                if(elemento.validity.valid){
                    elemento.parentElement.classList.remove('invalid');
                    elemento.parentElement.querySelector('span').innerHTML = '';
                    return true;
                }else{
                    elemento.parentElement.classList.add('invalid');
                    elemento.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeElemento, elemento);
                    return false;
                }
            break;
    }
    
}

const tipoDeErrores = [
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'stepMismatch',
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
        patternMismatch: "El nombre es demasiado largo, maximo 30 caracteres.",
    },

    precio: {
        valueMissing: "El producto tiene que tener un precio.",
        stepMismatch: 'Solo se puede agregar dos numeros despues de la coma',
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
