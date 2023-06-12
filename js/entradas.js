 //Lógica para la vta de entradas
const formEntradas = document.getElementById('formEntradas')
const formPelicula = document.getElementById('formPelicula')
const formPrecio = document.getElementById('formPrecio')
const formAsiento = document.getElementById('formAsiento')
const formResumen = document.getElementById('formResumen')
let selectCine = document.getElementById('selectCine')
const saludoUsr = document.getElementById('saludoUsr')
const faUsr = document.getElementById('faUsr')
const sectionMovie = document.getElementById('sectionMovie')
selectCine.addEventListener('change', onChangeCine)
const idVta = 0

let selectPelicula = null
let selectFormato = null
let selectDia = null
let selectHora = null
let siguienteCine = null
let selectPrecio = null
let selectCantidad = null
let siguientePrecio = null
let selectAsiento = null
let siguienteAsiento = null
let selectTarjeta = null
let siguienteResumen = null
let pagar = null

let validar = false
let validarPelicula = false
let validarCine = false
let validarFormato = false
let validarDia = false
let validarHora = false
let validarPrecio = false
let validarCantidad = false
let validarAsiento = false
let validarTarjeta = false
let validarResumen = false

formEntradas.addEventListener('submit', function (event) {
    event.preventDefault()
    if (validar) {
        envioFormulario()
    }
});

//Busca si hay usuario logueado para asignarle la compra y saludarlo
function validarUsr() {
    if (localStorage.getItem('nombre') != null && localStorage.getItem('apellido') != null && localStorage.getItem('contraseña') !=null || localStorage.getItem('email') != null) {
        //Saluda y habilita a comprar entradas
        saludoUsr.classList.remove("disableElement");
        saludoUsr.innerHTML = `Hola ${localStorage.getItem('nombre')} ${localStorage.getItem('apellido')}!`;
        //Asigna el nombre del usuario logueado a la página
        faUsr.innerHTML = localStorage.getItem('nombre');
        formPelicula.classList.remove("disableElement");
        selectCine.classList.remove("disableElement");
    } else {
        //si no encuentra usuario logueado, lo redirecciona al loguin, no permite compra
        saludoUsr.classList.remove("disableElement");
        saludoUsr.innerHTML = 'Para comprar entradas, si ya está registrado por favor identifíquese con su email y contraseña <a class="btn btn-light" href="./login.html">AQUÍ</a>';
        formEntradas.classList.add("disableElement");
    }
}

