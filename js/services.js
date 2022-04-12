const listaProductos = () => fetch("https://etsium.github.io/Ecommerse..github.io/dbproductos.json").then( (respuesta) => respuesta.json());

const crearProducto = (nombre, precio, descripcion) => {
    return fetch("http://localhost:3000/producto", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({nombre,precio, descripcion}),
    });
}

/*
const img = document.getElementById("producto__imagen");
const imagePreview = document.getElementById("preview");
const svg = document.querySelector(".form__svg__image");
const label = document.querySelector(".form__label__image");
const div = document.querySelector(".form__drag__image");

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
        svg.classList.add('display__disabled');
        label.classList.add('display__disabled');        
        div.classList.remove('form__drag__image');
        div.classList.add('form__drag__image__disabled');
        imagePreview.classList.remove('preview__disabled');
        imagePreview.classList.add('preview');
    })

    // CHECK IF THERE IS SELECTION 
    if (imgD) {
        // CHECK IF THE FILE IS AN IMAGE
        if (imgD.type === "image/jpeg" || imgD.type == "image/jpg" || imgD.type == "image/gif" || imgD.type == "image/png") {

            // CONVERTS FILE TO BASE 64
            reader.readAsDataURL(imgD);
        } else {
            errorMessage.innerText = "File type should be an image"
        }
    }   
}*/

export const productServices = {
    crearProducto,
    listaProductos,
}