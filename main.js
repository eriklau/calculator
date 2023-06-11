// declare const variables
const button = document.querySelectorAll('button')
let currentDisplayValue = '0';
let firstNumber = null;
let secondNumber = null;
let firstOperation = null;
let secondOperation = null;
let result = null;

// arithmetic operations
function operate(operation, a, b) {
    if (operation === '+') {
        return a+b
    } else if (operation === '-') {
        return a-b
    } else if (operation === '*') {
        return a*b
    } else if (operation === '/' && b === 0) {
        return 'ERROR'
    } else if (operation === '/') {
        return a/b
    } 
}

// display functionality 
function changeDisplayValue() {
    document.getElementById('screen').textContent = currentDisplayValue;
    // max 9 numbers displayed on screen
    if(currentDisplayValue.length > 9) {
        document.getElementById('screen').textContent = currentDisplayValue.substring(0, 13);
    }
}

function buttonClick() {
    for (let i=0; i < button.length; i++) {
        button[i].addEventListener('click', function() {
            if (button[i].classList.contains('numberbutton')) {
                numberInput(button[i].value);
                changeDisplayValue();
            } else if(button[i].classList.contains('operationbutton')) {
                operationInput(button[i].value);
            } else if(button[i].classList.contains('equalbutton')) {
                equalInput();
                changeDisplayValue();
            } else if(button[i].classList.contains('decimalbutton')) {
                decimalInput(button[i].value);
                changeDisplayValue();
            } else if(button[i].classList.contains('deletebutton')) {
                deleteInput();
                changeDisplayValue();
            } else if(button[i].classList.contains('signbutton')) {
                signInput();
                changeDisplayValue();
            } else if(button[i].classList.contains('clearbutton')) {
                clearDisplay();
                changeDisplayValue();
            } else if(button[i].classList.contains('sqrtbutton')) {
                squareRootInput();
                changeDisplayValue();
            }
        }
    )}
}

function numberInput(number) {
    if (firstOperation === null) {
        // if starting value is 0 just replace with new number: 0 -> 3
        if (currentDisplayValue === '0') {
            currentDisplayValue = number;
        } else if (currentDisplayValue === firstNumber) {
            // new operation after equal button is clicked: 1+2=3, click 2 then display is 2
            currentDisplayValue = number;
        } else {
            // otherwise append number as usual if more than 2 digits: 999
            currentDisplayValue += number;
        }
    }
    // if first operation is not null: 0 + _ 
    else {
        if (currentDisplayValue === firstNumber) {
            // the "second" number clicked after an operation: 0 + 1, then 1 is displayed
            currentDisplayValue = number;
        } else {
            // the "second" number clicked after an operation more than 2 digits: 0 + 99, then 9 will appear first, and 9 is appended to the string 99
            currentDisplayValue += number;
        }
    }
}

function operationInput(operation) {
    if (firstOperation != null && secondOperation === null) {
        // the second operation after 2 sets of numbers are calculated: (1+2) (nextoperation) 
        secondOperation = operation;
        secondNumber = currentDisplayValue;
        // firstoperation, firstnumber, secondnumber, already stored, just need to calculate its result to continue with second operation
        result = operate(firstOperation, Number(firstNumber), Number(secondNumber));
        currentDisplayValue = result.toString();
        firstNumber = currentDisplayValue;
        result = null;
    } else if (firstOperation != null && secondOperation != null) {
        // ex: (1+2) + next number
        secondNumber = currentDisplayValue;
        result = operate(secondOperation, Number(firstNumber), Number(secondNumber));
        secondOperation = operation;
        currentDisplayValue = result.toString();
        result = null;
    } else {
        // no operations have been clicked yet, or they have been reset
        firstOperation = operation;
        firstNumber = currentDisplayValue;
    }
}

function deleteInput() {
    if (currentDisplayValue.length > 1) {
        currentDisplayValue = currentDisplayValue.slice(0,-1);
    } 
}

function decimalInput(x) {
    if (currentDisplayValue === firstNumber || currentDisplayValue === secondNumber) {
        currentDisplayValue = '0';
        currentDisplayValue += x;
    }   else if (!currentDisplayValue.includes(x)) {
        currentDisplayValue += x;
    }
}

function signInput() {
    currentDisplayValue = (currentDisplayValue*-1).toString();
}

function squareRootInput() {
    if (currentDisplayValue[0] === '-') {
        currentDisplayValue = 'ERROR';
    } else {
        currentDisplayValue = (Math.sqrt(Number(currentDisplayValue))).toString();
    }
}

function equalInput() {
    if (secondOperation != null) {
        secondNumber = currentDisplayValue;
        result = operate(secondOperation, Number(firstNumber), Number(secondNumber));
        if (result === 'ERROR') {
            currentDisplayValue = 'ERROR';
        } else {
            currentDisplayValue = result.toString();
            firstNumber = currentDisplayValue;
            secondNumber = null;
            firstOperation = null;
            secondOperation = null;
            result = null;
        }
    }   else {
            secondNumber= currentDisplayValue;
            result = operate(firstOperation, Number(firstNumber), Number(secondNumber));
            if(result === 'ERROR') {
                currentDisplayValue = 'ERROR';
            } else {
                currentDisplayValue = result.toString();
                firstNumber = currentDisplayValue;
                secondNumber = null;
                firstOperation = null;
                secondOperation = null;
                result = null;
        } 
    }
}

function clearDisplay() {
    currentDisplayValue = '0';
    firstNumber = null;
    secondNumber = null;
    firstOperation = null;
    secondOperation = null;
    result = null;
}

changeDisplayValue();
buttonClick();