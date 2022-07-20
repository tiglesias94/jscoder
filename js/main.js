let myLatLng = { lat: 38.3460, lng: -0.4907 }; //Objeto --> parametros para definir punto cero del mapa
let mapOptions = { // Objeto --> Propiedades del mapa 
    center: myLatLng,
    zoom: 7,
    mapTypeId: google.maps.MapTypeId.ROADMAP
}; 

//Crear nueva instancia de clase Map e insertar en HTML
let map = new google.maps.Map(document.getElementById('googleMap'), mapOptions); // Nuevo objeto MAP a partir del metodo MAP() de google.maps

//Crear un objeto para usar el metodo de direcciones y obtener la ruta optima para nuestro input
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);


function calcRoute() {
    //Crear request para el objeto DirectionsRequest iniciado con DirectionsService
    var request = {
        origin: document.getElementById("from").value, //input origen
        destination: document.getElementById("to").value, // input destino
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC
    }

    //pass the request to the route method
    directionsService.route(request, 
        function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = 
            

            //display route
            directionsDisplay.setDirections(result)

            
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map HOME
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div> <p> No fue posible encontrar una ruta valida para la encomienda </p> </div>";   
        }
    

        //Calculo costo de envio
        
        const priceFactor = {
            pricekm:10,
            areaFactor:0.15,
            volumeFactor:0.010,
            weightFactor:50
        }
        
        
        const distance = parseInt(result.routes[0].legs[0].distance.text)
        const weight = document.getElementById("weight").value
        const volume = document.getElementById("sizeH").value*document.getElementById("sizeW").value*document.getElementById("sizeD").value
        const area = document.getElementById("sizeW").value*document.getElementById("sizeD").value
        
        function fragileObj() {
            const fragile = document.getElementById("fragile").value
            if (fragile === "true") {
                fragileFactor = 1.1
                console.log ("El objeto es FRAGIL")
            } else { 
                fragileFactor = 1
                console.log ("El objeto NO es FRAGIL")    
            }
            return (fragileFactor)
        }

        function stackObj() {
            const stack = document.getElementById("stack").value
            if (stack === "true") {
                stackFactor = 1
                console.log ("El objeto es APILABLE")
            } else { 
                stackFactor=1.1
                console.log ("El objeto NO es APILABLE")    
            }
            return (stackFactor)
        }
        
        fragileObj()
        stackObj()
   
        console.log("Distancia de envio: " + distance)
        console.log("Area del paquete: " + area)
        console.log("Volumen del paquete: " + volume)
        console.log("Peso del paquete: " + weight)
               
        let price = parseInt(stackFactor * fragileFactor * (priceFactor.pricekm*distance) + (priceFactor.areaFactor * area) + (priceFactor.volumeFactor*volume) + (priceFactor.weightFactor*weight));
        

        console.log("-----------------------")
        console.log("Precio calculado del viaje: " + price)     
        
        const output = document.querySelector('#calculations');
        output.innerHTML = 
        "<h2> Detalles de tu encomienda:  </h2>"+
        "<h3> Paquete: " + document.getElementById("object").value +
        "<h3> Origen: " + document.getElementById("from").value + "</h3>" + 
        "<h3> Destino: " + document.getElementById("to").value + "</h3>" +
        "<h3> Distancia de Encomienda: " + result.routes[0].legs[0].distance.text + "</h4>" +
        "<h3> Precio de Encomienda: $ " + price + "</h3>";
    })
    ;
}

//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

