let variableX;
let variableY;
let operator;

const add = function (x, y) {
    return x + y;
}

const subtract = function (x, y) {
    return x - y;
}

const multiply = function (x, y) {
    return x * y;
}

const divide = function (x, y) {
    return x / y;
}

const operate = function (operator, variableX, variableY) {
    switch (operator) {
        case '+':
            add(variableX, variableY);
            break;
        case '-':
            subtract(variableX, variableY);
            break;
        case '*':
            multiply(variableX, variableY);
            break;
        case '/':
            divide(variableX, variableY);
            break;
    }
}