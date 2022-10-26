$(".apps > button").click(function(){
    console.log($(this))
    const id = $(this).attr("id");
    console.log(id)
    switch(id){
        case 'buscaminas': 
            $("#iframe-modal").attr("src","../Buscaminas/buscaminas.html");
            break;
        case 'calculadora':
            $("#iframe-modal").attr("src", "../Calculadora/calculadora.html");
            break;
        case 'parejas':
            $("#iframe-modal").attr("src", "../Encuentra Pareja Fruta/encuentraParejaFruta.html");
            break;
        case 'patron': 
            $("#iframe-modal").attr("src", "../Patron desbloqueo/patronDesbloqueo.html");
            break;
        case 'tresenraya':
            $("#iframe-modal").attr("src", "../Tres En Raya/tresEnRaya.html");
            break;
        case 'reloj':
            $("#iframe-modal").attr("src", "../Reloj Digital/relojDigital.html"); 
            break;
    }

    

    // var myModal = document.getElementById('myModal')
    // var myInput = document.getElementById('myInput')

    // myModal.addEventListener('shown.bs.modal', function () {
    //     myInput.focus()
    // })

});


