const obtenerTema = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark": "light";
};

document.documentElement.classList.add(sessionStorage.getItem("tema") ||  obtenerTema() );

const iconStyle = document.querySelector(".header__estilo");

iconStyle.addEventListener("click" , (e) => {
    e.preventDefault();
    cambiarTema();    
    iconStyle.style.animation = "changeOut .4s ease-out";
    
    setTimeout(() => {
        const iconWhite = document.querySelector(".icon-light");
        const iconDark = document.querySelector(".icon-dark");
        iconStyle.style.animation = "change .4s ease-in";
        iconWhite.classList.toggle('no-visible');
        iconDark.classList.toggle('no-visible');       
    }, 400);
});

function cambiarTema() {
    const tema = document.documentElement.classList.value;
    if( tema == 'dark'){
        sessionStorage.setItem('tema', 'light');
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }else{
        sessionStorage.setItem('tema', 'dark');
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
};
