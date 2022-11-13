$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let continuar = true;

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

    iniciarJuego();

    function iniciarJuego(){
        nuevaPieza();
        
    }

    function nuevaPieza(){
        // while(continuar){
            let figura = Math.round(Math.random() * 6);
            let posicion = 1;
            pintarFigura(figura, posicion);
            setTimeout(function () {
                mover(figura, posicion);
                console.log("accede");
            }, 100);
        // }
    }

    function mover(figura, posicion){
        posicion++;
        pintarFigura(figura, posicion);
        setTimeout(function () {
            mover(figura, posicion);
        }, 1000);
        // if(colocada()){
        //     return;
        // } else {
        //     mover(figura, posicion);
        // }
    }

    function colocada(){
        return true;
    }

    function pintarFigura(figura, posicion) {
        console.log(figura);
        switch (figura){
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
        context.beginPath();
        context.fillStyle = "#000000";
        for (let punto of puntos) {
            context.fillRect(punto.x, punto.y + (posicion * 20), 20, 20);
        }
        context.stroke();
    }
});