const calculator = {
  displayValue: "0",
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

const inputDigit = (digit) => {
  const displayValue = calculator.displayValue;
  const waitingForSecondOperand = calculator.waitingForSecondOperand;

  if (waitingForSecondOperand) {
    calculator.displayValue = digit;
    calculator.waitingForSecondOperand = false;
    return;
  }

  calculator.displayValue = displayValue === "0" ? digit : displayValue + digit;
};

const inputDecimal = (dot) => {
  if (calculator.waitingForSecondOperand === true) {
    calculator.displayValue = "0.";
    calculator.waitingForSecondOperand = false;
    return;
  }

  if (!calculator.displayValue.includes(dot)) calculator.displayValue += dot;
};

const handleOperator = (nextOperator) => {
  const firstOperand = calculator.firstOperand;
  const displayValue = calculator.displayValue;
  const operator = calculator.operator;

  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand)
    calculator.operator = nextOperator;

  if (firstOperand === null && !isNaN(inputValue)) {
    calculator.firstOperand = inputValue;
  } else if (operator) {
    const result = operate(firstOperand, inputValue, operator);

    calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
    calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;
};

const operate = (firstOperand, secondOperand, operator) => {
  if (operator === "+") {
    return firstOperand + secondOperand;
  } else if (operator === "-") {
    return firstOperand - secondOperand;
  } else if (operator === "*") {
    return firstOperand * secondOperand;
  } else if (operator === "/") {
    if (secondOperand === 0) {
      alert("Cannot divide by 0");
      return firstOperand;
    }
    return firstOperand / secondOperand;
  }

  return secondOperand;
};

const resetCalculator = () => {
  calculator.displayValue = "0";
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
};

const deleteDigit = () => {
  const displayValue = calculator.displayValue;
  const newNumber = displayValue.toString().slice(0, -1);

  newNumber
    ? (calculator.displayValue = newNumber)
    : (calculator.displayValue = "0");
};

const updateDisplay = () => {
  const display = document.querySelector(".displayCalculator");
  display.value = calculator.displayValue;
};

updateDisplay();

const buttons = document.querySelector(".buttons");

buttons.addEventListener("click", (event) => {
  const target = event.target;
  const value = event.target.value;

  if (!target.matches("button")) {
    return;
  }

  if (
    value === "+" ||
    value === "-" ||
    value === "*" ||
    value === "/" ||
    value === "="
  ) {
    handleOperator(value);
  } else if (value === ".") {
    inputDecimal(value);
  } else if (value === "del") {
    deleteDigit();
  } else if (value === "all-clear") {
    resetCalculator();
  } else {
    if (Number.isInteger(parseFloat(value))) {
      inputDigit(value);
    }
  }

  updateDisplay();
});

document.onkeydown = function (event) {
  const key = event.key;
  console.log(key);
  const isNumber = isFinite(event.key);
  const isOperator =
    key === "+" ||
    key === "-" ||
    key === "*" ||
    key === "/" ||
    key === "=" ||
    key === "Enter";
  const isDecimal = key === ".";
  const isDelete = key === "Backspace";
  const isClear = key === "Escape";

  if (isNumber) {
    inputDigit(key);
  } else if (isOperator) {
    handleOperator(key);
  } else if (isDecimal) {
    inputDecimal(key);
  } else if (isDelete) {
    deleteDigit();
  } else if (isClear) {
    resetCalculator();
  }

  updateDisplay();
};
