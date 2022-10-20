let bombas = [];

$("#iniciarBuscaminas").click(function(){
    let tamaño = $("#tamaño").val();
    console.log(tamaño);
    for(let i = 0 ; i < tamaño ; i++){
        for (let j = 0; j < tamaño; j++) {
            $("#tablero").append("<button id='casilla" + (i * 10 + j) + "' class='tablero'></button>");
        }
    }
    $("#tablero").css("width",40*tamaño);
    $("#seleccionarTamaño").css("visibility","hidden");

    colocarBombas(tamaño);
    console.log(bombas);
    addEvents();
});

function colocarBombas(tamaño){
    let numBombas = tamaño / 2;
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
        let casilla = $(this).attr("id");
        calcularCasillasCercanas();
        if (bombas.includes(Number(casilla.substring(7,9)))){
            $(this).html("B"); 
            derrota();
        } else{
            $(this).html("-");
        }
    });

    function derrota() {
        $("body").append("<span>Has perdido</span");
        $(".tablero").unbind("click");
    }
}

