/*
A Pythagorean triplet is a set of three natural numbers, a < b < c, for which,

a^2 + b^2 = c^2
For example, 3^2 + 4^2 = 9 + 16 = 25 = 5^2.

There exists exactly one Pythagorean triplet for which a + b + c = 1000.
Find the product abc.
*/

const TOTAL_SUM = 1000;

let notFound = true;
let a = 1, b = 1, c = 1;
while(notFound){
    if (Math.pow(a, 2) + Math.pow(b, 2) == Math.pow(c, 2) && a + b + c == 1000){
        notFound = false;
    } else {
        a++;
        if(a == 1000){
            a=1;
            b++;
        }
        if(b == 1000){
            b=1;
            c++;
        }
    }

}
console.log("Resultado: a " + a + " - b " + b + " - c " + c);
console.log("Producto: " + (a*b*c));