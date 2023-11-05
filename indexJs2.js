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
    console.log(objetoJson)
}


//Insertar datos modificando el DOM
var div = document.createElement("div");
div.id = "div"
formulario.appendChild(div)


let label = document.createElement("label")
    label.for = "tamaño"
    label.id = "tamaño"
let labelCont = document.createTextNode("Elige tu tamaño :")    
    label.appendChild(labelCont)

for (let tamaño of tamaños){
    let labelTam = document.createElement("label")
    let labelContTam = docuemnt.createTextNode(tam.value)
    labelTam.appendChild(labelContTam)
    label.appendChild(labelCont)
    let inputTam = document.createElement("input")
    inputTam.name = "tamaño"
    inputTam.id = tam.value
    inputTam.type = "radio"
}

div.appendChild(label)
div.appendChild(labelTam)






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

//funcion calcular precio ingredientes
function calcPrecioIngrediente() {
    let contador = 0
    
    if(ingreChecked()){
        if (bacon.checked){
            contador++
        }
        if (carne.checked){
            contador++
        }
        if (pollo.checked){
            contador++
        }
        if (peperoni.checked){
            contador++
        }
        let precioIngredientes = contador++
        return precioIngredientes;
    }
}



//funcion procesar el pedido
function procesarPedido() {
    

    let precioTamPizza = 0
    precioTamPizza = calcPrecioTam();
    let precioIngre = 0
    precioIngre = calcPrecioIngrediente();
    

    if (comprobarDatos() == true){
    precio.parentNode.removeChild(precio)
    let precioTotal = document.createTextNode("Precio total: " + (precioTamPizza+precioIngre) + " €")
    let nuevoPrecio = document.createElement("p")
    nuevoPrecio.appendChild(precioTotal)
    nuevoPrecio.id = "precio"
    formulario.appendChild(nuevoPrecio)
    }
    else{
    precio.style.display = "none"
    
    }
    
}
