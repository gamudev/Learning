/* The prime factors of 13195 are 5, 7, 13 and 29.
What is the largest prime factor of the number 600851475143 ? */


main();

function main(){
    const num = 600851475143;
    var mayorPrimo = 0;
    for (let i = 2; i < num; i++) {
        if (num % i == 0 && esPrimo(i)) {
            mayorPrimo = i;
        }
    }
    console.log(mayorPrimo);
}


function esPrimo(num){
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}