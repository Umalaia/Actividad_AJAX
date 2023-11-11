window.onload = (enviarPeticionAsincrona);
//FUNCIONES

//Función de petición asincrona
const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "index.json"

function enviarPeticionAsincrona() {
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)
            } else {
                alert("Error")
            }
        }
    }
    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)
}

//Convertir texto a JSON

function procesarRespuesta(jsonDoc) {
    var objetoJson = JSON.parse(jsonDoc)
    var tamaños = objetoJson.pizzeria.tamaños;
    var ingredientes = objetoJson.pizzeria.ingredientes;
    console.log(objetoJson)


    //Insertar datos modificando el DOM
    let pElige = document.createElement("p")
    pElige.for = "tam"
    let pEligeCont = document.createTextNode("Elige tu tamaño :")
    pElige.appendChild(pEligeCont)
    div.appendChild(pElige)

    for (let tamaño of tamaños) {
        let labelTam = document.createElement("label")
        labelTam.id = "tam"
        let labelContTam = document.createTextNode(tamaño.nombre)
        labelTam.appendChild(labelContTam)
        let inputTam = document.createElement("input")
        inputTam.type="radio"
        inputTam.name = "tamaño"
        inputTam.id = tamaño.tam
        inputTam.value = tamaño.value
        div.appendChild(labelTam)
        div.appendChild(inputTam)
    }

    let pElige2 = document.createElement("p")
    pElige2.for = "ingre"
    let pElige2Cont = document.createTextNode("Elige tus ingredientes :")
    pElige2.appendChild(pElige2Cont)
    div.appendChild(pElige2)
   
    for (let ingrediente of ingredientes){
        let labelIngre = document.createElement("label")
        labelIngre.for = "pizzas"
        let labelContIngre = document.createTextNode(ingrediente.nombre)
        labelIngre.appendChild(labelContIngre)
        let inputIngre = document.createElement("input")
        inputIngre.name = "ingrediente"
        inputIngre.type = "checkbox"
        inputIngre.id = ingrediente.id
        inputIngre.value = ingrediente.value
        inputIngre.style.marginRight = "28px";
        div.appendChild(labelIngre)
        div.appendChild(inputIngre)
    }
}



//funcion validar si tamaño esta checked
function pizzaChecked() {
    tamañoPizza = document.getElementsByName("tamaño");
    var seleccionado = false;
    for (var i = 0; i < tamañoPizza.length; i++) {
        if (tamañoPizza[i].checked) {
            seleccionado = true;
            break;
        }
    }
    if (!seleccionado) {
        alert('Debe seleccionar un tamaño');
        return false;
    }
    return true;
}


//funcion validar si ingrediente esta checked
function ingreChecked() {
    ingrePizza = document.getElementsByName("ingrediente");
    var seleccionada = false;
    for (var i = 0; i < ingrePizza.length; i++) {
        if (ingrePizza[i].checked) {
            seleccionada = true;
            break;
        }
    }
    if (!seleccionada) {
        alert('Selecciona al menos un ingrediente');
        return false;
    }
    return true;
}


//funcion calcular precio tamaño
function calcPrecioTam() {
    let precioPizza = 0;
    if (pizzaChecked()) {
        if (pequeña.checked) {
            precioPizza = 5
        } else if (mediana.checked) {
            precioPizza = 10
        } else if (grande.checked) {
            precioPizza = 15
        }
        return precioPizza;
    }
}


//funcion calcular precio ingrediente
/*function calcPrecioIngrediente() {
    let contador = 0
    
    if(ingreChecked()){
        if (bacon.checked){
            contador += parseInt(bacon.value)
            
        }
        if (quesos.checked){
            contador += parseInt(quesos.value)
 
        }
        if (champi.checked){
            contador += parseInt(champi.value)
        }
        if (cebolla.checked){
            contador += parseInt(cebolla.value)
        }
        if (pollo.checked){
            contador += parseInt(pollo.value)
        }
        if (carne.checked){
            contador += parseInt(carne.value)
        }
       
        let precioIngredientes = contador
        return precioIngredientes;
    }
}
*/
function calcPrecioIngrediente() {
    let precioIngredientes = 0
    let ingredientes = document.getElementsByName("ingrediente")
    for (ingre of ingredientes) {
        if (ingreChecked()) {
            if (ingre.checked) {
                precioIngredientes += parseInt(ingre.value)
            }
        }
    }
}


/* funcion comprobar que los campos nombre, direccion, telefono y email esten rellenos
   y si no, mostrar una alerta dependiendo del campo que no lo esté */
function comprobarDatos(){
     n = (nombre.value == "")
     d = (direccion.value == "")
     t = (telefono.value == "")
     e = (email.value == "")
    if (n){
        alert("Inserta el nombre")
    }
    if (d){
        alert("Inserta la direccion")
    }
    if (t){
        alert("Inserta el telefono")
    }
    if (e){
        alert("Inserta el email")
    }
    if(n == true || d == true || t == true || e == true){
        return false
    }
    else
        return true
}


//funcion procesar el pedido
function procesarPedido() {


    let precioTamPizza = 0
    precioTamPizza = calcPrecioTam();
    console.log(precioTamPizza)
    let precioIngre = 0
    precioIngre = calcPrecioIngrediente();
    console.log(precioIngre)


    if (comprobarDatos() == true) {
        precio.parentNode.removeChild(precio)
        let precioTotal = document.createTextNode("Precio total: " + (precioTamPizza + precioIngre) + " €")
        let nuevoPrecio = document.createElement("p")
        nuevoPrecio.appendChild(precioTotal)
        nuevoPrecio.id = "precio"
        formulario.appendChild(nuevoPrecio)
    } else {
        precio.style.display = "none"

    }

}

//funcion refrescar la página limpiando los datos y haceindo de nuevo la llamada al servidor
function refresca(){
    localStorage.clear()
    location.reload()
    window.onload = (enviarPeticionAsincrona)
}

