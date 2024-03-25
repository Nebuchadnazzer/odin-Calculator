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
    return result
}

let displayValue = '';
let digitValue = '';
let results = 0;

const operators = [];
const variables = [];

let displayBox = document.querySelector('#display-box');
const digitButtons = document.querySelectorAll('#button-digits button');
const operatorButtons = document.querySelectorAll('#button-operators button');
const operateButton = document.querySelector('#operator-equals');
const clearButton = document.querySelector('#button-clear');
const decimalButton = document.querySelector('#button-decimal');
const backspaceButton = document.querySelector('#button-backspace');

function updateDisplay(button) {
    if (!isNaN(button)) {
        displayValue += button;
    } else if (['.'].includes(button)) {
        displayValue += button;
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

function handleDigitButton(button) {
    if (!isNaN(button.textContent) ){
        digitValue += button.textContent;
        updateDisplay(button.textContent);
}}

function handleOperatorButtons(button) {
    storeDigits();
    operators.push(button.textContent)
    updateDisplay(button.textContent);
    decimalButton.disabled = false;
}

function handleOperateButton(button) {
    storeDigits();
    results = operate(variables, operators);
    updateDisplay(button.textContent);
}

function handleDecimalButton(button) {
    if (displayValue !== ''){
        digitValue += button.textContent;
        updateDisplay(button.textContent);
        button.disabled = true;
    }
}

function handleClearButton() {
    displayValue = '';
    digitValue = '';
    results = 0;
    operators.length = 0;
    variables.length = 0;
    displayBox.textContent = '';
}

function handleBackSpaceButton() {
    displayValue = displayValue.slice(0, -1)
    updateDisplay();
}

digitButtons.forEach(button => {
    button.addEventListener('click', function() {
        handleDigitButton(button);
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', function() {
        handleOperatorButtons(button);
    });
});

operateButton.addEventListener('click', function() {
    handleOperateButton(operateButton);
});

decimalButton.addEventListener('click', function() {
    handleDecimalButton(decimalButton);
});

clearButton.addEventListener('click', function() {
    handleClearButton();
});

backspaceButton.addEventListener('click', function() {
    handleBackSpaceButton();
});

// Keydown event listener
document.addEventListener('keydown', function(event) {
    const key = event.key;

    // Handle digit buttons (0-9)
    if (!isNaN(key)) {
        const digitButton = document.querySelector(`#digit-${key}`);
        // digit key only works when its console logged ??
        console.log(`#digit-${key}`);
        if (digitButton) {
            handleDigitButton(digitButton);
        }
    }
    // Handle operator buttons (+, -, *, /)
    else if (['+', '-', '*', '/'].includes(key)) {
        let selector;
        switch (key) {
            case '+':
                selector = 'add'
                break;
            case '-':
                selector = 'subtract'
                break;
            case '*':
                selector = 'multiply'
                break;
            case '/':
                selector = 'divide'
                break;
        }
        const operatorButton = document.querySelector(`#operator-${selector}`);
        if (operatorButton) {
            handleOperatorButtons(operatorButton);
        }
    }
    else if (key === '=') {
        handleOperateButton(operateButton);
    }
    else if (key === '.') {
        handleDecimalButton(decimalButton);
    }
    else if (key === 'c' || key === 'C') {
        handleClearButton();
    }
    else if (key === 'Backspace') {
        handleBackSpaceButton();
    }
});