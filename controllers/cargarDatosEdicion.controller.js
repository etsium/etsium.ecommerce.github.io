import { productServices } from "../js/services.js";

const img = document.getElementById("producto__imagen");
const imagePreview = document.getElementById("preview");
const svg = document.querySelector(".form__svg__image");
const label = document.querySelector(".form__label__image");
const div = document.querySelector(".form__drag__image");

window.addEventListener("load", (data) => { 
    productServices.listaProductos().then((res)=> {
        data = res.producto;
        const url = new URL(window.location.href);
        const idProducto = url.searchParams.get("Producto");
        if(idProducto != null){
            document.querySelector('#product__add').textContent = 'Guardar Cambios';
            const producto = productServices.encontraProductoPorId(data, idProducto);
            MostrarImagenPreviaProducto();
            const form = document.querySelector('#form__producto');
            const spanContNombre = form.querySelector('#producto__nombre').parentElement.querySelector('.input__info__cont').innerHTML.split('/');
            const spanContDescripcion = form.querySelector('#producto__descripcion').parentElement.querySelector('.input__info__cont').innerHTML.split('/');
           
            
            productServices.getBase64FromUrl(producto.imagen).then((data)=>{
                MostrarImagenPreviaProducto();
                const imagen = document.querySelector('#preview');
                imagen.src = data;
            });
            form.querySelector('#producto__nombre').value = producto.nombre;
            form.querySelector('#producto__nombre').parentElement.querySelector('.input__info__cont').textContent = `${producto.nombre.length}/${spanContNombre[1]}`;
            form.querySelector('#producto__precio').value = producto.precio;
            form.querySelector('#producto__descripcion').value = producto.descripcion;
            form.querySelector('#producto__descripcion').parentElement.querySelector('.input__info__cont').textContent = `${producto.descripcion.length}/${spanContDescripcion[1]}`;
        }else{

        }
        
    }); 
});



img.addEventListener("change", () => {
    const imgDetails = document.querySelector("#producto__imagen").files[0];
    if (imgDetails) {
        previewImage(imgDetails);
    } else {
    }

})

function previewImage(imgD) {
    const reader = new FileReader();

    // PREVIEW
    reader.addEventListener("load", function () {
        imagePreview.src = reader.result;
        imagePreview.style.background = `url(${reader.result})`;    
        MostrarImagenPreviaProducto();
    })

    // CHECK IF THERE IS SELECTION 
    if (imgD) {
        // CHECK IF THE FILE IS AN IMAGE
        if (imgD.type === "image/jpeg" || imgD.type == "image/jpg" || imgD.type == "image/gif" || imgD.type == "image/png") {

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(imgD);
        } else {
            OcultarImagenPreviaProducto();
            const errorMessage = document.querySelector('.input-message-error');
            errorMessage.innerText = "El archivo debe ser una imagen."
        }
    }   
}

const MostrarImagenPreviaProducto = () => {
    svg.classList.add('display__disabled');
    label.classList.add('display__disabled');        
    div.classList.remove('form__drag__image');
    div.classList.add('form__drag__image__disabled');
    imagePreview.classList.remove('preview__disabled');
    imagePreview.classList.add('preview');   
};

const OcultarImagenPreviaProducto = () => {
    svg.classList.remove('display__disabled');
    label.classList.remove('display__disabled');        
    div.classList.add('form__drag__image');
    div.classList.remove('form__drag__image__disabled');
    imagePreview.classList.add('preview__disabled');
    imagePreview.classList.remove('preview');   
};