//Función que busca si hay una película seleccionada en el localstorage para empezar la compra de entrada asociada
function validarMovie() {
    if (localStorage.getItem('pelicula') != null) {
        //Muestra el nombre de la película
        sectionMovie.innerHTML = `<h3>Película seleccionada: ${localStorage.getItem('pelicula')}</h3><br> 
        <a class="btn btn-dark" id="otraPelicula">SELECCIONAR OTRA PELÍCULA</a> 
        <a class="btn btn-dark" href="../index.html">IR A CARTELERA</a>`;
        //Btn que permite cambiar la selección de película
        let otraPelicula = document.getElementById("otraPelicula");
        otraPelicula.addEventListener('click', function () {
            //Limpia la selección de la película
            selectCine.classList.add("disableElement");
            localStorage.setItem('pelicula', null);
            //voy a hacer una función que cargue los nombres de las peliculas en el local y los traiga acá
            sectionMovie.innerHTML = `<h3>Selección de película</h3>
            <select name="selectPelicula" id="selectPelicula">
                <option selected value="0">Seleccione Película...</option>
                <option value="La Sirenita">La Sirenita</option>
                <option value="Cuando ellas quieren más">Cuando ellas quieren más</option>
                <option value="Amor a primer mensaje">Amor a primer mensaje</option>
                <option value="Cría Siniestra">Cría Siniestra</option>
                <option value="Último recurso">Último recurso</option>
                <option value="La Barbarie">La Barbarie</option>
                <option value="El triunfo">El triunfo</option>
                <option value="La sudestada">La sudestada</option>
                <option value="Guardianes de la Galaxia">Guardianes de la Galaxia</option>
                <option value="Misántropo">Misántropo</option>
                <option value="Vera">Vera</option>
                <option value="Rápidos y Furiosos X">Rápidos y Furiosos X</option>
                <option value="Sombras de un crimen">Sombras de un crimen</option>
                <option value="La extorsión">La extorsión</option>
                <option value="John Wick 4">John Wick 4</option>
                <option value="Super Mario Bros">Super Mario Bros</option>
            </select>
            <p></p>
            `;
            selectPelicula = document.getElementById('selectPelicula')
            selectPelicula.addEventListener("change", onChangePelicula)
        });
        formPelicula.classList.remove("disableElement")
        selectCine.classList.remove("disableElement")
        validarPelicula=true;
        return true;
    } else {
        //No hay pelicual seleccionada, select que permite cambiar la elegir de película
        sectionMovie.innerHTML = `<h3>Selección de película</h3>
        <select name="selectPelicula" id="selectPelicula">
            <option selected value="0">Seleccione Película...</option>
            <option value="La Sirenita">La Sirenita</option>
            <option value="Cuando ellas quieren más">Cuando ellas quieren más</option>
            <option value="Amor a primer mensaje">Amor a primer mensaje</option>
            <option value="Cría Siniestra">Cría Siniestra</option>
            <option value="Último recurso">Último recurso</option>
            <option value="La Barbarie">La Barbarie</option>
            <option value="El triunfo">El triunfo</option>
            <option value="La sudestada">La sudestada</option>
            <option value="Guardianes de la Galaxia">Guardianes de la Galaxia</option>
            <option value="Misántropo">Misántropo</option>
            <option value="Vera">Vera</option>
            <option value="Rápidos y Furiosos X">Rápidos y Furiosos X</option>
            <option value="Sombras de un crimen">Sombras de un crimen</option>
            <option value="La extorsión">La extorsión</option>
            <option value="John Wick 4">John Wick 4</option>
            <option value="Super Mario Bros">Super Mario Bros</option>
        </select>
    <p></p>
    `;
    selectPelicula = document.getElementById('selectPelicula')
    selectPelicula.addEventListener("change", onChangePelicula)
    validarPelicula=false
    return false
    }
}

// limpiarEntrada()
validarUsr()
validarMovie()

//Si se seleccionó peli, la guarda en el localstorage y carga el select de Formato
function onChangePelicula() {
    const selectedOption = selectPelicula.options[selectPelicula.selectedIndex].value
    if (validarCine) {
        localStorage.setItem("pelicula", selectedOption)
    } else {
        localStorage.setItem("pelicula", selectedOption)
        formPelicula.classList.remove("disableElement")
        selectCine.classList.remove("disableElement")
        validarPelicula = true
    }
}

//Si se seleccionó cine, lo guarda en el localstorage y carga el select de Formato
function onChangeCine() {
    const selectedOption = selectCine.options[selectCine.selectedIndex].value
    // console.log(`opcion: ${selectedOption}`)
        if (validarCine) {
            localStorage.setItem("cineEntrada", selectedOption);
        } else {
            localStorage.setItem("cineEntrada", selectedOption);
            let htmlFormato = document.createElement('div')
            htmlFormato.innerHTML = `
                <select name="selectFormato" id="selectFormato">
                    <option selected value="0">Seleccione Formato...</option>
                    <option value="2D-Subtitulada">2D-Subtitulada</option>
                    <option value="2D-Doblada">2D-Doblada</option>
                    <option value="3D-Doblada">3D-Doblada</option>
                </select>
                <p></p>
            `
            formPelicula.appendChild(htmlFormato)
            validarCine = true
            selectFormato = document.getElementById('selectFormato')
            selectFormato.addEventListener("change", onChangeFormato)
        }
}

//Si se seleccionó formato, lo guarda en el localstorage y carga el select de día (una semana), hice la función
function onChangeFormato() {
    const selectedOption = selectFormato.options[selectFormato.selectedIndex].value
    // console.log(`opcion: ${selectedOption}`)
    if (validarFormato) {
            localStorage.setItem("formatoEntrada", selectedOption)
        } else {
            localStorage.setItem("formatoEntrada", selectedOption)
            let htmlDia = document.createElement('div')
            htmlDia.innerHTML = `
                <select name="selectDia" id="selectDia">              
                </select>
                <p></p>
            `
            formPelicula.appendChild(htmlDia)
            validarFormato = true
            selectDia = document.getElementById('selectDia')
            const diasAvanzados = 7;
            const opcionesSelect = cargarDias(diasAvanzados);
            selectDia.innerHTML = opcionesSelect.join('');
            selectDia.addEventListener("change", onChangeDia)
        }
}

