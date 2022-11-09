$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let posX = 20,posY = 20;
    let comidaPosX, comidaPosY;
    let tamaño = 1;
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
        comidaPosX = Math.round(Math.random() * 30) * 10;
        comidaPosY = Math.round(Math.random() * 30) * 10;
    }

    function pintarElementos(){
        pintarUnidadCulebra(context, posX, posY);
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
        pintarUnidadCulebra(context, posX, posY);
        if (comer()) {
            crearComida();
            pintarComida(context, comidaPosX, comidaPosY);
        } else {
            pintarComida(context, comidaPosX, comidaPosY)
        }
        setTimeout(function(){
            mover();
        },80);
    }

    function pintarUnidadCulebra(context, posX, posY) {
        context.beginPath();
        context.fillStyle = "#000000";
        context.fillRect(posX, posY, 20, 20);
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
        console.log("validar posicion: " + pos);
        if (pos < 0 || pos > 280){
            console.log(false);
            return false;
        } else {
            console.log(true);
            return true;
        }
    }

    function comer(){
        if ((posX === comidaPosX && (posY === comidaPosY || posY + (10 * tamaño) === comidaPosY))
            || (posY === comidaPosY && (posX === comidaPosX || posX + (10 * tamaño) === comidaPosX))
            || (posY + (10 * tamaño) === comidaPosY && posX + (10 * tamaño)  === comidaPosX)){
            //tamaño++;
            //TODO aumentar tamaño de la culebra
            return true;
        }
        return false;
    }
});