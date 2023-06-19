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

const urlUsuarios = "https://648d08998620b8bae7ed860a.mockapi.io/Usuarios";

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
                if (typeof(dni.value)===Number) {
                    errorLabel.innerText="El dni debe ser numérico!, ingréselo nuevamente";
                    errorDiv.classList.remove("disableElement");
                    dni.focus();
                    validarUsr = false;
                    return false;
                } else {
                    validarUsr = true;
                    return true;
                }
        }
    }
}

async function crearUsuarioAsync(usr) {
    //Tranforma en Json y guarda los datos del usuario en MockAPI
    const resp = await fetch(urlUsuarios, {
    method: "POST",
    body: JSON.stringify(usr),
    headers: {
        "Content-Type": "application/json",
    },
    });
    const data = await resp.json();
    
    //Guardar los datos en el localStorage
    localStorage.setItem("nombre", usr.nombre);
    localStorage.setItem("apellido", usr.apellido);
    localStorage.setItem("email", usr.email);
    localStorage.setItem("contraseña", usr.contrasena);

    //Librería: Confirmación de creación de usuario con éxito!
    Swal.fire({
        title: '<strong>Bienvenido, ' + localStorage.getItem("nombre") + '</strong>',
        html:
        '<b>El usuario fue creado con éxito!</b>' +
        '<br><a href="../pages/login.html">LOGIN</a> ',
        showCloseButton: true,
        showCancelButton: false,
        focusConfirm: true,
        confirmButtonColor: '#044D8C',
        confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Genial!',
    }) .then((result) => {
        if (result.isConfirmed) {
            formUsuarios.reset();
            errorLabel.innerText="";
            window.location.href = "../pages/login.html";
        } 
    })
}

function enviarUsrFormulario() {
    let usuario = {
        nombre: nombre.value,
        apellido: apellido.value,
        dni: dni.value,
        email: email.value,
        contrasena: contraseña1.value
    };
    //Guarda los datos del usuario en MockAPI
    crearUsuarioAsync(usuario);
}

btnReset.addEventListener("click", () => {
    formUsuarios.reset();
    errorLabel.innerText="";
});

btnSubmit.addEventListener("click", () => {
    validarUsrFormulario() === true ? enviarUsrFormulario() : Swal.fire('Verifique que los datos ingresados!');
});