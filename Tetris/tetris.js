$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let fin = false;
    let direccion = '';
    let figuras = [];
    let siguienteFigura = false;
    let numFiguras = 0;

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
    }

    iniciarJuego();

    function iniciarJuego(){
        // while(fin != true){
        nuevaPieza(); 
        // }
    }

    function nuevaPieza(){
        let tipoFigura = Math.round(Math.random() * 6);
        let figura = crearFigura(tipoFigura);
        figuras.push(figura);
        mover(figura);
    }

    function mover(nuevaFigura){
        context.clearRect(0, 0, 300, 300);
        for(let figura of figuras){
            pintarFigura(figura);
        }
        setTimeout(function () {
            if (siguienteFigura == false) {
                mover(nuevaFigura);
            } else {
                // nuevaPieza();
            }
        }, 200);
    }

    function crearFigura(tipoFigura) {
        switch (tipoFigura){
            // figura I
            case 0: puntos = [POS.abajoCen,POS.medioCen,POS.arribaCen];break;
            // figura T
            case 1: puntos = [POS.arribaIzq, POS.arribaCen, POS.arribaDer, POS.medioCen]; break;
            // figura O
            case 2: puntos = [POS.arribaCen, POS.arribaDer, POS.medioCen, POS.medioDer]; break;
            // figura S
            case 3: puntos = [POS.medioIzq, POS.medioCen, POS.arribaCen, POS.arribaDer]; break;
            // figura Z
            case 4: puntos = [POS.arribaIzq, POS.arribaCen, POS.medioCen, POS.medioDer]; break;
            // figura J
            case 5: puntos = [POS.arribaCen, POS.medioCen, POS.abajoCen, POS.abajoIzq]; break;
            // figura L
            case 6: puntos = [POS.arribaCen, POS.medioCen, POS.abajoCen, POS.abajoDer]; break;
        }
        return {tipoFigura, puntos};
    }

    function pintarFigura(figura){
        if (direccion === BOTON.IZQUIERDA) {
            movX = -20;
            direccion = '';
        } else if (direccion === BOTON.DERECHA){
            movX = 20;
            direccion = '';
        } else {
            movX = 0;
        }
        context.beginPath();
        context.fillStyle = "#000000";
        let moverDireccionY = true, moverDireccionX = true;
        for (let punto of figura.puntos) {
            if ((punto.y + 20) > 300) {
                moverDireccionY = false;
                siguienteFigura = true;
            }
            if ((punto.x + movX) < 0 || (punto.x + movX) > 280){
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
        }
        context.stroke();
    }

    $(document).keydown(function (e) {
        const teclaPulsada = e.which;
        switch(teclaPulsada){
            // derecha
            case BOTON.DERECHA: direccion = teclaPulsada; break; 
            // izquierda 
            case BOTON.IZQUIERDA: direccion = teclaPulsada; break;
        }
    });


});