//Días de le semana: desde el día actual + 7
function cargarDias(dias) {
    const fechaActual = new Date()
    const diasAvanzados = dias - fechaActual.getDay()
    if (diasAvanzados < 0) {
        diasAvanzados += 7
    }
    const fechaFinal = fechaActual.getDate() + diasAvanzados
    const opciones = []
    opciones.push(
        `<option selected value="0">Seleccione el Día...</option> `
    )
    for (let i = 0; i < 8; i++) {
        const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() + i)
        const dia = fecha.getDay()
        const nombreDia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        const nombreMes = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
        opciones.push(
            `<option value="${nombreDia[fecha.getDay()]}, ${fecha.getDate()} de ${nombreMes[fecha.getMonth()]} de ${fecha.getFullYear()}">${nombreDia[fecha.getDay()]}, ${fecha.getDate()} de ${nombreMes[fecha.getMonth()]} de ${fecha.getFullYear()}</option>`
        )
    }
    return opciones
}

//Si se seleccionó el día, lo guarda en el localstorage y carga el select de horas 
function onChangeDia() {
    const selectedOption = selectDia.options[selectDia.selectedIndex].value
    // console.log(`opcion: ${selectedOption}`)
    if (validarDia) {
        localStorage.setItem("diaEntrada", selectedOption)
        } else {
            localStorage.setItem("diaEntrada", selectedOption)
            let htmlHora = document.createElement('div')
            htmlHora.innerHTML = `
                <select name="selectHora" id="selectHora">
                    <option selected="selected" value="">Seleccione Hora...</option>
                    <option value="14:30">14:30</option>
                    <option value="16:50">16:50</option>
                    <option value="18:10">18:10</option>
                    <option value="22:20">22:20</option>
                </select>
                <p></p>
            `
            formPelicula.appendChild(htmlHora)
            validarDia = true
            selectHora = document.getElementById('selectHora')
            selectHora.addEventListener("change", onChangeHora)
        }
}

//Si se seleccionó cine, formato, día y hora , aparece el btn siguiente, guarda hora en el localstorage 
function onChangeHora() {
    const selectedOption = selectHora.options[selectHora.selectedIndex].value
    if (validarHora) {
        localStorage.setItem("horaEntrada", selectedOption);
        } else {
            localStorage.setItem("horaEntrada", selectedOption);
            let htmlSiguiente = document.createElement('div')
            htmlSiguiente.innerHTML = `
                <p>
                    <a class="btn btn-dark" id="siguienteCine">SIGUIENTE</a> <a class="btn btn-dark" href="../pages/entradas.html">CANCELAR COMPRA</a>
                </p>
            `
            formPelicula.appendChild(htmlSiguiente)
            validarHora = false
            siguienteCine = document.getElementById('siguienteCine')
            siguienteCine.addEventListener("click", sectionPrecio)
        }
}

