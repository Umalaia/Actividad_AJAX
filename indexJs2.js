window.onload = (enviarPeticionAsincrona);

const URL_DESTINO = "http://localhost:4501/Actividad_AJAX/";
const RECURSO = "pizzeria.json";

function enviarPeticionAsincrona(){
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

    document.createElement("label")
}