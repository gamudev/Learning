$(document).ready(function () {
    
    const HEIGHT = $("#juego").attr("height");
    const WIDTH = $("#juego").attr("width");
    const TAMAÑO_UNIDAD = 20;
    const FILAS = HEIGHT / TAMAÑO_UNIDAD;
    const COLUMNAS = WIDTH / TAMAÑO_UNIDAD;
    
    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    
    let direccion = '';
    let figuras = [];
    let pause = false;
    let figuraPendiente = undefined;
    let numeroFiguras = 0;
    let lineasCompletas = 0;
    let velocidadMovimiento = 200;
    let terminar = false;

    const POS = {
        arribaIzq: { x: 120, y: -60 },
        arribaCen: { x: 140, y: -60 },
        arribaDer: { x: 160, y: -60 },
        medioIzq: { x: 120, y: -40 },
        medioCen: { x: 140, y: -40 },
        medioDer: { x: 160, y: -40 },
        abajoIzq: { x: 120, y: -20 },
        abajoCen: { x: 140, y: -20 },
        abajoDer: { x: 160, y: -20 },
    }

    const BOTON = {
        ARRIBA: 38,
        ABAJO: 40,
        IZQUIERDA: 37,
        DERECHA: 39,
        PAUSE:32,
        ENTER:13,
    }

    const COLOR = [,'blue','yellow','purple','orange','green', 'brown'];

    iniciarJuego();

    function iniciarJuego(){
        direccion = '';
        figuras = [];
        pause = false;
        figuraPendiente = undefined;
        numeroFiguras = 0;
        lineasCompletas = 0;
        velocidadMovimiento = 200;
        terminar = false;
        context.clearRect(0, 0, WIDTH, HEIGHT);
        nuevaPieza(); 
    }

    function nuevaPieza(){
        siguienteFigura = false;
        let tipoFigura = Math.round(Math.random() * 5);
        let figura = crearFigura(tipoFigura);
        console.log(figura);
        figuras.push(figura);
        mover(figura);
    }

    function mover(nuevaFigura){
        context.clearRect(0, 0, WIDTH, HEIGHT);
        puntuacion();
        for(let figura of figuras){
            pintarFigura(figura);
        }
        setTimeout(function () {
            if (nuevaFigura.siguienteFigura) {
                comprobarLineasCompletas();
                if (comprobarDerrota(nuevaFigura)){
                    terminar = true;
                    return finJuego();   
                }
                velocidadMovimiento = 200;
                nuevaPieza();
            } else if (pause){
                figuraPendiente = nuevaFigura;
                return;
            } else {
                mover(nuevaFigura);
            }
        }, velocidadMovimiento);
    }

    function crearFigura(tipoFigura) {
        numeroFiguras++;
        switch (tipoFigura){
            case 0: 
                tipoFigura = 'I'; 
                puntos = [
                    { ...POS.abajoCen, posicion: ['suelo','izquierda','derecha'] }, 
                    { ...POS.medioCen, posicion: ['izquierda', 'derecha'] }, 
                    { ...POS.arribaCen, posicion: ['techo', 'izquierda', 'derecha'] }
                ]; break;
            case 1: 
                tipoFigura = 'T'; 
                puntos = [
                    { ...POS.arribaIzq, posicion: ['techo', 'suelo', 'izquierda'] }, 
                    { ...POS.arribaCen, posicion: ['techo'] }, 
                    { ...POS.arribaDer, posicion: ['techo', 'suelo', 'derecha'] },
                    { ...POS.medioCen, posicion: ['suelo', 'izquierda', 'derecha'] }
                ]; break;
            case 2: 
                tipoFigura = 'O'; 
                puntos = [
                    { ...POS.arribaCen, posicion: ['techo', 'izquierda'] }, 
                    { ...POS.arribaDer, posicion: ['techo', 'derecha'] }, 
                    { ...POS.medioCen, posicion: ['suelo', 'izquierda'] }, 
                    { ...POS.medioDer, posicion: ['suelo', 'derecha'] }
                ]; break;
            case 3: 
                tipoFigura = 'S'; 
                puntos = [{ ...POS.medioIzq, posicion: ['techo', 'suelo', 'izquierda'] }, 
                    { ...POS.medioCen, posicion: ['suelo', 'derecha'] }, 
                    { ...POS.arribaCen, posicion: ['techo', 'izquierda'] }, 
                    { ...POS.arribaDer, posicion: ['techo', 'suelo', 'derecha'] }
                ]; break;
            case 4: 
                tipoFigura = 'Z'; 
                puntos = [
                    { ...POS.arribaIzq, posicion: ['techo', 'suelo', 'izquierda'] }, 
                    { ...POS.arribaCen, posicion: ['techo', 'derecha'] }, 
                    { ...POS.medioCen, posicion: ['suelo', 'izquierda'] }, 
                    { ...POS.medioDer, posicion: ['techo', 'suelo', 'derecha'] }
                ]; break;
            case 5: 
                tipoFigura = 'J'; 
                puntos = [
                    { ...POS.arribaCen, posicion: ['techo', 'izquierda', 'derecha'] }, 
                    { ...POS.medioCen, posicion: ['izquierda', 'derecha'] }, 
                    { ...POS.abajoCen, posicion: ['suelo', 'derecha'] }, 
                    { ...POS.abajoIzq, posicion: ['techo', 'suelo', 'izquierda'] }
                ]; break;
            case 6: 
                tipoFigura = 'L'; 
                puntos = [
                    { ...POS.arribaCen, posicion: ['techo', 'izquierda', 'derecha'] }, 
                    { ...POS.medioCen, posicion: ['izquierda', 'derecha'] }, 
                    { ...POS.abajoCen, posicion: ['suelo', 'izquierda'] }, 
                    { ...POS.abajoDer, posicion: ['techo', 'suelo', 'derecha'] }
                ]; break;
        }
        return { id:numeroFiguras,tipoFigura, puntos, siguienteFigura: false, color: COLOR[Math.round(Math.random() * 6)] };
    }

    function pintarFigura(figura){
        context.beginPath();
        context.fillStyle = figura.color;
        if(figura.siguienteFigura){
            for (let punto of figura.puntos) {
                context.fillRect(punto.x, punto.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
                context.strokeStyle = "black";
                context.lineWidth = 2;
                context.strokeRect(punto.x, punto.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
            }
            context.stroke();
            return;
        }
        let moverDireccionY = true, moverDireccionX = true;
        let movX = 0;
        if (direccion === BOTON.IZQUIERDA) {
            movX = -TAMAÑO_UNIDAD;
            direccion = '';
        } else if (direccion === BOTON.DERECHA) {
            movX = TAMAÑO_UNIDAD;
            direccion = '';
        } 
        for (let punto of figura.puntos) {
            if ((punto.y + TAMAÑO_UNIDAD) >= HEIGHT || (punto.posicion.includes('suelo') && apoyado(punto, figura.id))) {
                moverDireccionY = false;
                figura.siguienteFigura = true;
            }
            if (movX != 0 && ((punto.x + movX) < 0 || (punto.x + movX) > (WIDTH - TAMAÑO_UNIDAD) || apoyadoLateral(punto, figura.id, movX, moverDireccionY))) {
                moverDireccionX = false;
            } 
        }
       
        for (let punto of figura.puntos) {
            if (moverDireccionY) {
                punto.y = punto.y + TAMAÑO_UNIDAD; 
            }
            if (moverDireccionX) {
                punto.x += movX;
            }
            context.fillRect(punto.x, punto.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.strokeRect(punto.x, punto.y, TAMAÑO_UNIDAD, TAMAÑO_UNIDAD);
        }
        context.stroke();
    }

    function apoyado(puntoActual, figuraId){
        for (let figura of figuras) {
            if (figura.id == figuraId){
                continue;
            }
            for(let punto of figura.puntos){
                if (punto.posicion.includes('techo') && punto.x === puntoActual.x && punto.y === (puntoActual.y + TAMAÑO_UNIDAD)){
                    return true;
                }
            }
        }
        return false;
    }

    function apoyadoLateral(puntoActual, figuraId, movX, moverDireccionY){
        let auxY = moverDireccionY ? TAMAÑO_UNIDAD : 0;
        for (let figura of figuras) {
            if (figura.id == figuraId) {
                continue;
            }
            for (let punto of figura.puntos) {
                if ((movX == -TAMAÑO_UNIDAD && punto.x === (puntoActual.x + movX) && punto.y === (puntoActual.y + auxY))
                    || (movX == TAMAÑO_UNIDAD && punto.x === (puntoActual.x + movX) && punto.y === (puntoActual.y + auxY))) {
                    return true;
                }
            }
        }
        return false;
    }

    function comprobarLineasCompletas(){
        for (let fila = FILAS-1; fila >= 0; fila--){
            let lineaCompleta = true;
            for(let columna = 0; columna < COLUMNAS; columna++){
                if (!posicionOcupada(fila, columna)){
                    lineaCompleta = false;
                    break;
                }
            }
            if(lineaCompleta){
                lineasCompletas++;
                borrarlinea(fila);
                comprobarLineasCompletas()
            }
        }
    }

    function posicionOcupada(fila, columna){
        for (let figura of figuras) {
            for (let punto of figura.puntos){
                if (punto.y == (fila * TAMAÑO_UNIDAD) && punto.x == (columna * TAMAÑO_UNIDAD)) {
                    return true;
                }
            }
        }
        return false;
    }

    function borrarlinea(linea){
        for (let figura of figuras) {
            figura.puntos = figura.puntos
                .filter((punto) => punto.y !== (linea * TAMAÑO_UNIDAD))
                .map((punto) => {
                    if (punto.y < (linea * TAMAÑO_UNIDAD)) {
                        punto.y = punto.y + TAMAÑO_UNIDAD;
                    } 
                    return punto;
                });
        }
    }

    function comprobarDerrota(figura){
        return figura.puntos.some(puntos => puntos.y == 0);
    }

    function finJuego(){
        context.beginPath();
        context.fillStyle = '#FF003B';
        context.strokeStyle = "black"
        context.font = "45pt Impact";
        context.fillText("GAME OVER", 28, 200);
        context.strokeText("GAME OVER", 28, 200);
        context.font = '25pt Impact';
        context.fillText("Press ENTER to restart", 10, 240);
        context.strokeText("Press ENTER to restart", 10, 240);
        context.stroke();
    }

    function puntuacion(){
        puntuación = lineasCompletas;
        pintarPuntuación();
    }

    function pintarPuntuación(){
        context.beginPath();
        context.fillStyle = 'white';
        context.strokeStyle = "black"
        context.font = '20pt Impact';
        context.fillText("Points: " + puntuación, 2, 24);
        context.strokeText("Points: " + puntuación, 2, 24);
        context.stroke();
    }

    $(document).keydown(function (e) {
        const teclaPulsada = e.which;
        switch (teclaPulsada) {
            // derecha
            case BOTON.DERECHA: direccion = teclaPulsada; break;
            // izquierda 
            case BOTON.IZQUIERDA: direccion = teclaPulsada; break;
            // abajo
            case BOTON.ABAJO: velocidadMovimiento = 10; break;
            // enter
            case BOTON.ENTER: if(terminar){
                    iniciarJuego();  
                } 
                break;
            // pause
            case BOTON.PAUSE:
                if (pause === false) {
                    pause = true;
                } else {
                    pause = false;
                    mover(figuraPendiente);
                };
                break;
        }
    });

});