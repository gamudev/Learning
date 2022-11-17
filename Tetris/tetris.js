$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let direccion = '';
    let figuras = [];
    let pause = false;
    let figuraPendiente = undefined;
    let numeroFiguras = 0;

    const POS = {
        arribaIzq: { x: 120, y: 5 },
        arribaCen: { x: 140, y: 5 },
        arribaDer: { x: 160, y: 5 },
        medioIzq: { x: 120, y: 25 },
        medioCen: { x: 140, y: 25 },
        medioDer: { x: 160, y: 25 },
        abajoIzq: { x: 120, y: 45 },
        abajoCen: { x: 140, y: 45 },
        abajoDer: { x: 160, y: 45 },
    }

    const BOTON = {
        ARRIBA: 38,
        ABAJO: 40,
        IZQUIERDA: 37,
        DERECHA: 39,
        PAUSE:32,
    }

    const COLOR = ['red','blue','yellow','purple','orange','green', 'brown'];

    iniciarJuego();

    function iniciarJuego(){
        nuevaPieza(); 
    }

    function nuevaPieza(){
        siguienteFigura = false;
        // let tipoFigura = Math.round(Math.random() * 6);
        let tipoFigura = 0;
        let figura = crearFigura(tipoFigura);
        console.log(figura);
        figuras.push(figura);
        mover(figura);
    }

    function mover(nuevaFigura){
        context.clearRect(0, 0, 300, 300);
        for(let figura of figuras){
            pintarFigura(figura);
        }
        setTimeout(function () {
            if (nuevaFigura.siguienteFigura) {
                lineasCompletas();
                nuevaPieza();
            } else if (pause){
                figuraPendiente = nuevaFigura;
                return;
            } else {
                mover(nuevaFigura);
            }
        }, 200);
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
                context.fillRect(punto.x, punto.y, 20, 20);
                context.strokeStyle = "black";
                context.lineWidth = 2;
                context.strokeRect(punto.x, punto.y, 20, 20);
            }
            context.stroke();
            return;
        }
        let moverDireccionY = true, moverDireccionX = true;
        let movX = 0;
        if (direccion === BOTON.IZQUIERDA) {
            movX = -20;
            direccion = '';
        } else if (direccion === BOTON.DERECHA) {
            movX = 20;
            direccion = '';
        } 
        for (let punto of figura.puntos) {
            if ((punto.y + 20) > 300 || (punto.posicion.includes('suelo') && apoyado(punto, figura.id))) {
                moverDireccionY = false;
                figura.siguienteFigura = true;
            }
            if (movX != 0 && ((punto.x + movX) < 0 || (punto.x + movX) > 280 || apoyadoLateral(punto, figura.id, movX, moverDireccionY))) {
                moverDireccionX = false;
            }
        }
       
        for (let punto of figura.puntos) {
            if (moverDireccionY) {
                punto.y = punto.y + 20; 
            }
            if (moverDireccionX) {
                punto.x += movX;
            }
            context.fillRect(punto.x, punto.y, 20, 20);
            context.strokeStyle = "black";
            context.lineWidth = 2;
            context.strokeRect(punto.x, punto.y, 20, 20);
        }
        context.stroke();
    }

    function apoyado(puntoActual, figuraId){
        for (let figura of figuras) {
            if (figura.id == figuraId){
                continue;
            }
            for(let punto of figura.puntos){
                if(punto.posicion.includes('techo') && punto.x === puntoActual.x && punto.y === (puntoActual.y+20)){
                    return true;
                }
            }
        }
        return false;
    }

    function apoyadoLateral(puntoActual, figuraId, movX, moverDireccionY){
        let auxY = moverDireccionY ? 20 : 0;
        for (let figura of figuras) {
            if (figura.id == figuraId) {
                continue;
            }
            for (let punto of figura.puntos) {
                if ((movX == -20 && punto.x === (puntoActual.x + movX) && punto.y === (puntoActual.y + auxY))
                    || (movX == 20 && punto.x === (puntoActual.x + movX) && punto.y === (puntoActual.y + auxY))) {
                    return true;
                }
            }
        }
        return false;
    }

    function lineasCompletas(){
        for (let linea = 14; linea >=  0; linea--){
            let lineaCompleta = true;
            for(let columna = 0; columna < 15; columna++){
                if(!posicionOcupada(linea, columna)){
                    lineaCompleta = false;
                    break;
                }
            }
            if(lineaCompleta){
                console.log("Borrar linea");
            }
        }
    }

    function posicionOcupada(linea, columna){
        console.log("*******************");
        const tamaño = 20;
        for (let figura of figuras) {
            for (let punto of figura.puntos){
                console.log("punto.y " + punto.y + " vs linea " + (linea * tamaño));
                console.log("punto.x " + punto.x + " vs columna " + (columna * tamaño));
                if (punto.y == (linea * tamaño) && punto.x == (columna * tamaño)) {
                    return true;
                }
            }
        }
        return false;
    }

    $(document).keydown(function (e) {
        const teclaPulsada = e.which;
        switch(teclaPulsada){
            // derecha
            case BOTON.DERECHA: direccion = teclaPulsada; break; 
            // izquierda 
            case BOTON.IZQUIERDA: direccion = teclaPulsada; break;
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