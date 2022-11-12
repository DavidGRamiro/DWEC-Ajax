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
        return precioTotal()
}   

/**
 * Toma el valor del botón de radio que está marcado y lo devuelve como un número entero.
 * Si el tamaño de la posicion 0, es seleccionado, asignamos x al entero 5;.
 * Si el tamaño de la posicion 1, es seleccionado, asignamos x al entero 10;.
 * Si el tamaño de la posicion 2, es seleccionado, asignamos x al entero 15;.
 * En caso de que no este seleccionado, por defecto mandamos una alerta en el caso de que la
 * validación no se haga.
 * 
 * @returns El valor de la variable x convertida a entero en la variable euros.
 */
function totalTamaños(){
    //Referencia a los tamaños de la pizza
    let tamaño = document.getElementsByName("tamaño")
    let x = 0;
    if(tamaño[0].checked){
        x = 5;
    }else if (tamaño[1].checked){
        x = 10;
    }else if (tamaño[2].checked){  
        x = 15;
    }else{
        alert("Ningún tamaño seleccionado")
    }
    let euros = parseInt(x)
    return euros
}

/**
 * Toma el número de casillas marcadas y lo devuelve como un número entero.
 * Recorre el array, y en el caso de que encuentre un elemento seleccionado, 
 * sumará el contador.
 * 
 * @returns El número de casillas marcadas en la variable euros.
 */

function totalIngredientes(){

    let  checkbox = document.getElementsByName("ingredientes");
    let y = 0;
    for (let x = 0; x <checkbox.length; x++){
        if(checkbox[x].checked){
            y++;
        }
    }
    let euros = parseInt(y)
    return euros;
}

/**
 * 
 * @returns Llamada a la función totalTamaños() y totalIngredientes();
 */
function precioTotal(){
    
    return alert("El precio es  " + `${totalTamaños() + totalIngredientes()}` + " Euros")
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
    let ArrayPizzaTamaños = objetoJson.PRODUCTOS.PERSONALIZA.TAMAÑOS; 
    
    let th = document.createElement("p")
    datosTamaños.appendChild(th)
    
    ArrayPizzaTamaños.forEach((element) => {
        //Creamos el input
        var tamañosSelector = document.createElement("input");
        tamañosSelector.setAttribute("type", "radio");
        tamañosSelector.setAttribute("name", "tamaño");
        tamañosSelector.setAttribute("value", element);

        datosTamaños.appendChild(tamañosSelector);

        //Creamos el label
        var labelTamaños = document.createElement("label");
        labelTamaños.setAttribute("for", element);
        labelTamaños.textContent = element;

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
    let ArrayIngredientes = objetoJson.PRODUCTOS.PERSONALIZA.INGREDIENTES

    let th = document.createElement("p")
    datosIngredientes.appendChild(th)

    ArrayIngredientes.forEach((ing) => {

        //Creamos los checkbox
        var check = document.createElement("input")
        check.setAttribute("type","checkbox");
        check.setAttribute("name","ingredientes")
        check.setAttribute("value",ing)

        datosIngredientes.appendChild(check)

        //Creamos los label.
        var labelIngredientes = document.createElement("label")
        labelIngredientes.setAttribute("for", ing)
        labelIngredientes.textContent = ing

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

/**
 * Variables que declaramos al cargar la página
 */
window.onload = function(){
    let tamaños = document.getElementById("dato")
    let famosas = document.getElementById("fam")
    let ingredientes = document.getElementById("ing")
    let refrescar = document.getElementById("refrescar")
    tamaños.addEventListener("click",enviarDatosTamaños)
    famosas.addEventListener("click",enviarDatosFamosas)
    ingredientes.addEventListener("click",enviarDatosIngredientes)
    refrescar.addEventListener("click",refrescarDatos)

    let datosTamaños = document.getElementById("datosTamaños")
    let datosFamosas = document.getElementById("datosFamosas")
    let datosIngredientes = document.getElementById("datosIngredientes")

    let validaPizza = document.getElementById("finalizar")
    validaPizza.addEventListener("click", validacion)
    
}