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

const operate = function (variables, operators) {
    let result = variables[0];
    for (let i = 0; i < operators.length; i++) {
        const operator = operators[i]; 
        const nextVariable = variables[i + 1];
        switch (operator) {
            case '+':
                result = add(result, nextVariable);
                break;
            case '-':
                result = subtract(result, nextVariable);
                break;
            case '*':
                result = multiply(result, nextVariable);
                break;
            case '/':
                result = divide(result, nextVariable);
                break;
        }
    }
    return result;
}

let displayValue = '';
let digitValue = '';
let results;

const operators = [];
const variables = [];

let displayBox = document.querySelector('#display-box');
const digitButtons = document.querySelectorAll('#button-digits button');
const operatorButtons = document.querySelectorAll('#button-operators button');
const operateButton = document.querySelector('#operator-equals');
const clearButton = document.querySelector('#button-clear')

function updateDisplay(button) {
    if (!isNaN(button)) {
        displayValue += button
    } else if (['+', '-', '*', '/'].includes(button)) {
        displayValue +=  ` ${button} `;
    } else if (button === '=' ) {
        const displayResults = hasDecimal(results) ? results.toFixed(4) : results;
        displayValue += ` ${button} ${displayResults}`;
    }
    displayBox.textContent = displayValue;
}

function hasDecimal(num) {
    return num % 1 !==0;
}

function storeDigits() {
    variables.push(parseFloat(digitValue))
    digitValue = '';
}

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        digitValue += button.textContent;
        updateDisplay(button.textContent);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        storeDigits();
        operators.push(button.textContent)
        updateDisplay(button.textContent);
    });
});

operateButton.addEventListener('click', function() {
    storeDigits();
    results = operate(variables, operators);
    updateDisplay(operateButton.textContent);
});

clearButton.addEventListener('click', function() {
    displayValue = '';
    digitValue = '';
    operators.length = 0;
    variables.length = 0;
    displayBox.textContent = '';
});