//Muestra los datos seleccionados hasta el momento, oculta la seleccion anterior de opciones de película
//Crea dos select de propociones/precios y cantidad de entradas
function sectionPrecio() {
    sectionMovie.classList.add("disableElement")
    formPelicula.classList.add("disableElement")
    formPrecio.classList.remove("disableElement")
    let htmlPrecio = document.createElement('div')
    htmlPrecio.innerHTML = `
        <h4>Usted ha seleccionado la película: ${localStorage.getItem('pelicula')}. <br>Formato ${localStorage.getItem('formatoEntrada')}, 
        en el cine ${localStorage.getItem('cineEntrada')}. <br>Día: ${localStorage.getItem('diaEntrada')} 
        a las ${localStorage.getItem('horaEntrada')} hrs.</h4>
        <h3>Selección de la promoción</h3>
        <p>
        <select name="selectPrecio" id="selectPrecio">
            <option selected value="0">Seleccione la Promoción...</option>
            <option value="Adultos-$1500">Adultos-$1500</option>
            <option value="Menores hasta 12 años-$1100">Menores hasta 12 años-$1100</option>
            <option value="Matiné-$1100">Matiné-$1100</option>
            <option value="2x1-$1700">2x1-$1700 S/C</option>
        </select>
        <select name="selectCantidad" id="selectCantidad" class="disableElement">
            <option selected value="0">Cantidad de entradas...</option>
            <option value=1>1</option>
            <option value=2>2</option>
            <option value=3>3</option>
            <option value=4>4</option>
            <option value=5>5</option>
            <option value=6>6</option>
            <option value=7>7</option>
            <option value=8>8</option>
            <option value=9>9</option>
            <option value=10>10</option>
        </select>
        </p>
        <p>Máximo 10 entradas por transaccion.</p>
        <p>Para entradas con cargo se cobrarán $50 por cada una en concepto de costo por servicio.</p>
        <p>Promociones: Los beneficios 2x1 incluyen cada uno dos entradas, seleccione solo 1 para obtener 2 entradas.</p>
        `
    formPrecio.appendChild(htmlPrecio)

    selectPrecio = document.getElementById('selectPrecio')
    selectPrecio.addEventListener("change", onChangePrecio)
    
    selectCantidad = document.getElementById('selectCantidad')
    selectCantidad.addEventListener("change", onChangeCantidad)
}

//Si se seleccionó precio, aparece la opción de seleccion de cantidad de entradas, guarda precio en el localstorage 
function onChangePrecio() {
    const selectedOption = selectPrecio.options[selectPrecio.selectedIndex].value
    if (validarPrecio) {
        localStorage.setItem("precioEntrada", selectedOption)
    } else {
        localStorage.setItem("precioEntrada", selectedOption)
        selectCantidad.classList.remove('disableElement')
        validarPrecio = true
    }
}

//Si se seleccionó la cantidad, aparece el btn siguiente, calcula el monto total y guarda la cantidad en el localstorage 
function onChangeCantidad() {
    const selectedOption = selectCantidad.options[selectCantidad.selectedIndex].value
    if (validarCantidad) {
        localStorage.setItem("cantidadEntrada", selectedOption)
    } else {
        localStorage.setItem("cantidadEntrada", selectedOption)
        let htmlSiguiente = document.createElement('div')
        htmlSiguiente.innerHTML = `
        <p>
            <a class="btn btn-dark" id="siguientePrecio">SIGUIENTE</a> <a class="btn btn-dark" href="../pages/entradas.html">CANCELAR COMPRA</a>
        </p>
        `
        formPrecio.appendChild(htmlSiguiente)
        validarCantidad = true
        siguientePrecio = document.getElementById('siguientePrecio')
        siguientePrecio.addEventListener("click", sectionAsiento)
    }
}

function calcularTotalEntradas() {
    let promo = localStorage.getItem("precioEntrada")
    let cant = localStorage.getItem("cantidadEntrada")
    let precio = 0 
    let total = 0
    let cargo = cant*50
    switch (promo) {
        case "Adultos-$1500":
            precio = 1500
            total = (precio*cant)+cargo
            break
        case "Menores hasta 12 años-$1100":
            precio = 1100
            total = (precio*cant)+cargo
            break
        case "Matiné-$1100":
            precio = 1100
            total = (precio*cant)+cargo
            break;
        case "2x1-$1700":
            precio = 1700
            total = (precio*cant)
            break;
        default:
            alert("No existe la promo, error");
            break;
    }
    localStorage.setItem("totalEntrada", total)
}

