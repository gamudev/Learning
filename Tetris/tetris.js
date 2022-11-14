$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let direccion = '';
    let figuras = [];

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

    const COLOR = ['red','blue','yellow','white','orange','green'];

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
                return;
            } else {
                mover(nuevaFigura);
            }
        }, 200);
    }

    function crearFigura(tipoFigura) {
        switch (tipoFigura){
            // figura I
            case 0: tipoFigura = 'I'; puntos = [{ ...POS.abajoCen }, { ...POS.medioCen }, { ...POS.arribaCen }];break;
            // figura T
            case 1: tipoFigura = 'T'; puntos = [{ ...POS.arribaIzq }, { ...POS.arribaCen }, { ...POS.arribaDer }, { ...POS.medioCen }]; break;
            // figura O
            case 2: tipoFigura = 'O'; puntos = [{ ...POS.arribaCen }, { ...POS.arribaDer }, { ...POS.medioCen }, { ...POS.medioDer }]; break;
            // figura S
            case 3: tipoFigura = 'S'; puntos = [{ ...POS.medioIzq }, { ...POS.medioCen }, { ...POS.arribaCen }, { ...POS.arribaDer }]; break;
            // figura Z
            case 4: tipoFigura = 'Z'; puntos = [{ ...POS.arribaIzq }, { ...POS.arribaCen }, { ...POS.medioCen }, { ...POS.medioDer }]; break;
            // figura J
            case 5: tipoFigura = 'J'; puntos = [{ ...POS.arribaCen }, { ...POS.medioCen }, { ...POS.abajoCen }, { ...POS.abajoIzq }]; break;
            // figura L
            case 6: tipoFigura = 'L'; puntos = [{ ...POS.arribaCen }, { ...POS.medioCen }, { ...POS.abajoCen }, { ...POS.abajoDer }]; break;
        }
        return { tipoFigura, puntos, siguienteFigura: false, color: COLOR[Math.round(Math.random() * 6)] };
    }

    function pintarFigura(figura){
        context.beginPath();
        context.fillStyle = figura.color;
        if(figura.siguienteFigura == true){
            for (let punto of figura.puntos) {
                context.fillRect(punto.x, punto.y, 20, 20);
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
            if ((punto.y + 20) > 300) {
                moverDireccionY = false;
                figura.siguienteFigura = true;
            }
            if ((punto.x + movX) < 0 || (punto.x + movX) > 280) {
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