/* 
The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.
Find the sum of all the primes below two million.
*/

import { esPrimoOptimizada } from './Utilities.mjs';

const MAX_SIZE_PRIME = 2_000_000;

let num = 2;
let sum = 0;
let primos = []
while (num < MAX_SIZE_PRIME){
    if (esPrimoOptimizada(num,primos)){
        sum += num;
        primos.push(num); 
    }
    num++;
}
console.log(sum)

