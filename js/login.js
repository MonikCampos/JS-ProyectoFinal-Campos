const formLogin = document.getElementById("formLogin");
const btnLogin = document.getElementById("btnLogin");
const errorDiv = document.getElementById("errorDiv");
const errorLabel = document.getElementById("errorLabel");

const nombreLogin = document.getElementById("nombreLogin");
const contraseñaLogin = document.getElementById("contraseñaLogin");

let vLogin = false;

formLogin.addEventListener("submit", function (event) {
    event.preventDefault();
});

//Funcion para validar del loguin
function validarLogin() {
    if (usuarioLogin.value == "" || contraseñaLogin.value == "") {
        errorLabel.innerText="Debe ingresar su usuario y contraseña";
        errorDiv.classList.remove("disableElement");
        vLogin = false;
        return false;
    } else {
        if (usuarioLogin.value != localStorage.getItem("email") || contraseñaLogin.value != localStorage.getItem("contraseña"))  {
            errorLabel.innerText="El usuario y/o la contraseña no coinciden!, ingreselos nuevamente";
            errorDiv.classList.remove("disableElement");
            usuarioLogin.focus();
            vLogin = false;
            return false;
        } else {
        vLogin = true;
        return true;
        }
    }
}

function enviarLogin() {
    //Guardar los datos del usuario en un JSON para la BD
    // let usuario = {
    //     nombre: nombre.value,
    //     apellido: apellido.value,
    //     dni: dni.value,
    //     email: email.value,
    //     contraseña1: contraseña1.value
    // };
    
    //Json
    // let json = JSON.stringify(usuario);
    //Guardar en BD
    
    //Guardar los datos en el localStorage para simular el funcionamiento de la app
    // localStorage.setItem("nombre", nombre.value);
    // localStorage.setItem("apellido", apellido.value);
    // localStorage.setItem("email", email);
    // localStorage.setItem("contraseña", contraseña);

    // formUsuarios.reset();
    errorLabel.innerText="paso";
    window.location.href = "../pages/entradas.html";
}

btnLogin.addEventListener("click", () => {
    if (validarLogin()) {
        enviarLogin();
    }
});
