const previousValueElement = document.querySelector('.previous-value')
const currentValueElement = document.querySelector('.current-value')
const clearBtn = document.querySelector('[data-clear]')
const deleteBtn = document.querySelector('[data-delete]')
const equalsBtn = document.querySelector('[data-equals]')
const digitBtns = document.querySelectorAll('[data-digit]')
const operatorBtns = document.querySelectorAll('[data-operator]')

class Calculator {
    constructor(previousValueElement, currentValueElement) {
        this.previousValueElement = previousValueElement
        this.currentValueElement = currentValueElement
        this.clear()
    }

    clear() {
        this.operator = undefined
        this.previousValue = ''
        this.currentValue = ''
    }

    delete() {
        this.currentValue = this.currentValue.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentValue.includes('.')) return;
        this.currentValue = this.currentValue.toString() + number.toString()
    }

    selectOperation(operator) {
        if (this.previousValue !== '') {
            this.compute()
        }
        this.operator = operator
        this.previousValue = this.currentValue
        this.currentValue = ''
    }

    compute() {
        let result;
        const prev = parseFloat(this.previousValue)
        const current = parseFloat(this.currentValue)
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                result = prev / current;
                break;
            default:
                return;
        }
        this.currentValue = result
        this.operator = undefined
        this.previousValue = ''
    }

    formatNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
    
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString()
        }
        if (!isNaN(decimalDigits)) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay;
        }
    }

    updateDisplay() {
        if (this.operator != null) {
            this.previousValueElement.innerText = `${this.formatNumber(this.previousValue)} ${this.operator}`
        } else {
            this.previousValueElement.innerText = ''
        }
        this.currentValueElement.innerText = this.formatNumber(this.currentValue)
    }
}

const calculator = new Calculator(previousValueElement, currentValueElement)

digitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.appendNumber(btn.innerText)
        calculator.updateDisplay()
    })
})

operatorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.selectOperation(btn.innerText)
        calculator.updateDisplay()
    })
})

equalsBtn.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})