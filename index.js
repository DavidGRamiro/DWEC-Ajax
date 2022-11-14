console.log("==============VALIDACION DE DATOS DEL FORMULARIO=================")

function validacion(){

    /*Comprueba si los campos de texto, según sus id´s estan vacios
    * En caso de que esten vacios, retorna false y no podemos continuar.
    */
    if(nombre.value.trim() == ""){
        alert("Escribe tu nombre")
        return false;
    }
    if(apellido.value.trim() == ""){
        alert("Escribe tu apellido")
        return false;
    }
    if(direccion.value.trim() == ""){
        alert ("Escribe la dirección de entrega");
        return false;
    }
    /**
     * Recuperamos los elementos de tipo radio en un Array. Accedemos a el a traves del nombre.
     * La variable "seleccionado" por defecto es false.
     * Recorremos el Array, y en el caso de que esté seleccionado retornara true.
     * Una vez que detecta que uno de los elementos ha sido seleccionado, sale del bucle.
     */
    let radio = document.getElementsByName("tamaño");
    let seleccionado = false;
    
    for (let a = 0; a<radio.length;a++){
        if(radio[a].checked){
            seleccionado = true;
            console.log(radio[a].value)
            break;
        }
        
    }
    /*En el caso de que no este seleccionado nos informa mediante un alert por pantalla*/
    if (!seleccionado){
        alert("Debe escoger algun tamaño")
        return false;
    }

    /**
     * Recuperamos los elementos del checkbox en un Array. Accedemos a el a través de la etiqueta nombre.
     * La variable por defecto es false.
     * Recorremos el Array. En el momento en el que encuentra uno marcado, sale del bucle.
     */
    let checkbox = document.getElementsByName("ingredientes")
    let marcado = false;
    for (let b = 0; b<checkbox.length;b++){
        if (checkbox[b].checked){
        marcado = true;
        console.log(checkbox[b].value)
        break;
        }
    
    }
    /**
     * Si detecta que uno de los checkbox no ha sido marcado, nos informará
     * mediante una alerta que debemos de marcar como mínimo un ingrediente.
     */
    if (!marcado){
        alert("Minimo tiene que elegir un ingrediente")
        return false;
    }
    /**
     * En el caso de que los campos de texto NO estén vacíos, y a su vez,
     * un campo radio seleccionado, y al menos un campo checkbox seleccionado,
     * llamaremos a la funciñon precioTotal() que nos dará el precio de nuestra pizza
     */
    if (seleccionado && marcado)
        return calcularTotal()
}   

console.log("==============PETICIONES =================")

let isIngredientesLoaded = false
let isFamosasLoaded = false
let isDatosLoaded = false

/**** CARGAR INFO TAMAÑOS ****/
function enviarDatosTamaños(){

    const URL_DESTINO = "http://127.0.0.1:5500/"
    const RECURSO = "productos.json"

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

/**
 * Procesa los datos recuperados de productos.json
 * @param {*} jsonDoc 
 */
function procesarRespuesta(jsonDoc){

    if(isDatosLoaded){
        datosTamaños.innerHTML = ''
    }

    let objetoJson = JSON.parse(jsonDoc)
    let ArrayPizzaTamaños = objetoJson.PRODUCTOS.PERSONALIZA; 
    
    let th = document.createElement("p")

    datosTamaños.appendChild(th)
    
    ArrayPizzaTamaños.forEach((element) => {
        //Creamos el input
        var tamañosSelector = document.createElement("input");
        tamañosSelector.setAttribute("type", "radio");

        tamañosSelector.setAttribute("name", "tamaño");
        tamañosSelector.setAttribute("id", element.TAMAÑO);
        tamañosSelector.setAttribute("value", element.PRECIO);

        datosTamaños.appendChild(tamañosSelector);

        //Creamos el label
        var labelTamaños = document.createElement("label");
        labelTamaños.setAttribute("for", element.TAMAÑO)
        labelTamaños.textContent = element.TAMAÑO;

        datosTamaños.appendChild(labelTamaños);
    })

    isDatosLoaded = true

}



function enviarDatosFamosas(){

    const URL_DESTINO = "http://127.0.0.1:5500/"
    const RECURSO = "productos.json"

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4){
            console.log("Estado listo = "+this.readyState)
            if (this.status == 200){
                console.log("LISTO !! : " +this.status)
                procesarRespuestaFamosas(this.responseText)
            
            }else{
                alert("ERRORRRRRR")
            }
        }
    }
    xmlHttp.open('GET',URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)
}

