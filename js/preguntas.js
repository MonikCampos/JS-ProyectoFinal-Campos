//Preguntas frecuentes

//Función para el acordeón: al hacer click
//muestra la respuesta, agragar los iconos más y menos
const acordeon = document.getElementsByClassName("acordeon");
const icon = document.getElementsByClassName("icon");
const faUsr = document.getElementById("faUsr");

for (let i = 0; i < acordeon.length; i++) {
    acordeon[i].addEventListener("click", function () {
        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            icon[i].classList.remove('fa-minus');
            icon[i].classList.add('fa-plus');
            panel.style.display = "none";
        } else { 
            if ( panel.style.display = "none") {
            icon[i].classList.remove('fa-plus');
            icon[i].classList.add('fa-minus');
            panel.style.display = "block";
            }
        }
    });
}

function validarUsr() {
    if (localStorage.getItem('nombre') != null && localStorage.getItem('apellido') != null && localStorage.getItem('contraseña') !=null || localStorage.getItem('email') != null) {
        //Asigna el nombre del usuario logueado a la página
        faUsr.innerHTML = localStorage.getItem('nombre');
    } 
}

validarUsr();