//FUNCIONES

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
    }
    else{
    precio.style.display = "none"
    
    }
    
}
