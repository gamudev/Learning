/* 2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.
What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20 ? */

let isSmallestMultiple = false;
let smallestMultiple = 1;
const LIMIT_SUP = 20; 
const LIMIT_INF = 2; 

while (!isDivisibleByRangeOfNumber(smallestMultiple)){
    smallestMultiple++;
}
console.log('Smallest Multiple: ' + smallestMultiple)

function isDivisibleByRangeOfNumber(number){
    for (let value = LIMIT_INF; value < LIMIT_SUP; value++) {
        // console.log("number: " + number + " value: " + value);
        if (number % value != 0) {
            return false;
        }
    }
    return true;
}