function procesarRespuestaFamosas(jsonDoc){

    if (isFamosasLoaded){
        datosFamosas.innerHTML = ""
    }

    //Creamos la linea de los radio button
    let th = document.createElement("p")
    datosFamosas.appendChild(th)
    
    let objetoJson = JSON.parse(jsonDoc)
    let ArrayPizzasFamosas = objetoJson.PRODUCTOS.GOURMET

    ArrayPizzasFamosas.forEach((famosa) =>{
        
        //Accedemos al atributo NOMBRE
        var nombre = famosa.NOMBRE 
        //Creamoos el input
        var famosasSelector = document.createElement("input")
        famosasSelector.setAttribute("type", "radio")
        famosasSelector.setAttribute("name", "populares")
        famosasSelector.setAttribute("value", nombre)

        datosFamosas.appendChild(famosasSelector)

        //Creamos el label
        var labelFamosas = document.createElement("label")
        labelFamosas.setAttribute("for", nombre)
        labelFamosas.textContent = nombre

        datosFamosas.appendChild(labelFamosas)
    })
        isFamosasLoaded = true

    } 


function enviarDatosIngredientes(){

    const URL_DESTINO = "http://127.0.0.1:5500/"
    const RECURSO = "productos.json"

    let xmlHttp = new XMLHttpRequest()

    xmlHttp.onreadystatechange = function(){
        if (this.readyState == 4){
            console.log("Estado listo = "+this.readyState)
            if (this.status == 200){
                console.log("LISTO !! : " +this.status)
                procesarRespuestaIngredientes(this.responseText)
            
            }else{
                alert("ERRORRRRRR")
            }
        }
    }
    xmlHttp.open('GET',URL_DESTINO + RECURSO, true)
    xmlHttp.send(null)
}
function procesarRespuestaIngredientes(jsonDoc){

    if (isIngredientesLoaded){
        datosIngredientes.innerHTML = '' 
    }

    let objetoJson = JSON.parse(jsonDoc)
    let ArrayIngredientes = objetoJson.PRODUCTOS.INGREDIENTES

    let th = document.createElement("p")
    datosIngredientes.appendChild(th)

    ArrayIngredientes.forEach((ing) => {

        //Creamos los checkbox
        var check = document.createElement("input")
        check.setAttribute("type","checkbox");
        check.setAttribute("name","ingredientes")
        check.setAttribute("id",ing.INGREDIENTE)
        check.setAttribute("value", ing.PRECIO)

        datosIngredientes.appendChild(check)

        //Creamos los label.
        var labelIngredientes = document.createElement("label")
        labelIngredientes.setAttribute("for", ing.INGREDIENTE)
        labelIngredientes.textContent = ing.INGREDIENTE

        datosIngredientes.appendChild(labelIngredientes)
    })

    isIngredientesLoaded = true
}

/** 
 * Refresca los datos del json de las secciones ya cargadas
 */
function refrescarDatos(){ 
    if (isDatosLoaded) enviarDatosTamaños()
    if (isFamosasLoaded) enviarDatosFamosas()
    if (isIngredientesLoaded) enviarDatosIngredientes()
}

/* funcion de calcular el total
*añadimos el value de precio en procesarRespuestaTamaño y procesar respuestaRespuestaIngredientes
*/
function calcularTotal(){
    // recorremos el array precioT y detectamos el valor del seleccionado
    let precioT = document.getElementsByName("tamaño");
    let precioTamaño=0
    for (let a = 0; a<precioT.length;a++){
        if(precioT[a].checked){
            precioTamaño=precioT[a].value;
        }
        
        console.log(precioTamaño)
        
    }

    // recorremos el array precioI y detectamos el valor del seleccionado
    let precioI = document.getElementsByName("ingredientes")
    let precioIngredientes=0;
    for (let b = 0; b<precioI.length;b++){
        if(precioI[b].checked){
            precioIngredientes=(parseInt(precioIngredientes)+parseInt(precioI[b].value));
        }
        
        console.log(precioIngredientes)
        
    }
    
    
    //sumamos los precios y sacamos el total en pantalla
    let precioTotal= 0;
    precioTotal=(parseInt(precioTamaño) + parseInt(precioIngredientes));
    return alert("el precio de tu pizza es "+ precioTotal+" euros");


}
/**
 * Variables que declaramos al cargar la página
 */
window.onload = function(){
    let tamaños = document.getElementById("dato")
    let ingredientes = document.getElementById("ing")

    let refrescar = document.getElementById("refrescar")
    
    tamaños.addEventListener("click",enviarDatosTamaños)
    ingredientes.addEventListener("click",enviarDatosIngredientes)
    refrescar.addEventListener("click",refrescarDatos)


    let datosTamaños = document.getElementById("datosTamaños")
    let datosIngredientes = document.getElementById("datosIngredientes")

    let validaPizza = document.getElementById("finalizar")
    validaPizza.addEventListener("click", validacion)

}