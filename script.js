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

let displayBox = document.querySelector('#display-box');
let displayValue = '';
const digitButtons = document.querySelectorAll('#button-digits button');
const operatorButtons = document.querySelectorAll('#button-operators button');

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        displayValue += button.textContent;
        displayBox.textContent = displayValue;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        if (displayValue !== '') {
            displayValue += ' ' + button.textContent + ' ';
        } else {
            displayValue += button.textContent;
        }
        displayBox.textContent = displayValue;
    });
});