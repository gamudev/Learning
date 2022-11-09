$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let posX = 20,posY = 20;
    let comidaPosX, comidaPosY;
    let tamañoCulebra = 1, tamaño = 1;
    const BOTON = {
        ARRIBA:38,
        ABAJO:40,
        IZQUIERDA:37,
        DERECHA:39,
    }

    let direccion = BOTON.DERECHA;

    iniciarJuego();

    function iniciarJuego(){
        crearComida();
        pintarElementos();
        mover();
    }

    function crearComida() {
        comidaPosX = Math.round(Math.random() * 29) * 10;
        comidaPosY = Math.round(Math.random() * 29) * 10;
    }

    function pintarElementos(){
        pintarCulebra(context, posX, posY);
        pintarComida(context, comidaPosX, comidaPosY);

    }

    function mover(){
        switch (direccion){
            case BOTON.DERECHA: validarPosicion(posX + 10) === true ? posX += 10 : ''; break;
            case BOTON.IZQUIERDA: validarPosicion(posX - 10) === true ? posX -= 10 : ''; break;
            case BOTON.ABAJO: validarPosicion(posY + 10) === true ? posY += 10 : ''; break;
            case BOTON.ARRIBA: validarPosicion(posY - 10) === true ? posY -= 10 : ''; break;
        }
        context.clearRect(0, 0, 300, 300);
        pintarCulebra(context, posX, posY);
        if (comer()) {
            crearComida();
            pintarComida(context, comidaPosX, comidaPosY);
        } else {
            pintarComida(context, comidaPosX, comidaPosY)
        }
        setTimeout(function(){
            mover();
        },50);
    }

    function pintarCulebra(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(posX, posY, 10 * tamañoCulebra, 10);
        context.stroke();
    }

    function pintarComida(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#ffffff";
        context.fillRect(posX, posY, 10, 10);
        context.stroke();
    }

    $(document).keydown(function(e){
        const teclaPulsada = e.which;
        direccion = teclaPulsada;
    });

    function validarPosicion(pos){
        if (pos < 0 || pos > 290){
            return false;
        } else {
            return true;
        }
    }

    function comer(){
        if (posX === comidaPosX && posY === comidaPosY ){
            tamañoCulebra++;
            return true;
        }
        return false;
    }

});