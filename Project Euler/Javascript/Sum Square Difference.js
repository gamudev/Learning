/* Find the difference between the sum of the squares of the first one hundred natural numbers 
and the square of the sum. */

const SIZE = 100;
let sumOfQuares = 0;
let squareOfSum = 0;

for(let i = 1 ; i <= SIZE ; i++){
    sumOfQuares += i**2;
    squareOfSum += i;
}

squareOfSum = squareOfSum**2;;

let sumSquareDifference = squareOfSum - sumOfQuares
console.log("Sum square difference: " + sumSquareDifference);
