console.log("ACCEDE LOGIN.JS");

$("#acceder").click(function(){
    if (validarEmail($("#email")[0].value) && validarPassword($("#password")[0].value)){
        alert("Login correcto");
    } else {
        alert("La dirección de email es incorrecta.");
    }
});

function validarEmail(valor) {
    let re = /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
    if (re.exec(valor)) {
        return true;
    }
    return false;
}

function validarPassword(valor) {
    if(valor != ''){
        return true;
    }
    return false;
}