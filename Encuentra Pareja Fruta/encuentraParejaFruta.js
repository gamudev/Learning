console.log("Accede a memoria.js");
let frutas = ["platano", "pera", "kiwi", "sandia", "pera", "sandia", "platano", "kiwi"];
ordenarAleatorio();

let frutaAnterior = '';
let frutaAnteriorId = '';
let contadorOcultas = 4;

function ordenarAleatorio(){
    frutas.sort(function () { return Math.random() - 0.5 });
    console.log(frutas);
}

$(".fruta").click(function(){
    if ($(this).attr('class') != 'acertada'){
        let id = $(this).attr('id');
        let fruta = frutas[id.substring(5, 6)];
        $(this).attr("src", 'img/' + fruta + '.png');
        if (frutaAnterior == ''){
            frutaAnterior = fruta;
            frutaAnteriorId = id;
        } else if (frutaAnterior != fruta){
            //ERROR
            $("#" + frutaAnteriorId).attr("src", 'img/oculto.png');
            $("#" + id).attr("src", 'img/oculto.png');
            frutaAnterior = '';
            frutaAnteriorId = '';
        } else {
            //ACIERTO
            $("#" + frutaAnteriorId).attr("class", 'acertada');
            $("#" + id).attr("class", 'acertada');
            frutaAnterior = '';
            frutaAnteriorId = '';
            contadorOcultas--;
            if (contadorOcultas == 0){
                $("body").append("<p class='titulo'>Has ganado!! <button id='reiniciar' onclick='location.reload()'>Jugar de nuevo</button> </p>");
            }
        }
    }
});