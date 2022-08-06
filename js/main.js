
var DateTime = luxon.DateTime;

//Definicion de constantes para el calculo
const priceFactor = {
    pricekm:10,
    areaFactor:0.15,
    volumeFactor:0.010,
    weightFactor:50
}

let exec = document.querySelector("#calculate") 
exec.addEventListener('click', calcRoute)


//Crear objetos de autocompletar para los inputs
var options = {
    types: ['(cities)']
    }
    
    var input1 = document.getElementById("from");
    var autocomplete1 = new google.maps.places.Autocomplete(input1, options);
    
    var input2 = document.getElementById("to");
    var autocomplete2 = new google.maps.places.Autocomplete(input2, options);
    
//GOOGLE MAPS API

//Objetos --> parametros para definir punto cero del mapa y propiedades del mapa

var myLatLng = { lat: -34.6038, lng: -58.3817 }; 

var mapOptions = {  
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}; 

//Crear nueva instancia de clase Map e insertar en HTML
//Crear un objeto para usar el metodo de direcciones y obtener la ruta optima para nuestro input
//Crear un objeto DirectionsRenderer para mostrar la ruta en pantalla
//Asociar el objeto DirectionsRenderer al mapa previamente definido
var map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();
directionsDisplay.setMap(map);

function logTrip (){
    let request = {
        origin: "Baradero, Provincia de Buenos Aires, Argentina", //BASE empresa transporte
        destination: document.getElementById("from").value, // Donde recoger el paquete
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, route)

    function route (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //display route
            directionsDisplay.setDirections(result)
        } else {
            //Eliminar Ruta del Mapa
            directionsDisplay.setDirections({ routes: [] }); 
            //Centrar el mapa en posicion HOME
            map.setCenter(myLatLng);
            //Mostrar mensaje de error
            output.innerHTML = "<div> <p> No fue posible encontrar una ruta valida para la encomienda </p> </div>";   
        }
       
        let logDistance = parseInt((result.routes[0].legs[0].distance.value)/1000)
        let logDuration = result.routes[0].legs[0].duration.value //segundos
    
        localStorage.setItem("logDistance",logDistance)
        localStorage.setItem("logDuration",logDuration)
    }

}

function logReturn (){
    let request = {
        origin: document.getElementById("to").value, //BASE empresa transporte
        destination: "Baradero, Provincia de Buenos Aires, Argentina", // Donde recoger el paquete
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, route)

    function route (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //display route
            directionsDisplay.setDirections(result)
        } else {
            //Eliminar Ruta del Mapa
            directionsDisplay.setDirections({ routes: [] }); 
            //Centrar el mapa en posicion HOME
            map.setCenter(myLatLng);
            //Mostrar mensaje de error
            output.innerHTML = "<div> <p> No fue posible encontrar una ruta valida para la encomienda </p> </div>";   
        }
       
        let retDistance = parseInt((result.routes[0].legs[0].distance.value)/1000)
        let retDuration = result.routes[0].legs[0].duration.value //segundos
    
        localStorage.setItem("retDistance",retDistance)
        localStorage.setItem("retDuration",retDuration)
    }

}

function calcRoute() {

    
    //Crear request para el objeto DirectionsRequest iniciado con DirectionsService
    let request = {
        origin: document.getElementById("from").value, //input origen
        destination: document.getElementById("to").value, // input destino
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, route)

    function route (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            //display route
            directionsDisplay.setDirections(result)
        } else {
            //Eliminar Ruta del Mapa
            directionsDisplay.setDirections({ routes: [] }); 
            //Centrar el mapa en posicion HOME
            map.setCenter(myLatLng);
            //Mostrar mensaje de error
            output.innerHTML = "<div> <p> No fue posible encontrar una ruta valida para la encomienda </p> </div>";   
        }

        let distance = parseInt((result.routes[0].legs[0].distance.value)/1000)
        let duration = result.routes[0].legs[0].duration.value //segundos

        console.log("Calculo de Distancia: " + distance + "[Km]")
        localStorage.setItem("distance",distance)
        localStorage.setItem("duration",duration)
        logTrip()
        logReturn()
        calculate()
    }
}


