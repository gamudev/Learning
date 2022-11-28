/*
    By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.
    What is the 10 001st prime number ?
*/

function prime10001st(){
    let contadorPrimos = 0;
    let actual = 1;
    while(contadorPrimos != 10001){
        actual++;
        if(esPrimo(actual)){
            contadorPrimos++;
        }
    }
    return actual;

    function esPrimo(num) {
        for (let i = 2; i < num; i++) {
            if (num % i == 0) {
                return false;
            }
        }
        return true;
    }
}

console.log(prime10001st());
