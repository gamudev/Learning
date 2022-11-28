let valores = [];
let desbloqueoIniciado = false;
let patron = [];

$(".circulo").mousedown(function(){
    $(this).css('background', 'green');
    desbloqueoIniciado = true;
    valores.push($(this)[0].id);
}).mouseup(function () {
    console.log("valores: " + valores);
    $(".circulo").css('background', 'silver');
    desbloqueoIniciado = false;
    if(patron.length == 0){
        patron = valores;
        valores = [];
    } else {
        if(validarPatron()){
            alert("PATRON CORRECTO");
        } else {
            alert("PATRON INCORRECTO");
        }
        valores = [];
    }
});

$(".circulo").mouseenter(function () {
    if (desbloqueoIniciado){
        $(this).css('background', 'green');
        valores.push($(this)[0].id);
    }
});

function validarPatron(){
    console.log("patron: " + patron);
    if(patron.length == valores.length && patron.every(function (v, i) { 
        console.log("comparador: " + v + " vs " + valores[i]);
        return v === valores[i];
    })){
        return true;
    }
    return false;
}