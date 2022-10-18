let numClick = 0;


$("button").click(function(){
    if ($(this).html() == ''){
        if(numClick % 2 == 0){
            $(this).html('O');
        } else {
            $(this).html('X');
        }
        numClick++;
        if(comprobarGanador() == true){
            console.log("Hay ganador")
            $("#textoVictoria").css("visibility","visible"); 
            $("button").unbind("click");
        } else if (numClick == 9){
            $("#textoVictoria").css("visibility", "visible");
            $("button").unbind("click");
        }
    }
})


function comprobarGanador(){
    if(comprobarFilas() == true || comprobarColumnas() || comprobarCruzadas()){
        return true;
    }
}

function comprobarFilas() {
    for(let i = 0 ; i < 9; i=i+3){
        if ($("#casilla" + i).html() != '' && $("#casilla" + i).html() == $("#casilla" + (i + 1)).html() && $("#casilla" + i).html() == $("#casilla" + (i + 2)).html()){
                return true;
            }
    }
}

function comprobarColumnas() {
    for (let i = 0; i < 3; i++) {
        if ($("#casilla" + i).html() != '' && $("#casilla" + i).html() == $("#casilla" + (i + 3)).html() && $("#casilla" + i).html() == $("#casilla" + (i + 6)).html()) {
            return true;
        }
    }
}

function comprobarCruzadas() {
    // console.log("ENTRA A comprobarCruzadas");
    // console.log($("#casilla0").html());
    // console.log($("#casilla4").html());
    // console.log($("#casilla8").html());
    // console.log("la otra");
    // console.log($("#casilla2").html());
    // console.log($("#casilla4").html());
    // console.log($("#casilla6").html());
    if (($("#casilla0").html() != '' && $("#casilla0").html() == $("#casilla4").html() && $("#casilla0").html() == $("#casilla8").html()) 
        || ($("#casilla2").html() != '' && $("#casilla2").html() == $("#casilla4").html() && $("#casilla2").html() == $("#casilla6").html())) {
        return true;
    }
}
