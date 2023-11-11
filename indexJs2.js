window.onload = (enviarPeticionAsincrona);
//FUNCIONES
const URL_DESTINO = "http://localhost:5500/"
const RECURSO = "pizzas.json"

let botonRef = document.getElementById("refrescar")

botonRef.addEventListener("click", enviarPeticionAsincrona)

//Obtenemos los datos del JSON Y de paso limpiamos los tamaños y los ingredientes para evitar que se dupliquen
    function enviarPeticionAsincrona() {
        var tamano = document.getElementById("size")
        var ing = document.getElementById("liao")
        while(tamano.firstChild){
            tamano.removeChild(tamano.firstChild)
        }
        while(ing.firstChild){
            ing.removeChild(ing.firstChild)
        }

        let xmlHttp = new XMLHttpRequest()

        xmlHttp.onreadystatechange = function () {
            if (this.readyState == 4){
                if (this.status == 200) {
                    procesarRespuesta(this.responseText)
                } else {
                    alert("Error!")
                }
            }
        }

        xmlHttp.open('GET', URL_DESTINO + RECURSO, true)
        xmlHttp.send(null)
    }
   
    function procesarRespuesta(jsonDoc) {
        
        var tas = document.getElementById("size")
        var liao = document.getElementById("liao")
        while(tas.firstChild){
            tas.removeChild(tas.firstChild)
        }
        while(liao.firstChild){
            liao.removeChild(liao.firstChild)
        }
        

        var objetoJson = JSON.parse(jsonDoc)
        var sizes = objetoJson.Pizzas.tamaño
        var ingredientes = objetoJson.Pizzas.ingredientes
       
        console.log(sizes)
        console.log(ingredientes)
        for(tama of sizes){
            
            var lab = document.createElement("label")
            lab.for = tama.for
            let textolab =  document.createTextNode(tama.text)
            lab.appendChild(textolab)//Añadimos texto al label
            tas.appendChild(lab)//Añadimos el lab al div
            
            let inp = document.createElement("input")
            
            inp.value = tama.precio
            inp.type = tama.type
            inp.name = tama.nombre
            inp.id = tama.id

            tas.appendChild(inp)    
        }

        
        for(ing of ingredientes){
            console.log("Estoy en ingredientes")
            let lab2 = document.createElement('label')
            lab2.for = ing.for
            let textoLab2 = document.createTextNode(ing.for)
            lab2.appendChild(textoLab2)
            liao.appendChild(lab2)

            let inp2 = document.createElement('input')
            inp2.id = ing.id
            inp2.value = ing.precio
            inp2.type = ing.type
            inp2.name = ing.nam
            liao.appendChild(inp2)
           
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
    let tamaMarcado = document.getElementsByName("tamaño")
    if (pizzaChecked()) {
        for(tamanio of tamaMarcado){
            if (tamanio.checked == true){
                intPrecio = parseInt(tamanio.value)
                precioPizza = intPrecio
            }
        }
       
        return precioPizza;
    }
}


//funcion calcular precio ingredientes
function calcPrecioIngrediente() {
    let contador = 0
    let ingres = document.getElementsByName("ingrediente")
    if(ingreChecked()){
        for(ing of ingres){
            if(ing.checked){
                let intIng = parseInt(ing.value)
                contador+=intIng
            }
        }
    }
    return contador
    
}

/* funcion comprobar que los campos nombre, direccion, telefono y email esten rellenos
   y si no, mostrar una alerta dependiendo del campo que no lo esté */
function comprobarDatos(){
    console.log("entro")
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
    let precioIngre = 0
    precioIngre = calcPrecioIngrediente();
    

    if (comprobarDatos() == true){
    precio.parentNode.removeChild(precio)
    let precioTotal = document.createTextNode("Precio total: " + (precioTamPizza+precioIngre) + " €")
    let nuevoPrecio = document.createElement("p")
    nuevoPrecio.appendChild(precioTotal)
    nuevoPrecio.id = "precio"
    formulario.appendChild(nuevoPrecio)
    precio.style.display = "block"
    }
    else{
    precio.style.display = "none"
    
    }

    
    
}
