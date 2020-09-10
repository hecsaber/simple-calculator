// functions

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

function operate(num1, num2, operator) {
    return +operator(num1, num2).toFixed(5);
}

function buttonToFunction() {
    switch (whichFunction) {
        case "add":
            whichFunction = add;
            break;
        case "subtract":
            whichFunction = subtract;
            break;
        case "multiply":
            whichFunction = multiply;
            break;
        case "divide":
            whichFunction = divide;
            break;
        default:
            whichFunction = "";
    }
}

function getSolution() {
    if (whichFunction != undefined) {
        number2 = +displayAdd.textContent;
        if (number2 == 0 && whichFunction == divide) {
            displayAdd.textContent = "error";
        } else {
            const solution = operate(number, number2, whichFunction);
            number = displayAdd.textContent = solution;
            number2 = 0;
        }
        whichFunction = undefined;
        isStart = true;
    }
}

function clear() {
    number = number2 = 0;
    displayAdd.textContent = "";
    whichFunction = undefined;
}

function delLast() {
    if (displayAdd.textContent.length > 0) {
        displayAdd.textContent = displayAdd.textContent.slice(0, displayAdd.textContent.length -1);
    }
}

function anyOperation(btnId) {
    if (whichFunction != undefined) {
        getSolution();
    } else {
        number = +displayAdd.textContent;
        isStart = true;
    }
    whichFunction = btnId.id;
    buttonToFunction();
}

function sendToDisplay(btn) {
    if (isStart) {
        if(btn.id === "dot") {
            displayAdd.textContent = 0 + btn.textContent;
        } else {
            displayAdd.textContent = btn.textContent;
        }
        isStart = false;
    } else {
        if (displayAdd.textContent.length < 2 && displayAdd.textContent == 0 && btn.id != "dot") {
            displayAdd.textContent = btn.textContent;
        } else {
            displayAdd.textContent += btn.textContent;
        }
    }
}

// attributes

var number = 0;
var number2 = 0;
var whichFunction;
var isStart = true;

const displayAdd = document.querySelector("#display");
const buttons = document.querySelectorAll(".number");
const equalButton = document.querySelector("#equal");
const clearButton = document.querySelector("#clear");
const backButton = document.querySelector("#backspace");
const specButton = document.querySelectorAll(".specButton");

// events

specButton.forEach(specB => specB.addEventListener("click", function() {
    anyOperation(specB);
}))


equalButton.addEventListener("click", function() {
    getSolution();
})

clearButton.addEventListener("click", function() {
    clear();
})

backButton.addEventListener("click", function() {
    delLast();
})


buttons.forEach(button => button.addEventListener("click", function() {
    if (button.id === "dot" && displayAdd.textContent.includes(".")) {
        return;
    } else {
        sendToDisplay(button);
    }
}))

window.addEventListener("keydown", function(e) {
    const btn = document.querySelector(`button[data-key="${e.keyCode}"]`);
    if (!btn) {
        return;
    }
    if (btn.className == "specButton") {
        console.log(btn.id);
        anyOperation(btn);
    } else if (btn.id == "clear") {
        clear();
    } else if(btn.id == "backspace") {
        delLast();
    } else if (btn.id == "equal") {
        getSolution();
    } else {
        sendToDisplay(btn);
    }
})