$(document).ready(function () {

    const $juego = $("#juego")[0];
    let context = $juego.getContext("2d");
    let posX = 20,posY = 20;
    const BOTONES = {
        ARRIBA:38,
        ABAJO:40,
        IZQUIERDA:37,
        DERECHA:39,
    }

    iniciarJuego();

    function iniciarJuego(){
        rellenarCuadrado(context,posX,posY);
    }

    function rellenarCuadrado(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(posX, posY, 20, 20);
        context.stroke();
    }

    $(document).keydown(function(e){
        validarPosicion(e.which);
        switch (e.which){
            case BOTONES.DERECHA: posX = validarPosicion(posX+10); break;
            case BOTONES.IZQUIERDA: posX = validarPosicion(posX-10); break;
            case BOTONES.ABAJO: posY = validarPosicion(posY+10); break;
            case BOTONES.ARRIBA: posY = validarPosicion(posY-10); break;
            default: break; //pausarJuego();
        }
        console.log("Posiciones: " + posX + "-" + posY);
        context.clearRect(0, 0, 300, 300);
        rellenarCuadrado(context, posX, posY);
        // validarPosicion();
    });

    function validarPosicion(pos){
        if (pos < 0){
            return pos + 10;
        } else if (pos > 280){
            return pos - 10;
        } else {
            return pos;
        }
    }
});