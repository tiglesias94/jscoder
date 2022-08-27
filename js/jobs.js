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

    "<div class='card' style='width: 20rem;height:35rem'>"+
        "<img src='../img/sample.jpg' class='card-img-top' alt='...'>"+
        "<div class='card-body'>"+
            "<h5 class='card-title'>"+"ID: "+object.id+"</h5>"+
            "<h5 class='card-title'>"+"OBJETO: "+object.object+"</h5>"+
            "<ul class='list-group list-group-flush'>"+
                "<li class='list-group-item'>"+ "ORIGEN: "+object.origin+"</li>"+
                "<li class='list-group-item'>"+ "DESTINO: "+object.destination+"</li>"+
            "</ul>"+
        "<a href='#' class='btn btn-primary stored__button'>Ver Detalles</a>"+
        "</div>"+
    "</div>"
})
