let bombas = [];
let casillasProximas = [];
var tamaño = 10;

$("#iniciarBuscaminas").click(function(){
    tamaño = $("#tamaño").val();
    casillasProximas = [(-tamaño - 1), -tamaño, (-tamaño + 1), -1, 1, (tamaño - 1), tamaño, (tamaño + 1)];
    console.log(tamaño);
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
    let numBombas = Math.floor(tamaño / 2);
    while (numBombas != 0){
        posicion = Math.floor(Math.random() * (tamaño * tamaño));
        if (!bombas.includes(posicion)){
            numBombas--;
            bombas.push(posicion);
        }
    }
}

function addEvents(){
    $(".tablero").click(function () {
        let casilla = Number($(this).attr("id").substring(7,9));
        $(this).css("background-color","gainsboro");
        if (bombas.includes(casilla)){
            $(this).html("B"); 
            derrota();
        } else{
            calcularCasillasProximas(casilla);
        }
    });

    function derrota() {
        $("body").append("<span>Has perdido</span");
        $(".tablero").unbind("click");
    }

    function calcularCasillasProximas(casilla){
        casillasProximas.forEach(function(casillaProxima){
            if (esTablero(casilla)) return;
            let bombasProximas = calcularBombasProximas(casilla+casillaProxima);
            $("#casilla" + (casilla + casillaProxima)).css("background-color", "gainsboro").html(bombasProximas);
        });
    }

    function calcularBombasProximas(casilla){
        let bombasProximas = 0;
        casillasProximas.forEach(function (casillaProxima) {
            if (esTablero(casilla, casilla+casillaProxima)) return;
            if (bombas.includes(casilla+casillaProxima)){
                bombasProximas++;
            }
        });
        return bombasProximas;
    }

    function esTablero(casilla, casillaProxima){
        console.log("Primera fila: " + (casilla < tamaño) + " -> casilla " + casilla + " tamaño " + tamaño );
        console.log("Ultima fila: " + (casilla >= (tamaño * (tamaño - 1)) + " -> casilla " + casilla + " tamaño " + (tamaño * (tamaño - 1)) ));
        console.log("Primera columna: " + (casilla % tamaño == 0) + " -> casilla " + casilla + " tamaño " + (tamaño * (tamaño - 1)) );
        console.log("Ultima columna: " + (casilla >= (tamaño * (tamaño - 1)) + " -> casilla " + casilla + " tamaño " + (tamaño * (tamaño - 1)) ));
        if ((casilla < tamaño && (casillaProxima == (-tamaño - 1) || casillaProxima == (-tamaño) || casillaProxima == (-tamaño + 1)))
        || (casilla % tamaño == 0 && (casillaProxima == (-tamaño - 1) || casillaProxima == -1 || casillaProxima == (tamaño - 1))) 
        || (casilla % (tamaño - 1) == 0 && (casillaProxima == (tamaño - 1) || casillaProxima == 1 || casillaProxima == (tamaño + 1))) 
        || (casilla >= (tamaño * (tamaño - 1)) && (casillaProxima == (tamaño - 1) || casillaProxima == tamaño || casillaProxima == (tamaño + 1)))) 
            return true;
        return false;
    }


}

