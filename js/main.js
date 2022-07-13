//Usuarios y contraseñas registradas como proveedores
let saleNames = ['User1','User2', 'User3', 'User4'];
let salePass = ['pass1', 'pass2', 'pass3', 'pass4'];

//Usuarios y contraseñas registradas como vendedores
let buyerNames = ['User5','User6', 'User7', 'User8'];
let buyerPass = ['pass5', 'pass6', 'pass7', 'pass8'];


function login(params) {
    let userLog = document.getElementsByClassName("userLogin"),
            loginInput = [];         
        for (var i = 0; i < userLog.length; i+=1) {    
            loginInput[i] = userLog[i].value;    
            }  
        let userName = loginInput[0]
        let password = loginInput [1]
        loginCheck(userName, password)
}

function loginCheck(userName, password) {

    if (saleNames.includes(userName) && salePass.includes(password)) {
        window.open("https://tiglesias94.github.io/jscoder/pages/admin.html")
    } else 
        {if (buyerNames.includes(userName) && buyerPass.includes(password)) {
            window.open("https://tiglesias94.github.io/jscoder/pages/user.html")
            } else {
            alert("Usuario / Contraseña Incorrectos")
            }
        }
}


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
    directionsService.route(request, function (result, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            //Get distance and time
            const output = document.querySelector('#output');
            output.innerHTML = "<h3> Origen: " + document.getElementById("from").value + "</h3>" + ".<h3> Destino: " + document.getElementById("to").value + "</h3>" +"<h4> Distancia de Encomienda: " + result.routes[0].legs[0].distance.text + "</h4>";
            //display route
            directionsDisplay.setDirections(result);
        } else {
            //delete route from map
            directionsDisplay.setDirections({ routes: [] });
            //center map HOME
            map.setCenter(myLatLng);

            //show error message
            output.innerHTML = "<div> <p> No fue posible encontrar una ruta valida para la encomienda </p> </div>";
        }
    });

}

//create autocomplete objects for all inputs
var options = {
    types: ['(cities)']
}

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);