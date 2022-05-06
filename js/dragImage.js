const img = document.getElementById("producto__imagen");
const imagePreview = document.getElementById("preview");
const svg = document.querySelector(".form__svg__image");
const label = document.querySelector(".form__label__image");
const div = document.querySelector(".form__drag__image");

img.addEventListener("input", () => {
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
            svg.classList.remove('display__disabled');
            label.classList.remove('display__disabled');        
            div.classList.add('form__drag__image');
            div.classList.remove('form__drag__image__disabled');
            imagePreview.classList.add('preview__disabled');
            imagePreview.classList.remove('preview');

            const errorMessage = document.querySelector('.input-message-error');
            errorMessage.innerText = "El archivo tiene que ser una imagen";
            errorMessage.parentElement.classList.add('invalid');
        }
    }   
}