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
function operate(operator, a, b) {
    const options = {
        "+": add,
        "-": subtract,
        "*": multiply,
        "/": divide,
    };

    const result = options[operator](a, b);
    return result;
}

function clear() {
    displayValue.textContent = "";
    //delete math from expression
    delete currentExpression.a;
    delete currentExpression.b;
    delete currentExpression.operator;
    delete currentExpression.result;
    nOperators = 0;
    operatorIndex = 0;
}

function writeValue(value, option = "a") {
    if (option == "w") {
        displayValue.textContent = value;
    } else if (option == "a") {
        displayValue.textContent += value;
    }
}

function parseOperator(operatorString) {
    if (operatorString.match(/\u00f7/)) {
        return "/";
    } else if (operatorString.match(/\u00d7/)) {
        return "*";
    } else {
        return operatorString;
    }
}

function parseInput() {
    let input = displayValue.textContent;
    let groups = input.match(/(\-*\d+)([\u00f7\u00d7+\-])(\-*\d+)/);
    let a = groups ? groups[1] : null;
    let b = groups ? groups[3] : null;
    let op = groups ? parseOperator(groups[2]) : null;
    if (a) {
        currentExpression.setFirstNumber(a);
    }
    if (b) {
        currentExpression.setSecondNumber(b);
    }
    if (op) {
        currentExpression.setOperator(op);
    }
}

const storedValue = document.querySelector("#display .stored-value");
const displayValue = document.querySelector("#display .current-input");
const numberButtons = document.querySelectorAll(".calculator-grid .number");
const operatorButtons = document.querySelectorAll(".calculator-grid .operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("enter");
const maxOperators = 1;

const currentExpression = {
    setFirstNumber: function (value) {
        this.a = +value;
    },
    setSecondNumber: function (value) {
        this.b = +value;
    },
    setOperator: function (value) {
        this.operator = value;
    },
    evaluateExpression: function () {
        this.result = operate(this.operator, this.a, this.b);
        return this.result;
    },
};

//Clear the display
clearButton.addEventListener("click", () => {
    clear();
});

equalsButton.addEventListener("click", () => {
    let result = currentExpression.evaluateExpression();
    writeValue(result, "w");
});

numberButtons.forEach((number) => {
    number.addEventListener("click", () => {
        let value = number.getAttribute("data-value");
        writeValue(value);
        parseInput();
        console.table(currentExpression)
        
    });
});

operatorButtons.forEach((operator) => {
    operator.addEventListener("click", () => {
        let opString = operator.textContent;        
        writeValue(opString);
        parseInput();
        console.table(currentExpression)
    });
});
