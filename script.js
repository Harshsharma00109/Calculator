let display = document.getElementById("display");

function append(value) {
  let current = display.innerText;

  // Prevent double operators
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
}

function deleteLast() {
  display.innerText = display.innerText.slice(0, -1) || "0";
}

function isOperator(c) {
  return ["+", "-", "*", "/", "%"].includes(c);
}

// Big number safe calculation
function calculate() {
  try {
    let expr = display.innerText.replace(/%/g, "/100");

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
