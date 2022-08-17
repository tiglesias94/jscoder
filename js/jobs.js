/*const listaDeCompras = document.querySelector('#activeJobs');
const li = document.createElement("li");
li.textContent = "manzana";
listaDeCompras.appendChild(li);*/

let jobs = JSON.parse(localStorage.getItem("storage")) || []


jobs.forEach(object => {
    console.log(object.origin);
    const node = document.querySelector("#activeJobs");
    const card = document.createElement("div");
    card.classList.add("jobs__card");
    node.appendChild(card)
    card.innerHTML = 
    "<li class='card__element'>ID Encomienda: " + "<h4 class='element__content'>" + object.id + "</h4>" + "</li>"+
    "<li class='card__element'>Paquete: " + "<h4 class='element__content'>" + object.object + "</h4>" + "</li>"+
    "<li class='card__element'>Origen: " + "<h4 class='element__content'>" + object.origin + "</h4>" + "</li>"+
    "<li class='card__element'>Destino: " + "<h4 class='element__content'>" + object.destination + "</h4>" + "</li>"+
    "<button> Ver Detalles </button>";
})

