const formContacto = document.getElementById("formContacto")
const btnSubmit = document.getElementById("btnSubmit")
const btnReset = document.getElementById("btnReset")
const errorDiv = document.getElementById("errorDiv")
const errorLabel = document.getElementById("errorLabel")
const faUsr = document.getElementById("faUsr")
let validar = false

const nombre = document.getElementById("nombre")
const apellido = document.getElementById("apellido")
const email = document.getElementById("email")
const celular = document.getElementById("celular")
const mensaje = document.getElementById("mensaje")

formContacto.addEventListener("submit", function (event) {
    event.preventDefault()
})

//Funcion para validar que todos los datos requeridos tengan contenido
function validarFormulario() {
    if (nombre.value === "" || email.value === "" || mensaje.value === "") {
        errorLabel.innerText="Para poder enviar el mensaje debe completar su nombre, email y el mensaje!"
        errorDiv.classList.remove("disableElement")
        validarUsr = false
        return false
    } else {
        validarUsr = true
        return true
    }
}

function validarUsr() {
    if (localStorage.getItem('nombre') != null && localStorage.getItem('apellido') != null && localStorage.getItem('contraseña') !=null || localStorage.getItem('email') != null) {
        //Asigna el nombre del usuario logueado a la página
        faUsr.innerHTML = localStorage.getItem('nombre')
    } 
}
validarUsr()

function enviarFormulario() {
    let objMensaje = {
        nombre: nombre.value,
        apellido: apellido.value,
        email: email.value,
        celular: celular.value,
        msg: mensaje.value
    }
    //Guarda los datos del mensaje en un json
    const jsonMensaje = JSON.stringify(objMensaje)
    //Acá se envía el mensaje con una librería
    Swal.fire({
        icon: 'success',
        title: 'El mensaje fue enviado con éxito',
        showConfirmButton: false,
        timer: 1500
    })
    formContacto.reset()
    errorLabel.innerText=""
}

btnReset.addEventListener('click', () => {
    formContacto.reset()
    errorLabel.innerText=""
})

btnSubmit.addEventListener("click", () => {
    validarFormulario() === true ? enviarFormulario() : Swal.fire('Complete los datos requeridos')
})