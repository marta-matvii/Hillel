class Calculator {
  add(a, b) {
    return a + b;
  }
  
  subtract(a, b) {
    return a - b;
  }
  
  multiply(a, b) {
    return a * b;
  }
  
  divide(a, b) {
    if (b === 0) {
      return "Error: Cannot divide by zero";
    }
    return a / b;
  }
}

const calc = new Calculator();

console.log(calc.add(5, 3));
console.log(calc.subtract(10, 4));
console.log(calc.multiply(3, 6));
console.log(calc.divide(8, 2));

console.log(calc.divide(10, 0));

const outputElement = document.getElementById('output');

const result1 = document.createTextNode(`5 + 3 = ${calc.add(5, 3)}`);
const br1 = document.createElement('br');
const result2 = document.createTextNode(`10 - 4 = ${calc.subtract(10, 4)}`);
const br2 = document.createElement('br');
const result3 = document.createTextNode(`3 × 6 = ${calc.multiply(3, 6)}`);
const br3 = document.createElement('br');
const result4 = document.createTextNode(`8 ÷ 2 = ${calc.divide(8, 2)}`);
const br4 = document.createElement('br');
const result5 = document.createTextNode(`10 ÷ 0 = ${calc.divide(10, 0)}`);

outputElement.appendChild(result1);
outputElement.appendChild(br1);
outputElement.appendChild(result2);
outputElement.appendChild(br2);
outputElement.appendChild(result3);
outputElement.appendChild(br3);
outputElement.appendChild(result4);
outputElement.appendChild(br4);
outputElement.appendChild(result5);