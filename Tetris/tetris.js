$(document).ready(function () {

    let juego = $("#juego")[0];
    let context = juego.getContext("2d");
    let continuar = true;

    const FORMA = {
        I:1,
        O:2,
        T:3,
        S:4,
        Z:5,
        J:6,
        L:7
    }

    iniciarJuego();

    function iniciarJuego(){
        nuevaPieza();
    }

    function nuevaPieza(){
        while(continuar){
            let forma = Math.round(Math.random() * 7);
            let posicion = 1;
            pintarForma(forma, posicion);
            mover(forma, posicion);
        }
    }

    function mover(forma, posicion){
        posicion++;
        pintarForma(forma, posicion);
        if(colocada()){
            return;
        } else {
            mover(forma, posicion);
        }
    }

    function colocada(){
        return true;
    }

    function pintarForma(forma, posicion){
        switch(forma){
            case 1: pintarI(posicion);break;
            case 1: pintarI(posicion);break;
            case 2: pintarO(posicion);break;
            case 3: pintarT(posicion);break;
            case 4: pintarS(posicion);break;
            case 5: pintarZ(posicion);break;
            case 6: pintarJ(posicion);break;
            case 7: pintarL(posicion);break;
        }
    }

    function pintarI(posicion){
        const puntos = [{ x: 140, y: 5 },{ x: 140, y: 25 },{ x: 140, y: 45 }]
        pintar(puntos, posicion);
    }

    function pintarT(posicion){
        const puntos = [{ x: 120, y: 5 }, { x: 140, y: 5 }, { x: 160, y: 5 }, { x: 140, y: 25 }]
        pintar(puntos, posicion);
    }

    function pintarO(posicion) {
        const puntos = [{ x: 120, y: 5 }, { x: 140, y: 5 }, { x: 120, y: 25 }, { x: 140, y: 25 }]
        pintar(puntos), posicion;
    }
    
    function pintarS(posicion) {
        const puntos = [{ x: 120, y: 25 }, { x: 120, y: 45 }, { x: 140, y: 5 }, { x: 140, y: 25 }]
        pintar(puntos, posicion);
    }

    function pintarZ(posicion){
        const puntos = [{ x: 120, y: 5 }, { x: 140, y: 5 }, { x: 140, y: 25 }, { x: 160, y: 25 }]
        pintar(puntos, posicion);
    }

    function pintarJ(posicion){
        const puntos = [{x:140,y:5},{x:140,y:25},{x:140,y:45},{x:120,y:45}]
        pintar(puntos, posicion);
    }
    
    function pintarL() {
        const puntos = [{ x: 140, y: 5 }, { x: 140, y: 25 }, { x: 140, y: 45 }, { x: 160, y: 45 }]
        pintar(puntos);
    }

    function pintar(puntos, posicion){
        context.beginPath();
        context.fillStyle = "#000000";
        for (let punto of puntos) {
            context.fillRect(punto.x, punto.y + (posicion * 20), 20, 20);
        }
        context.stroke();
    }
});