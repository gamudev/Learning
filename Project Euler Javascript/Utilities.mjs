export function esPrimo(num) {
    for (let i = 2; i < num; i++) {
        if (num % i == 0) {
            return false;
        }
    }
    return true;
}

export function esPrimoOptimizada(num, primosAnteriores) {
    for (let primo of primosAnteriores) {
        if (num % primo == 0) {
            return false;
        }
    }
    return true;
}