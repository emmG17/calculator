// Basic math operations available to users
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

// Perform operation between two numbers
function operate (operator, a, b) {
    const options  = {
        '+': add,
        '-': subtract,
        '*': multiply,
        '/': divide
    }

    const result = options[operator](a, b);
    return result;
}