function sectionAsiento() {
    //Calculo el monto de la compra
    calcularTotalEntradas()

    //Deshabilito secciones anteriores, cargo select de asientos (ver para mas de una entrada)
    formPrecio.classList.add("disableElement")
    formAsiento.classList.remove("disableElement")
    
    let htmlAsiento = document.createElement('div')
    htmlAsiento.innerHTML = `
        <h4>Usted ha seleccionado la película: ${localStorage.getItem('pelicula')}. <br>Formato ${localStorage.getItem('formatoEntrada')}, 
        en el cine ${localStorage.getItem('cineEntrada')}. <br>Día: ${localStorage.getItem('diaEntrada')} 
        a las ${localStorage.getItem('horaEntrada')} hrs.</h4>
        <br>
        <h4>Promoción: ${localStorage.getItem('precioEntrada')}. Cantidad de entradas: ${localStorage.getItem('cantidadEntrada')}</h4>
        <br>
        <h4><b>A pagar: $${localStorage.getItem('totalEntrada')}</b></h4>
        <h3>Selección de asiento</h3>
        <p>
            <select name="selectAsiento" id="selectAsiento">
                <option selected vaLue="">Seleccione asiento...</option>
                <option value="F1-A1">F1-A1</option>
                <option value="F1-A2">F1-A2</option>
                <option value="F2-A6">F2-A6</option>
                <option value="F7-A1">F7-A1</option>
                <option value="F7-A1">F7-A2</option>
                <option value="F7-A1">F7-A3</option>
            </select>
        </p>
        `
    formAsiento.appendChild(htmlAsiento)
    selectAsiento = document.getElementById('selectAsiento')
    selectAsiento.addEventListener("change", onChangeAsiento)
}

function onChangeAsiento() {
    const selectedOption = selectAsiento.options[selectAsiento.selectedIndex].value
    if (validarAsiento) {
        localStorage.setItem("asientoEntrada", selectedOption)
    } else {
        localStorage.setItem("asientoEntrada", selectedOption)
        let htmlSiguiente = document.createElement('div')
        htmlSiguiente.innerHTML = `
            <p>    
                <a class="btn btn-dark" id="siguienteAsiento">SIGUIENTE</a> <a class="btn btn-dark" href="../pages/entradas.html">CANCELAR COMPRA</a>
            </p>
        `
        formAsiento.appendChild(htmlSiguiente)
        validarAsiento = true
        siguienteAsiento = document.getElementById('siguienteAsiento')
        siguienteAsiento.addEventListener("click", sectionResumen)
    }
}

function sectionResumen() {
    formAsiento.classList.add("disableElement")
    formResumen.classList.remove("disableElement");
    let htmlResumen = document.createElement('div')
    htmlResumen.innerHTML = `
        <h3>Resumen de transacción</h3>
        <h4>Usted ha seleccionado la película: ${localStorage.getItem('pelicula')}. <br>Formato ${localStorage.getItem('formatoEntrada')}, 
        en el cine ${localStorage.getItem('cineEntrada')}. <br>Día: ${localStorage.getItem('diaEntrada')} 
        a las ${localStorage.getItem('horaEntrada')} hrs. Asientos: ${localStorage.getItem('asientoEntrada')}</h4>
        <br>
        <h4>Promoción: ${localStorage.getItem('precioEntrada')}. Cantidad de entradas: ${localStorage.getItem('cantidadEntrada')}</h4>
        <br>
        <h4>Total a pagar: $${localStorage.getItem('totalEntrada')}.</h4>
        <br> 
        <h3>Forma de pago online</h3>   
        <p>
        <select name="selectTarjeta" id="selectTarjeta">
            <option selected="selected" value="">Seleccione la Tarjeta...</option>
            <option value="VISA DEBITO">VISA DEBITO</option>
            <option value="VISA CREDITO">VISA CREDITO</option>
            <option value="MASTERCARD">MASTERCARD</option>
        </select>
        </p>
        `
    formResumen.appendChild(htmlResumen)
    selectTarjeta = document.getElementById('selectTarjeta')
    selectTarjeta.addEventListener("change", onChangeTarjeta)
}

function onChangeTarjeta() {
    const selectedOption = selectTarjeta.options[selectTarjeta.selectedIndex].value
    if (validarTarjeta) {
        localStorage.setItem("tarjetaEntrada", selectedOption)
    } else {
        localStorage.setItem("tarjetaEntrada", selectedOption)
        let htmlSiguiente = document.createElement('div')
        htmlSiguiente.innerHTML = `
            <p>
                <a class="btn btn-dark" id="siguienteResumen">SIGUIENTE</a> <a class="btn btn-dark" href="../pages/entradas.html">CANCELAR COMPRA</a>
            </p>
        `
        formResumen.appendChild(htmlSiguiente)
        validarTarjeta = true
        siguienteResumen = document.getElementById('siguienteResumen')
        siguienteResumen.addEventListener("click", pagarEntrada)
    }
}

