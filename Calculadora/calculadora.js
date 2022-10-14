
let value1 = '';
let value2 = '';
let operation = '';

$(".number").click(function(){
    if (operation == ''){
        value1 += $(this)[0].innerHTML;
        $("#resultado").val(value1);
    } else {
        value2 += $(this)[0].innerHTML;
        $("#resultado").val(value2);
    }
}); 

$(".operation").click(function(){
    if (operation == '' && $(this)[0].innerHTML != 'C'){
        operation = $(this)[0].innerHTML;
    } else {
        $("#resultado").val(calculate());
        clear();
    }
});

function calculate(){
    let number1 = parseInt(value1) ;
    let number2 = parseInt(value2) ;
    switch(operation){
        case '+': return (number1 + number2);
        case '-': return (number1 - number2);
        case '*': return (number1 * number2);
        case '/': return parseInt(number1 / number2);
        case 'C':
            $("#resultado").val('');
            clear(); break;
    }
    return '';
}

function clear(){
    value1 = '';
    value2 = '';
    operation = '';
}