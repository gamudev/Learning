$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let posX = [], posY = [];
    let comidaPosX, comidaPosY;
    let tamañoCulebra = 1;
    let pause = false;
    let record = 1;
    const BOTON = {
        ARRIBA:38,
        ABAJO:40,
        IZQUIERDA:37,
        DERECHA:39,
    }

    let direccion = BOTON.DERECHA;

    iniciarJuego();

    function iniciarJuego(){
        posX = [];
        posY = [];
        posX[0] = 20;
        posY[0] = 20;
        pause = false;
        if (record < tamañoCulebra) {
            record = tamañoCulebra - 1;
        }
        tamañoCulebra = 1;
        $("#puntos").html("Puntos: " + (tamañoCulebra - 1) + " | Record: " + record);

        crearComida();
        pintarCulebra(context, posX[0], posY[0]);
        pintarComida(context, comidaPosX, comidaPosY);
        mover();
    }

    function crearComida() {
        comidaPosX = Math.round(Math.random() * 29) * 10;
        comidaPosY = Math.round(Math.random() * 29) * 10;
    }

    function mover(){
        let finJuego = false;
        if(pause === true){
            return;
        }
        context.clearRect(0, 0, 300, 300);
        for (let idx = tamañoCulebra - 1; idx > 0; idx--) {
            posX[idx] = posX[idx-1]
            posY[idx] = posY[idx-1]
            pintarCulebra(context, posX[idx], posY[idx]);
        }
        switch (direccion){
            case BOTON.DERECHA: validarPosicion(posX[0] + 10) === true ? posX[0] += 10 : finJuego = true; break;
            case BOTON.IZQUIERDA: validarPosicion(posX[0] - 10) === true ? posX[0] -= 10 : finJuego = true; break;
            case BOTON.ABAJO: validarPosicion(posY[0] + 10) === true ? posY[0] += 10 : finJuego = true; break;
            case BOTON.ARRIBA: validarPosicion(posY[0] - 10) === true ? posY[0] -= 10 : finJuego = true; break;
        }
        pintarCulebra(context, posX[0], posY[0]);
        if (comer()) {
            crearComida();
        }
        pintarComida(context, comidaPosX, comidaPosY);
        setTimeout(function(){
            if(finJuego === true){
                iniciarJuego();
                return;
            }
            mover();
        },50);
    }

    function pintarCulebra(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#0743105f";
        context.fillRect(posX, posY, 10, 10);
        context.stroke();
    }

    function pintarComida(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#bd130a";
        context.fillRect(posX, posY, 10, 10);
        context.stroke();
    }

    $(document).keydown(function(e){
        const teclaPulsada = e.which;
        if(teclaPulsada === 32 ){
            if(pause === false) {
                pause = true;
            } else {
                pause = false;
                mover();
            }
        } else {
            direccion = teclaPulsada;
        }
    });

    function validarPosicion(pos){
        if (pos < 0 || pos > 290){
            return false;
        } else {
            return true;
        }
    }

    function comer(){
        if (posX[0] === comidaPosX && posY[0] === comidaPosY ){
            tamañoCulebra++;
            $("#puntos").html("Puntos: " + (tamañoCulebra - 1) + " | Record: " + record);
            return true;
        }
        return false;
    }

});