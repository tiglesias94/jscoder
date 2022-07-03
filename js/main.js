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
        window.open("pages/admin.html")
    } else 
        {if (buyerNames.includes(userName) && buyerPass.includes(password)) {
            window.open("pages/user.html")
            } else {
            alert("Usuario / Contraseña Incorrectos")
            }
        }
}