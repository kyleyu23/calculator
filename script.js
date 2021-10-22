class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        //initialize
        this.clear();
    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operater = '';
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperater(operater) {
        if (this.currentOperand === '') return;
        if (this.operater !== '') this.compute();
        this.operater = operater;
        this.previousOperand = this.currentOperand
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operater) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation;
        this.previousOperand = '';
        this.operater = '';
    }
    getDisplayNumber(number) {
        //split "123.456"
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];

        //concat integer and decimals
        let integerDisplay;
        if (isNaN(integerDigits)) integerDisplay = '';
        else {
            integerDisplay = integerDigits.toLocaleString('en');
        }
        return decimalDigits != null ? `${integerDisplay}.${decimalDigits}` : integerDisplay;

        /*
        //works but has problems with decimals
        const floatNumber = parseFloat(number);
        if ((isNaN(floatNumber))) return '';
        return floatNumber.toLocaleString('en');
        */
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operater != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operater}`
        }
    }
}
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const numberButtons = document.querySelectorAll('[data-number]');
const operaterButtons = document.querySelectorAll('[data-operater]');
const equalsButton = document.querySelector('[data-equals');

operaterButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperater(button.innerText);
        calculator.updateDisplay()
    })
})
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay();
})
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);