function pagarEntrada() {
    formResumen.classList.add("disableElement")
    formEntradas.classList.add("disableElement")
    formPagar.classList.remove("disableElement")
    let htmlPagar = document.createElement('div')
    htmlPagar.innerHTML = `
        <h2>RESUMEN DE LA COMPRA</H2>
        <h3>Usted ha seleccionado la película: ${localStorage.getItem('pelicula')}</h3> 
        <h4>Formato ${localStorage.getItem('formatoEntrada')}, en el cine ${localStorage.getItem('cineEntrada')}.<br> 
        Día: ${localStorage.getItem('diaEntrada')} a las ${localStorage.getItem('horaEntrada')} hrs. Asiento: ${localStorage.getItem('asientoEntrada')}</h4>
        <h4>Promoción: ${localStorage.getItem('precioEntrada')}. Cantidad de entradas: ${localStorage.getItem('cantidadEntrada')}</h4>
        <br>
        <h3>Total a pagar: $${localStorage.getItem('totalEntrada')}, para pagar con la tarjeta ${localStorage.getItem('tarjetaEntrada')}.</h3>
        <p><a class="btn btn-dark" id="pagar">PAGAR</a> <a class="btn btn-dark" href="../pages/entradas.html">CANCELAR COMPRA</a></p>
    `
    formPagar.appendChild(htmlPagar)
    validar=true
    pagar = document.getElementById('pagar')
    pagar.addEventListener("click", confirmarPago)
}

function limpiarEntrada() {
    if (validar) {
        localStorage.removeItem('pelicula')
    }
    localStorage.removeItem('cineEntrada')
    localStorage.removeItem('formatoEntrada')
    localStorage.removeItem('diaEntrada')
    localStorage.removeItem('horaEntrada')
    localStorage.removeItem('asientoEntrada')
    localStorage.removeItem('cantidadEntrada')
    localStorage.removeItem('precioEntrada')
    localStorage.removeItem('tarjetaEntrada')
    validar = false
    validarPelicula = false
    validarCine = false
    validarFormato = false
    validarDia = false
    validarHora = false
    validarPrecio = false
    validarCantidad = false
    validarAsiento = false
    validarTarjeta = false
    validarResumen = false
    formPelicula.classList.add("disableElement");
    formPrecio.classList.add("disableElement");
    formAsiento.classList.add("disableElement");
    formResumen.classList.add("disableElement");
    formPagar.classList.add("disableElement");
}

function confirmarPago() {
    Swal.fire({
        title: '¿Está seguro de confirmar la compra?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Si',
        confirmButtonColor: '#044D8C',
        denyButtonText: 'No',
        denyButtonColor: '#7E8ECB'
    }).then((result) => {
        if (result.isConfirmed) {
            envioFormulario()
            limpiarEntrada()
            Swal.fire('¡Compra realizada con éxito!', '', 'success')
            setTimeout(function() {
                window.location.href = "../index.html";
            }, 4000);
        } else if (result.isDenied) {
            Swal.fire('La compra fue cancelada', '', 'info')
        }
    })
}

function envioFormulario() {
    const id =  Math. random();
    const nombre = localStorage.getItem("nombre") + " " + localStorage.getItem("apellido");
    const usuario = localStorage.getItem("email");
    const pelicula = localStorage.getItem("pelicula");
    const cine = localStorage.getItem("cineEntrada");
    const formato = localStorage.getItem("formatoEntrada");
    const fecha = localStorage.getItem("diaEntrada");
    const hora = localStorage.getItem("horaEntrada");
    const asiento = localStorage.getItem("asientoEntrada");
    const precio = localStorage.getItem("precioEntrada");
    const cantidad = localStorage.getItem("cantidadEntrada");
    const tarjeta = localStorage.getItem("tarjetaEntrada");
    const total = localStorage.getItem("totalEntrada");


    const ventaEntrada = { id, nombre, usuario, pelicula, cine, formato, fecha, hora, asiento, precio, cantidad, tarjeta, total}
    
    //Json
    let jsonVenta = JSON.stringify(ventaEntrada);
    //Guardar en storage
    let venta = "venta" + id
    localStorage.setItem(venta, jsonVenta)
    // alert("Se guardó: " + jsonVenta)
}

