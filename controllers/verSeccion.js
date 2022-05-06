const buttonView = document.querySelector('#form__button__verseccion');

buttonView.addEventListener('click', (e) =>{
    e.preventDefault();
    window.location.href = 'index.html?#seccion__2';
});