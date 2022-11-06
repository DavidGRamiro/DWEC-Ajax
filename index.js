console.log("====================================")

const URL_DESTINO = "http://127.0.0.1:5500/"
const RECURSO = "productos.json"

function enviarDatos(){

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4){
            console.log("Estado listo = "+this.readyState)
            if (this.status == 200){
                console.log("LISTO !! : " +this.status)
                procesarRespuesta(this.responseText)
            
            }else{
                alert("ERRORRRRRR")
            }
        }
    }
    xmlHttp.open('GET',URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)
}

function procesarRespuesta(jsonDoc){

    let objetoJson = JSON.parse(jsonDoc)
    let tab = document.getElementById("resultado")

    let ArrayPizza = objetoJson.PRODUCTOS.PIZZA;

    //Creación de la tabla a la que metemos los datos
    let tabla = "<tr><th>NOMBRE</th><th>PRECIO</th></tr>"

    for (let pizza of ArrayPizza){
        tabla += "<tr><td>" + pizza.NOMBRE + "</td>" + 
        "<td>" + pizza.PRECIO + "</td></tr>"
    }

    tab.innerHTML = tabla

}