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
let isDatosLoaded = false

/**
 * Funcion, que se encarga de recuperar los datos de nuestro "servidor", que en este caso es un documento JSON.
 * Llamamos a la fucion HTTP, y evaluamos sus estados para tener un mejor control del estado en cada momento.
 * Una vez que la respuesta sea satisfactoria, hacemos una llamada a la funcion procesarRespuesta.
 */
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
 * Una vez que la respuesta ha sido recibida con éxito, nos traemos el texto. Lo parseamos a un objeto JSON, y lo recorremos.
 * Con un for each, declaramos que para cada tamaño, nos cree un input de tipo radio, asignandole el nombre y el valor,
 * y ademas nos crea tambien el label. 
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
/**
 * Al igual que en la funcion de enviarDatosTamaños, hacemos la peticion a nuestro servidor,
 * Una vez con la respuesta satisfactoria, llamamos a la función procesarRespuestaIngredientes.
 */
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

/**
 * A traves del texto que nos llega por parámetro lo volvemos a convertir en objetoJson
 * Recorremos el objeto y creamos los checkbox para cada ingrediente.
 * Le asignamos el valor y el nombre a cada uno de ellos. 
 */
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
    if (isIngredientesLoaded) enviarDatosIngredientes()
}

/* Funcion de calcular el total
* Esta funcion es llamada una vez que en la funcion validacion, ha sido superada con éxito, declara al principio de este código.
*/
function calcularTotal(){
    // recorremos el array precioT y detectamos el valor del seleccionado
    let precioT = document.getElementsByName("tamaño");
    let precioTamaño=0
    for (let a = 0; a<precioT.length;a++){
        if(precioT[a].checked){
            precioTamaño=precioT[a].value;
        }
    }
    // Recorremos el array precioI y detectamos el valor del seleccionado
    let precioI = document.getElementsByName("ingredientes")
    let precioIngredientes=0;
    for (let b = 0; b<precioI.length;b++){
        if(precioI[b].checked){
            precioIngredientes=(parseInt(precioIngredientes)+parseInt(precioI[b].value));
        }
    }
    //Sumamos los precios y sacamos el total en pantalla
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

    let validaPizza = document.getElementById("finalizar")
    validaPizza.addEventListener("click", validacion)

}