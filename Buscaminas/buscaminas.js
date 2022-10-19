$("#iniciarBuscaminas").click(function(){
    let tamaño = $("#tamaño").val();
    console.log(tamaño);
    for(let i = 0 ; i < tamaño ; i++){
        for (let j = 0; j < tamaño; j++) {
            $("#tablero").append("<button id='casilla" + (i * 10 + j) + "' class='tablero'></button>");
        }
    }
    $("#tablero").css("width",20*tamaño);
    $("#seleccionarTamaño").css("visibility","hidden");

    colocarBombas(tamaño)
});

function colocarBombas(tamaño){
    let numBombas = tamaño / 2;
    let bombas = [];
    while (numBombas != 0){
        posicion = Math.random(tamaño * tamaño);
        if (!bombas.includes(posicion)){
            numBombas--;
            bombas.append(posicion);
        }
    }
}



