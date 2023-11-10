window.onload = (enviarPeticionAsincrona);


//Función de petición asincrona
const URL_DESTINO = "http://localhost:5500/";
const RECURSO = "pizza.json";



function enviarPeticionAsincrona() {
    let xmlHttp = new XMLHttpRequest()
    xmlHttp.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200) {
                procesarRespuesta(this.responseText)
            } else {
                alert("ZASCA!")
            }
        }
    }

    xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)
}

// Convertir texto a Json

function procesarRespuesta(jsonDoc){
    let objetoJson = JSON.parse(jsonDoc)
    let arrayTamaños = objetoJson.pizzeria.tamaños;
    let arrayIngredientes = objetoJson.pizzeria.ingredientes
    console.log(objetoJson)

//Insertar datos modificando el DOM
        let p1 = document.createElement("p");
        p1.id = "medida";
        let p1Cont = document.createTextNode("Elige tu tamaño :");
        p1.appendChild(p1Cont)
        div.appendChild(p1)
    
        for (let tamaño of arrayTamaños) {
            let labelMed = document.createElement("label")
            labelMed.id = "medida"
            let labelContMed = document.createTextNode(tamaño.Medida)
            labelMed.appendChild(labelContMed)

            let inputMed = document.createElement("input")
            inputMed.type = "radio"
            inputMed.name = "tamaño"
            inputMed.id = tamaño.Medida
            inputMed.value = tamaño.Precio
            div.appendChild(labelMed)
            div.appendChild(inputMed)
        }

        let p2 = document.createElement("p");
        p2.id = "ingredientes";
        let p2Cont = document.createTextNode("Elige tus ingredientes");
        p2.appendChild(p2Cont);
        div.appendChild(p2);

        for ( let ingrediente of arrayIngredientes){
            let labelIng = document.createElement("label");
            labelIng.id = "ingredientes";//
            let labelContIng = document.createTextNode(ingrediente.Nombre);
            labelIng.appendChild(labelContIng);

            let inputIng = document.createElement("input");
            inputIng.type = "checkbox";
            inputIng.name = "ingredientes"; //
            inputIng.id = ingrediente.Nombre;
            inputIng.value = ingrediente.Precio;//

            div.appendChild(labelIng);
            div.appendChild(inputIng);

        }
}

 // funcion seleccion tamaño: Chequea que tamaño esta marcado,
    function pizzaChecked() {
        return document.querySelector('input[name="tamaño"]:checked') !== null;
    }

// funcion seleccion ingrediente: Chequea que ingrediente esta marcado

    function ingreChecked() {
        return document.querySelector('input[name="ingredientes"]:checked') !== null;
    }


/*
funcion calcular-precio: Comprueba que pizza esta seleccionada y 
le agrega el precio asignado a cada pizza
*/ 

function calcPrecioTam() {
    let precioTam = 0;
    if (document.getElementById("Pequeña").checked) {
        precioTam = 5;
    } else if (document.getElementById("Mediana").checked) {
        precioTam = 10;
    } else if (document.getElementById("Grande").checked) {
        precioTam = 15;
    }
    return precioTam;
}


/* 
 funcion calcular-precio-ingrediente:
 Revisa que ingredientes estan seleccionados, los añade a un contador y los transforma
a entero al venir como String
*/ 

    function calcPrecioIngrediente() {
        let contadorI = 0;
        let ingredientes = document.getElementsByName("ingredientes");
        ingredientes.forEach(ingrediente => {
            if (ingrediente.checked) {
                contadorI += parseInt(ingrediente.value);
            }
        });
        
        return contadorI;
    }

/*
    funcion validar datos: Comprueba cada campo este escrito, sino devuelve una alerta
    indicando el campo no rellenado
*/ 

function comprobarDatos() {
    const inputs = [
        {name: "nombre", message: "Inserta el nombre"},
        {name: "direccion", message: "Inserta la direccion"},
        {name: "telefono", message: "Inserta el telefono"},
        {name: "email", message: "Inserta el email"}
    ];
    let valid = true;
    inputs.forEach(input => {
        if (document.getElementsByName(input.name)[0].value === "") {
            alert(input.message);
            valid = false;
        }
    });
    return valid;
}

/*
funcion procesar pedido: Comprueba las funciones calcPrecioTam y calPrecioIngrediente y de lo que
recibe calcula el precioTotal del pedido.
*/ 
function procesarPedido() {

     let precioTamPizza = calcPrecioTam();
    console.log(precioTamPizza);
    let precioIngre = calcPrecioIngrediente();
    console.log(precioIngre);
    let precioTotal = (precioTamPizza + precioIngre);
    if (comprobarDatos()) {
        precio.remove();
        let precioPedido = document.createElement("p");
        precioPedido.textContent = "Precio total : " + precioTotal +  "€";
        precioPedido.id = "precio";
        formulario.appendChild(precioPedido);
    } else {
        precio.style.display = "none";
    }
    console.log(precioTotal);
}


//funcion refrescar , para borrar y repetir el pedido
function refresca(){
    localStorage.clear()
    location.reload()
    window.onload = (enviarPeticionAsincrona)
}

