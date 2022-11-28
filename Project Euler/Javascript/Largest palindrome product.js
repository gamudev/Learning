/* A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91 × 99.
Find the largest palindrome made from the product of two 3-digit numbers. */

function main(){
    const MAX_NUMBER = 999;
    let palindromic = 0;
    for (let i = MAX_NUMBER; i > 0; i--) {
        for (let j = MAX_NUMBER; j > 0; j--) {
            if (isPalindromic(i * j) && (i * j) > palindromic){
                palindromic = i * j;
            }
        }
    }
    console.log("Palindromic number: " + palindromic);
} 

function isPalindromic(num){
    let numArray = Array.from(num.toString());
    const size = Math.trunc(numArray.length/2);
    for (let i = 0; i < size;i++){
        if (numArray[i] != numArray[numArray.length - 1 - i]){
            return false;
        }
    }
    return true;
}


main();
