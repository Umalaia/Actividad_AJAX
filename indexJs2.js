window.onload = (enviarPeticionAsincrona);

const URL_DESTINO = "http://localhost:4500/";
const RECURSO = "pizzeria.json";
var div = document.createElement("div");
div.id = "div";
formulario.appendChild(div);


function enviarPeticionAsincrona(){
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    };
    
    let xmlHttp = new XMLHttpRequest();

    xmlHttp.onreadystatechange = function () {
    if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)
            } else {
                alert("Fallo de conexión, revisa URL_DESTINO")
            }
         }
    }

    xmlHttp.open('GET', URL_DESTINO + RECURSO, true);
    xmlHttp.send(null);
}

function procesarRespuesta(jsonDoc){
    let objetoJson = JSON.parse(jsonDoc);
    let arrayPizzas = objetoJson.Pizzeria.Pizzas;
    let arrayIngredientes = objetoJson.Pizzeria.Ingredientes;
    console.log(arrayPizzas);
    console.log(arrayIngredientes);

    let p1 = document.createElement("p");
    p1.id = "p1";
    let contP1 = document.createTextNode("Elige el tamaño de tu pizza:");
    p1.appendChild(contP1);
    div.appendChild(p1);


    for (let pizza of arrayPizzas){
        let input = document.createElement("input")
        input.type = "radio";
        input.id = pizza.Tamaño;
        input.name = "size";
        input.value = pizza.Precio;
        div.appendChild(input)

        let label = document.createElement("label")
        label.for = pizza.labelFor;
        let contLabel = document.createTextNode(pizza.Tamaño + "  " + pizza.Precio + " €");
        label.appendChild(contLabel)
        div.appendChild(label)
    }

    let p2 = document.createElement("p");
    p2.id = "p2";
    let contP2 = document.createTextNode("Elige tus ingredientes:");
    p2.appendChild(contP2);
    div.appendChild(p2);

    for (let ing of arrayIngredientes){
        let ingr = document.createElement("input");
        ingr.type = "checkbox";
        ingr.id = ing.Nombre;
        ingr.value = ing.Precio;
        ingr.name = "ingrediente";
        div.appendChild(ingr);

        let label = document.createElement("label")
        label.for = ing.labelFor;
        let contLabel = document.createTextNode(ing.Nombre + "  +" + ing.Precio + "€");
        label.appendChild(contLabel);
        div.appendChild(label);

    }


    let br = document.createElement("br");
    div.appendChild(br)
    let br1 = document.createElement("br");
    div.appendChild(br1)
    let buttonRefrescar = document.createElement("button");
    buttonRefrescar.type = "button";
    let contButtonRefrescar = document.createTextNode("Refrescar");
    buttonRefrescar.appendChild(contButtonRefrescar);
    div.appendChild(buttonRefrescar);
    buttonRefrescar.addEventListener("click", enviarPeticionAsincrona);

    let buttonProcesar = document.createElement("button");
    buttonProcesar.type = "button";
    let contButtonProcesar = document.createTextNode("Procesar pedido");
    buttonProcesar.appendChild(contButtonProcesar);
    div.appendChild(buttonProcesar);
    buttonProcesar.addEventListener("click", calcularPrecio);

    let p3 = document.createElement("p");
    p3.id = "precio";
    let contP3 = document.createTextNode("Precio total:");
    p3.appendChild(contP3);
    div.appendChild(p3);
}

function comprobarSize(){
    let precioSize = 0;
    if(document.getElementById("Pequeña").checked){
        precioSize = 5}
    else if(document.getElementById("Mediana").checked){
        precioSize = 10}
    else if(document.getElementById("Grande").checked){
        precioSize = 15
}

    return precioSize
}

function comprobarIngredientes(){
    let precioIng = 0;
    let ingrePizza = document.getElementsByName("ingrediente");
    for (var i = 0; i < ingrePizza.length; i++) {
        if (ingrePizza[i].checked) {
            precioIng += parseInt(ingrePizza[i].value)
        }
    }
    return precioIng
}

function calcularPrecio(){

    precio.parentNode.removeChild(precio);

    let size = 0
    size = parseInt(comprobarSize())
    
    let ing = 0
    ing = parseInt(comprobarIngredientes())
    
    let precioTotal = 0;
    precioTotal = size + ing;
    console.log(precioTotal)

    
    let nuevoPrecio = document.createTextNode("Precio total: " + precioTotal + "€")
    let nuevoP = document.createElement("p")
    nuevoP.appendChild(nuevoPrecio)
    nuevoP.id = "precio"
    div.appendChild(nuevoP)
}