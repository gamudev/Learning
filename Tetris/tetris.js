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
        let tipoFigura = Math.round(Math.random() * 6);
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
            if (nuevaFigura.siguienteFigura == true) {
                nuevaPieza();
            } else if (pause == true){
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
        if(figura.siguienteFigura == true){
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
            if (movX != 0 && ((punto.x + movX) < 0 || (punto.x + movX) > 280 || apoyadoLateral(punto, figura.id, movX))) {
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

    function apoyadoLateral(puntoActual, figuraId, movX){
        for (let figura of figuras) {
            if (figura.id == figuraId) {
                continue;
            }
            for (let punto of figura.puntos) {
                if ((movX == -20 && punto.posicion.includes('derecha') && puntoActual.posicion.includes('izquierda') && punto.x === (puntoActual.x+movX) && punto.y === puntoActual.y)
                    || (movX == 20 && punto.posicion.includes('izquierda') && puntoActual.posicion.includes('derecha') && punto.x === (puntoActual.x+movX) && punto.y === puntoActual.y)) {
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