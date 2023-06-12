const formContacto = document.getElementById("formContacto")
const btnSubmit = document.getElementById("btnSubmit")
const btnReset = document.getElementById("btnReset")
const faUsr = document.getElementById("faUsr");
let validar = false

formContacto.addEventListener("submit", function (event) {
    event.preventDefault()
    if (validar) {
        //enviar formulario
    } else {
        alert("Por favor complete los campos")
    }
})

function validarUsr() {
    if (localStorage.getItem('nombre') != null && localStorage.getItem('apellido') != null && localStorage.getItem('contraseña') !=null || localStorage.getItem('email') != null) {
        //Asigna el nombre del usuario logueado a la página
        faUsr.innerHTML = localStorage.getItem('nombre');
    } 
}

validarUsr();

function enviarFormulario () {

}

btnReset.addEventListener('click', () => {
    formContacto.reset();
});
btnSubmit.addEventListener('click', () => {
    let nombre = document.getElementById("nombre").value;
    let apellido = document.getElementById("apellido").value;
    let email = document.getElementById("email").value;
    let celular = document.getElementById("celular").value;
    let mensaje = document.getElementById("mensaje").value;

    // Enviar los datos a un correo electrónico
    alert(`
    DATOS PARA ENVIAR CORREO
    Nombre: ${nombre}
    Apellido: ${apellido}
    Email: ${email}
    Celular: ${celular}
    Mensaje: ${mensaje}
    `);

    formContacto.reset();
});