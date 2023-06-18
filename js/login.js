const formLogin = document.getElementById("formLogin");
const btnLogin = document.getElementById("btnLogin");
const errorDiv = document.getElementById("errorDiv");
const errorLabel = document.getElementById("errorLabel");
const nombreLogin = document.getElementById("nombreLogin");
const contraseñaLogin = document.getElementById("contraseñaLogin");

let vLogin = false;
limpiarLogin();

const urlUsuarios = "https://648d08998620b8bae7ed860a.mockapi.io/Usuarios";
const arrUsuarios=[];

//Trae los usuarios de la BD de MockAPI
function traerUsuarios() {
  fetch(urlUsuarios)
    .then((jsonUsuarios) => jsonUsuarios.json())
    .then((data) => {
      data.forEach((usuario) => {
        arrUsuarios.push(usuario);
      });
    });
}
traerUsuarios();

function validaUsuarioExistente () {
  if (localStorage.getItem("email") && localStorage.getItem("contraseña")) 
    {
      usuarioLogin.value=localStorage.getItem("email");
      contraseñaLogin.value=localStorage.getItem("contraseña");
    }
}
validaUsuarioExistente ();

formLogin.addEventListener("submit", function (event) {
  event.preventDefault();
});

//Funcion para validar del loguin
function validarLogin() {
  if (usuarioLogin.value == "" || contraseñaLogin.value == "") {
    errorLabel.innerText = "Debe ingresar su usuario y contraseña";
    errorDiv.classList.remove("disableElement");
    vLogin = false;
    return false;
  } else {
    //Busca el usuario en el arreglo de obj usuario
    let usrEncontrado = arrUsuarios.filter((e)=>{
      return  e.email===usuarioLogin.value; //&& e.contrasena===contraseñaLogin.value;
    })
    usrEncontrado.forEach(e => {
      if (usuarioLogin.value != e.email || contraseñaLogin.value != e.contrasena) {
          errorLabel.innerText = "El usuario y/o la contraseña no coinciden!, ingreselos nuevamente";
          errorDiv.classList.remove("disableElement");
          usuarioLogin.focus();
          vLogin = false;
          return false;
      } else {
        vLogin = true;
        //Guardar los datos en el localStorage
        localStorage.setItem("nombre", e.nombre);
        localStorage.setItem("apellido", e.apellido);
        localStorage.setItem("email", e.email);
        localStorage.setItem("contraseña", e.contrasena);
        return true;
      }
    });
  }
}

function enviarLogin() {
  window.location.href = "../pages/entradas.html";
}

btnLogin.addEventListener("click", () => {
  validarLogin();
  vLogin === true && enviarLogin();
});

function limpiarLogin () {
  vLogin=false;
}