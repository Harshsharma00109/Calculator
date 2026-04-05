let display = document.getElementById("display");
let history = document.getElementById("history");

function append(value) {
  let current = display.innerText;

  if (isOperator(value) && isOperator(current.slice(-1))) {
    display.innerText = current.slice(0, -1) + value;
    return;
  }

  if (current === "0") {
    display.innerText = value;
  } else {
    display.innerText += value;
  }
}

function clearDisplay() {
  display.innerText = "0";
  history.innerText = "";
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function isOperator(c) {
  return ["+", "-", "*", "/"].includes(c);
}

// 🔥 Scientific functions
function scientific(type) {
  let val = parseFloat(display.innerText);

  switch(type) {
    case "sin": val = Math.sin(val); break;
    case "cos": val = Math.cos(val); break;
    case "tan": val = Math.tan(val); break;
    case "log": val = Math.log10(val); break;
    case "sqrt": val = Math.sqrt(val); break;
    case "square": val = val * val; break;
  }

  display.innerText = val;
}

// 🔥 Big.js calculation
function calculate() {
  try {
    let expr = display.innerText;
    history.innerText = expr;

    let tokens = expr.match(/(\d+\.?\d*|\+|\-|\*|\/)/g);
    let result = new Big(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
      let op = tokens[i];
      let num = new Big(tokens[i + 1]);

      if (op === "+") result = result.plus(num);
      if (op === "-") result = result.minus(num);
      if (op === "*") result = result.times(num);
      if (op === "/") result = result.div(num);
    }

    display.innerText = result.toString();

  } catch {
    display.innerText = "Error";
  }
}

// ⌨️ Keyboard support
document.addEventListener("keydown", (e) => {
  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    append(e.key);
  } else if (e.key === "Enter") {
    calculate();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key === "Escape") {
    clearDisplay();
  }
});