function calculate() {
    const trip = parseInt(localStorage.getItem("distance"))
    const logTrip = parseInt(localStorage.getItem("logDistance")) + parseInt(localStorage.getItem("retDistance"))
    const distance =  trip + logTrip 
    const weight = document.getElementById("weight").value
    const volume = document.getElementById("sizeH").value*document.getElementById("sizeW").value*document.getElementById("sizeD").value
    const area = document.getElementById("sizeW").value*document.getElementById("sizeD").value
    const date = document.getElementById("arrDate").value
    let lxtime = DateTime.fromISO(date)

    //Funcion para definir si el objeto es fragil
    function fragileObj() {
        const fragile = document.getElementById("fragile").value
        if (fragile === "true") {
            fragileFactor = 1.1
        } else { 
            fragileFactor = 1
        }
        return (fragileFactor)
    }

    //Funcion para definir si el objeto puede ser apilado
    function stackObj() {
        const stack = document.getElementById("stack").value
        if (stack === "true") {
            stackFactor = 1
        } else { 
            stackFactor=1.1
        }
        return (stackFactor)
    }

    fragileObj()
    stackObj()

    let price = parseInt(stackFactor * fragileFactor * (priceFactor.pricekm*distance) + (priceFactor.areaFactor * area) + (priceFactor.volumeFactor*volume) + (priceFactor.weightFactor*weight));

    localStorage.setItem("price",price)
    localStorage.setItem("objDate",lxtime)

    const job = {
        id: Date.now(),
        object: document.getElementById("object").value,
        origin: document.getElementById("from").value,
        destination: document.getElementById("to").value,
        distance: distance,
        stack: document.getElementById("stack").value,
        fragile: document.getElementById("fragile").value,
        priceTag: price,
    }

    resultRender()
    return (job)
}

function resultRender() {
    const distance = localStorage.getItem("distance")
    const price = localStorage.getItem("price")
    let output2 = document.querySelector("#calculations");
    output2.innerHTML =
    "<h2> Detalles de tu encomienda:  </h2>"+
    "<h3> Paquete: " + document.getElementById("object").value+
    "<h3> Origen: " + document.getElementById("from").value + "</h3>"+
    "<h3> Destino: " + document.getElementById("to").value + "</h3>"+
    "<h3> Distancia de Encomienda: " + distance + "</h4>"+
    "<h3> Precio de Encomienda: $ " + price + "</h3>"+
    "<h3> Fecha de llegada solicitada: " + document.getElementById("arrDate").value + "</h3>"+
    "<div>"+
    "<button id='sendJob'>Cargar Encomienda</button>"+
    "</div>"+
    "<div>"+
    "<button id='modifyJob'>Modificar</button>"+
    "</div>";

    //Cambio de clases para mostrar informacion por pantalla
    const mainScreen = document.getElementById("userBody");
    mainScreen.classList.replace('user__body','user__bodyHide');
    output2.classList.replace('user__modalHide','user__modal')

    let modifyJob = document.querySelector("#modifyJob")
    modifyJob.addEventListener('click', ()=>{
        mainScreen.classList.replace('user__bodyHide','user__body');
        output2.classList.replace('user__modal','user__modalHide')
    })

    let jobUpload = document.querySelector("#sendJob")
    jobUpload.addEventListener('click', jobRegister)

    }
    
function jobRegister() {
    
    let jobsArray = JSON.parse(localStorage.getItem("jobs")) || [];
    
    let job = calculate();
    jobsArray.push(job);

    localStorage.setItem("jobs",JSON.stringify(jobsArray))

    let output = document.querySelector("#calculations");
    output.classList.replace('user__modal','user__modalHide')
    
    const confirmation = document.getElementById('jobConfirm')
    confirmation.innerHTML = 
    "<h3>Encomienda Solicitada!</h3>"+
    "<p>Recibiras el codigo de seguimiento cuando el viaje sea confirmado</p>"+
    "<button id='confirm'>Aceptar</button>";

    const endJob = document.querySelector("#confirm")

    endJob.addEventListener("click", function(event){
        event.preventDefault()
        window.open("../index.html", "_self")})
}

function deliveryTime(params) {
    const objDate = localStorage.getItem("objDate")
    const tripDuration = localStorage.getItem("duration")
    
    if (tripDuration <= 10800) {
        let prepTime = 2880
    } else {
        let prepTime = 5760
    }
    //addTime = tripDuration + prepTime
    //minTime = DateTime.now().plus({seconds: addTime})
    alert (prepTime)
}