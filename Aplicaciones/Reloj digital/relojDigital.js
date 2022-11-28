setInterval(function(){
    let today = new Date();
    $("#now").text(today.toLocaleString().split(",")[1]);
},100);
