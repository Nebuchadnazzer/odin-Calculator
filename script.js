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

const operate = function (operator, ...variables) {
    switch (operator) {
        case '+':
            return add(...variables);
        case '-':
            return subtract(...variables);
        case '*':
            return multiply(...variables);
        case '/':
            return divide(...variables);
    }
}

let displayValue = '';
let digitValue = '';
let numberValue = 0;
const operators = [];
const variables = [];
const displayResults = 0;

let displayBox = document.querySelector('#display-box');
const digitButtons = document.querySelectorAll('#button-digits button');
const operatorButtons = document.querySelectorAll('#button-operators button');
const operateButton = document.querySelector('#operator-equals');

function updateDisplay(button) {
    if (!isNaN(button)) {
        displayValue += button
    } else if (button === '+' || button === '-' || button === '*' || button === '/') {
        displayValue += ' ' + button + ' ';
    } else if (button === '=' ) {
        displayValue += ' ' + button;
    }
    displayBox.textContent = displayValue;
}

function storeDigits() {
    variables.push(parseFloat(digitValue))
    digitValue = '';
}

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        updateDisplay(button.textContent);
        digitValue += button.textContent;
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        updateDisplay(button.textContent);
        storeDigits();
        operators.push(button.textContent) // Store operators
    });
});

operateButton.addEventListener('click', function() {
    updateDisplay(operateButton.textContent);
    storeDigits();
});