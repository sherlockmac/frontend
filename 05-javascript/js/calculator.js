const display = document.getElementById('display');
const MAX_LENGHTH = 15;

const checkLength = () => {
    if(display.value.length >= MAX_LENGHTH) {
        return false;
    }
    return true;
}

const appendNumber = (number) => {
    if(checkLength())
    display.value += number;
}

const appendOperator = (operator) => {
    if(checkLength())
    display.value += operator;
}

const clearDisplay = () => {
    display.value = '';
}

const calculate = () => {
        let displayValue = display.value;
        for (let i = 0; i < displayValue.length; i++) {
            displayValue = displayValue.replace('÷', '/');
            displayValue = displayValue.replace('×', '*');
        };
        let result = eval(displayValue);
        if(result === undefined) {
            return;
        }
        if(result === Infinity) {
            display.value = 'Error';
            return;
        }
        if(display.value === 'Error') {
            return;
        }
        display.value = result;
}

const deleteCharacter = () => {
    display.value = display.value.slice(0, -1);
}