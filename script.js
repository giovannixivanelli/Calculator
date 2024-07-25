let currentInput = "";
let operator = "";
let firstNumber = null;

const display = document.getElementById("display");

document.querySelectorAll(".button").forEach((button) => {
  button.addEventListener("click", () => {
    handleButtonClick(button.innerText);
  });
});

function handleButtonClick(value) {
  if (!isNaN(value) || value === ".") {
    if (value === "." && currentInput === "") {
      currentInput += "0";
    }
    if (currentInput.length < 10) {
      currentInput += value;
      display.innerText = currentInput || "0";
    }
  } else if (value === "AC") {
    resetCalculator();
  } else if (value === "+/-") {
    // Переключаем знак
    if (currentInput) {
      currentInput = (parseFloat(currentInput) * -1).toString();
      display.innerText = currentInput;
    }
  } else if (value === "%") {
    if (currentInput) {
      currentInput = (parseFloat(currentInput) / 100).toString();
      display.innerText = currentInput;
    }
  } else if (value === "=" && currentInput && firstNumber != null) {
    calculate();
  } else {
    if (currentInput) {
      if (firstNumber == null) {
        firstNumber = parseFloat(currentInput);
      } else {
        calculate();
      }
      operator = value;
      currentInput = "";
    }
  }
}

function calculate() {
  if (firstNumber != null && operator && currentInput) {
    let secondNumber = parseFloat(currentInput);
    let result;

    switch (operator) {
      case "+":
        result = firstNumber + secondNumber;
        break;
      case "-":
        result = firstNumber - secondNumber;
        break;
      case "×":
        result = firstNumber * secondNumber;
        break;
      case "÷":
        result = firstNumber / secondNumber;
        break;
      default:
        return;
    }
    if (result.toString().length > 10) {
      result = result.toExponential(2);
    }
    display.innerText = result;
    firstNumber = result;
    currentInput = "";
    operator = "";
  }
}

function resetCalculator() {
  currentInput = "";
  operator = "";
  firstNumber = null;
  display.innerText = "0";
}
