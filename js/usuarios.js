const formUsuarios = document.getElementById("formUsuarios");
const btnSubmit = document.getElementById("btnSubmit");
const btnReset = document.getElementById("btnReset");
const errorDiv = document.getElementById("errorDiv");
const errorLabel = document.getElementById("errorLabel");

const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const dni = document.getElementById("dni");
const email = document.getElementById("email");
const contraseña1 = document.getElementById("contraseña1");
const contraseña2 = document.getElementById("contraseña2");

let validarUsr = false;

formUsuarios.addEventListener("submit", function (event) {
    event.preventDefault();
});

//Funcion para validar que todos los datos tengan contenido
function validarUsrFormulario() {
    if (nombre.value == "" || apellido.value == "" || dni.value == "" || email.value == "" || contraseña1.value == "" || contraseña2.value == "") {
        errorLabel.innerText="Para poder guardar el usuario debe completar todos sus datos!";
        errorDiv.classList.remove("disableElement");
        validarUsr = false;
        return false;
    } else {
        if (contraseña1.value != contraseña2.value) {
            errorLabel.innerText="Las contraseñas no coinciden!, ingreselas nuevamente";
            errorDiv.classList.remove("disableElement");
            contraseña1.value="";
            contraseña2.value="";
            contraseña1.focus();
            validarUsr = false;
            return false;
        } else {
        validarUsr = true;
        return true;
        }
    }
}

function enviarUsrFormulario() {
    //Guardar los datos del usuario en un JSON para la BD
    let usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value,
        email: email.value,
        contraseña1: contraseña1.value
    };
    
    //Json
    let json = JSON.stringify(usuario);
    //Guardar en BD
    
    //Guardar los datos en el localStorage para simular el funcionamiento de la app
    localStorage.setItem("nombre", nombre.value);
    localStorage.setItem("apellido", apellido.value);
    localStorage.setItem("email", email.value);
    localStorage.setItem("contraseña", contraseña1.value);

    formUsuarios.reset();
    errorLabel.innerText="";
}

btnReset.addEventListener("click", () => {
    formUsuarios.reset();
    errorLabel.innerText="";
});

btnSubmit.addEventListener("click", () => {
    if (validarUsrFormulario()) {
        enviarUsrFormulario();
        window.location.href = "../pages/login.html";
    }
    
});