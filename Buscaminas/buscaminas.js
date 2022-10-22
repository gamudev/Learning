let bombas = [];
let casillasProximas = [];
var tamaño = 10;

$("#iniciarBuscaminas").click(function(){
    tamaño = Number($("#tamaño").val());
    casillasProximas = [(-tamaño - 1), -tamaño, (-tamaño + 1), -1, 1, (tamaño - 1), tamaño, (tamaño + 1)];
    console.log(casillasProximas);
    for(let i = 0 ; i < tamaño ; i++){
        for (let j = 0; j < tamaño; j++) {
            $("#tablero").append("<button id='casilla" + (i * 10 + j) + "' class='tablero'></button>");
        }
    }
    $("#tablero").css("width",40*tamaño);
    $("#seleccionarTamaño").css("visibility","hidden");
    colocarBombas(tamaño);
    console.log("Bombas: " + bombas);
    addEvents();
});

function colocarBombas(){
    // let numBombas = Math.floor(tamaño / 2);
    let numBombas = Math.floor(tamaño * 1.3);
    while (numBombas != 0){
        posicion = Math.floor(Math.random() * (tamaño * tamaño));
        if (!bombas.includes(posicion)){
            numBombas--;
            bombas.push(posicion);
            // $("#casilla" + posicion).html("B");
        }
    }
}

function addEvents(){
    $(".tablero").click(function () {
        let casilla = Number($(this).attr("id").substring(7,9));
        if ($("#casilla" + casilla).html() != '') return;
        $(this).css("background-color","gainsboro");
        if (bombas.includes(casilla)){
            derrota();
        } else{
            calcularCasillasProximas(casilla);
        }
    });

    function derrota() {
        $("body").append("<span>Has perdido</span");
        $(".tablero").unbind("click");
        bombas.forEach(function (casillaBomba) {
            // $("#casilla" +casillaBomba).html("o");
            $("#casilla" + casillaBomba).append('<img src="img/mina.png" height="15" width="15" />');
        });
    }

    function calcularCasillasProximas(casilla){
        console.log("DENTRO calcularCasillasProximas");
        casillasProximas.forEach(function(casillaProxima){
            if (bombas.includes(casilla+casillaProxima)) return;
            if (limiteTablero(casilla, casillaProxima)) return; 
            let bombasProximas = calcularBombasProximas(casillaProxima + casilla);
            switch (bombasProximas){
                case 1: $("#casilla" + (casilla + casillaProxima)).css("color", "blue"); ; break;
                case 2: $("#casilla" + (casilla + casillaProxima)).css("color", "green");; break;
                case 3: $("#casilla" + (casilla + casillaProxima)).css("color", "red");; break;
                case 4: $("#casilla" + (casilla + casillaProxima)).css("color", "midnightblue");; break;
                case 4: $("#casilla" + (casilla + casillaProxima)).css("color", "brown");; break;
            }

            $("#casilla" + (casilla + casillaProxima)).css("background-color", "gainsboro").html(bombasProximas == 0 ? ' ' : bombasProximas);
        });
    }

    function calcularBombasProximas(casilla){
        if ($("#casilla" + casilla).html() != '' || $("#casilla" + casilla).html() == "&#215") return $("#casilla" + casilla).html();
        let bombasProximas = 0;
        casillasProximas.forEach(function (casillaProxima) {
            if (limiteTablero(casilla, casillaProxima)) return;
            if (bombas.includes(casilla+casillaProxima)){
                bombasProximas++;
            }
        });
        $("#casilla" + casilla).html(' ');
        console.log("bombasProximas: " + bombasProximas);
        if (bombasProximas == 0){
            console.log("ENTRA calcularCasillasProximas");
            calcularCasillasProximas(casilla);
            console.log("SALE calcularCasillasProximas");
        }
        return bombasProximas;
    }

    function limiteTablero(casilla, casillaProxima){
        if (casilla < 0 || casilla >= tamaño*tamaño
        || (casilla < tamaño && (casillaProxima == (-tamaño - 1) || casillaProxima == (-tamaño) || casillaProxima == (-tamaño + 1)))
        || (casilla % tamaño == 0 && (casillaProxima == (-tamaño - 1) || casillaProxima == -1 || casillaProxima == (tamaño - 1))) 
        || (casilla % tamaño == 9 && (casillaProxima == (-tamaño + 1) || casillaProxima == 1 || casillaProxima == (tamaño + 1))) 
        || (casilla >= (tamaño * (tamaño - 1)) && (casillaProxima == (tamaño - 1) || casillaProxima == tamaño || casillaProxima == (tamaño + 1)))) 
            return true;
        return false;
    }

    $(".tablero").mousedown(function (e) {
        if (e.which == 3 && $(this).attr("class") == 'tablero') {
            $(this).attr("class","tablero bandera");
            $(this).append('<img src="img/bandera.png" height="15" width="15" />')
        } else if (e.which == 3 && $(this).attr("class") == 'tablero bandera'){
            $(this).attr("class", "tablero interrogacion");
            $(this).empty();
            $(this).append('<img src="img/interrogacion.png" height="15" width="15" />')
        } else if (e.which == 3 && $(this).attr("class") == 'tablero interrogacion'){
            $(this).empty();
            $(this).attr("class", "tablero");
        }   
    });
}

window.onload = function () {
    document.addEventListener("contextmenu", function (e) {
        e.preventDefault();
    }, false);
} 