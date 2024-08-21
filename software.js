const input = document.querySelector('.input');
const outputOperation = document.querySelector('.operation .value');
const outputResult = document.querySelector('.result .value');
const scientific = document.querySelector('.scientific');
const normal = document.querySelector('.normal');
const OPERATIONS = ['+','-','*','/'];
const POWER = 'POWER(';
const FACTORIAL = 'FACTORIAL(';
const CUBE = 'CUBE(';
let SCIENTIFIC_MODE = true;
let RADIAN = true;
let answer = 0;
let data = {operation: [],formula: [],};
let calculator_buttons = [
	{
		name: 'radian',
		symbol: 'Radian',
		formula: false,
		type: 'key',
	},
	{
		name: 'degree',
		symbol: 'Degree',
		formula: false,
		type: 'key',
	},
	{
		name: 'cube',
		symbol: 'x³',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'cube-root',
		symbol: '∛',
		formula: 'Math.cbrt',
		type: 'math_function',
	},
	{
		name: 'x-inverse',
		symbol: 'x⁻¹',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'quad',
		symbol: 'x⁴',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'factorial',
		symbol: '×!',
		formula: FACTORIAL,
		type: 'math_function',
	},
	{
		name: 'square-root',
		symbol: '√',
		formula: 'Math.sqrt',
		type: 'math_function',
	},
	{
		name: 'pi',
		symbol: 'π',
		formula: 'Math.PI',
		type: 'number',
	},
	{
		name: 'cos',
		symbol: 'cos',
		formula: 'trigo(Math.cos,',
		type: 'trigo_function',
	},
	{
		name: 'sin',
		symbol: 'sin',
		formula: 'trigo(Math.sin,',
		type: 'trigo_function',
	},
	{
		name: 'tan',
		symbol: 'tan',
		formula: 'trigo(Math.tan,',
		type: 'trigo_function',
	},
	{
		name: 'square',
		symbol: 'x²',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'log',
		symbol: 'log',
		formula: 'Math.log10',
		type: 'math_function',
	},
	{
		name: 'ln',
		symbol: 'ln',
		formula: 'Math.log',
		type: 'math_function',
	},
	{
		name: 'acos',
		symbol: 'acos',
		formula: 'inv_trigo(Math.acos,',
		type: 'trigo_function',
	},
	{
		name: 'asin',
		symbol: 'asin',
		formula: 'inv_trigo(Math.asin,',
		type: 'trigo_function',
	},
	{
		name: 'atan',
		symbol: 'atan',
		formula: 'inv_trigo(Math.atan,',
		type: 'trigo_function',
	},
	{
		name: 'power',
		symbol: 'x<span>y</span>',
		formula: POWER,
		type: 'math_function',
	},
	{
		name: 'e',
		symbol: 'e',
		formula: 'Math.E',
		type: 'number',
	},
	{
		name: 'open-parenthesis',
		symbol: '(',
		formula: '(',
		type: 'number',
	},
	{
		name: 'close-parenthesis',
		symbol: ')',
		formula: ')',
		type: 'number',
	},
	{
		name: 'exp',
		symbol: 'exp',
		formula: 'Math.exp',
		type: 'math_function',
	},
	{
		name: 'ANS',
		symbol: 'ANS',
		formula: 'ans',
		type: 'number',
	},
	{
		name: '7',
		symbol: 7,
		formula: 7,
		type: 'number',
	},
	{
		name: '8',
		symbol: 8,
		formula: 8,
		type: 'number',
	},
	{
		name: '9',
		symbol: 9,
		formula: 9,
		type: 'number',
	},
	{
		name: 'delete',
		symbol: '⌫',
		formula: false,
		type: 'key',
	},
	{
		name: 'clear',
		symbol: 'C',
		formula: false,
		type: 'key',
	},
	{
		name: '4',
		symbol: 4,
		formula: 4,
		type: 'number',
	},
	{
		name: '5',
		symbol: 5,
		formula: 5,
		type: 'number',
	},
	{
		name: '6',
		symbol: 6,
		formula: 6,
		type: 'number',
	},
	{
		name: 'multiplication',
		symbol: '×',
		formula: '*',
		type: 'operator',
	},
	{
		name: 'division',
		symbol: '÷',
		formula: '/',
		type: 'operator',
	},
	{
		name: '1',
		symbol: 1,
		formula: 1,
		type: 'number',
	},
	{
		name: '2',
		symbol: 2,
		formula: 2,
		type: 'number',
	},
	{
		name: '3',
		symbol: 3,
		formula: 3,
		type: 'number',
	},
	{
		name: 'addition',
		symbol: '+',
		formula: '+',
		type: 'operator',
	},
	{
		name: 'subtraction',
		symbol: '–',
		formula: '-',
		type: 'operator',
	},
	{
		name: '0',
		symbol: 0,
		formula: 0,
		type: 'number',
	},
	{
		name: 'comma',
		symbol: '.',
		formula: '.',
		type: 'number',
	},
	{
		name: 'percent',
		symbol: '%',
		formula: '/100',
		type: 'number',
	},
	{
		name: 'calculate',
		symbol: '=',
		formula: '=',
		type: 'calculate',
	},
];
function updateOutputOperation(operation){
     outputOperation.innerHTML = operation;
}
function updateOutputResult(result){
     outputResult.innerHTML = result;
}
function search(formula,keyword){
     let searchResult = [];
     formula.forEach((item,index) => {
          if(item == keyword) searchResult.push(index);
     });
     return searchResult;
}
function showPowerOnUi(data,formula,powerNumber){
     data.operation.push('^(');
     data.formula.push(formula);
     data.operation.push(powerNumber);
     data.formula.push(powerNumber);
}
function trigo(callback,angle){
     if(!RADIAN) angle = (angle * Math.PI) / 100;
     return callback(angle);
}
function inv_trigo(callback,value){
     if(callback.name != 'atan'){
          if(value < -1 || value > 1){
               alert('Please Enter a Number in the Randge Between -1 to 1 of acos');
               return NaN;
          }
     }
     let angle = callback(value);
     if(!RADIAN) angle = (angle * 180) / Math.PI;
     return angle;
}
function gamma(number){
     var g = 7;
     var p = [
          0.99999999999980993,676.5203681218851,-1259.1392167224028,
		771.32342877765313,-176.61502916214059,12.507343278686905,
		-0.13857109526572012,9.9843695780195716e-6,1.5056327351493116e-7,
     ];
     if(number < 0.5) return Math.PI / Math.sin(number * Math.PI) / gamma(1 - number);
     else {
          number--;
          var x = p[0];
          for(var i = 1;i < g + 2;i++){
               x += p[i] / (number + i);
          }
          var t = number + g + 0.5;
          return Math.sqrt(2 * Math.PI) * Math.pow(t,number + 0.5) * Math.exp(-t) * x;
     }
}
function factorial(number){
     if(number % 1 != 0) return gamma(number + 1);
     if(number === 0 || number === 1) return 1;
     let result = 1;
     for(let i = number;i > 0;i--){
          result = result * i;
          if(result === Infinity) return Infinity;
     }
     return result;
}
function createCalculatorButtons(){
     let buttonPerRow = 6;
     let addedButtons = 0;
     calculator_buttons.forEach((button) => {
          if(button.name == 'ANS'){
               buttonPerRow = 5;
               addedButtons++;
               const lastRow = document.querySelector('.row:last-child');
               lastRow.style.marginBottom = '16px';
               const allRow = document.querySelectorAll('.row');
               allRow.forEach((row) => {
                    row.classList.add('advance-keys');
               });
          }
          if(addedButtons % buttonPerRow == 0){
               input.innerHTML += '<div class="row"></div>';
          }
          const row = document.querySelector('.row:last-child');
          row.innerHTML += `<button id="${button.name}">${button.symbol}</button>`;
          addedButtons++;
     });
}
createCalculatorButtons();
function powerBaseGetter(formula,powerIndexes){
     let powerBases = [];
     powerIndexes.forEach((powerIndex) => {
          let base = [];
          let previousIndex = powerIndex - 1;
          let parenthesisCount = 0;
          while(previousIndex >= 0){
               if(formula[previousIndex] == '(') parenthesisCount--;
               if(formula[previousIndex] == ')') parenthesisCount++;
               let isOperator = false;
               OPERATIONS.forEach((operator) => {
                    if(formula[previousIndex] == operator) isOperator = true;
               });
               let isPower = formula[previousIndex] == POWER;
               if((isOperator && parenthesisCount == 0) || isPower) break;
               base.unshift(formula[previousIndex]);
               previousIndex--;
          }
          powerBases.push(base.join(""));
     });
     return powerBases;
}
function factorialNumberGetter(formula,factorialIndexes){
     let factorialNumbers = [];
     let factorialSequence = 0;
     factorialIndexes.forEach((factorialIndex) => {
          let number = [];
          let nextIndex = factorialIndex + 1;
          let nextInput = formula[nextIndex];
          if(nextInput == FACTORIAL){
               factorialSequence++;
               return;
          }
          let firstFactorialIndex = factorialIndex - factorialSequence;
          let previousIndex = firstFactorialIndex - 1;
          let parenthesisCount = 0;
          while(previousIndex >= 0){
               if(formula[previousIndex] == '(') parenthesisCount--;
               if(formula[previousIndex] == ')') parenthesisCount++;
               let isOperator = false;
               OPERATIONS.forEach((operator) => {
                    if(formula[previousIndex] == operator) isOperator = true;
               });
               if(isOperator && parenthesisCount == 0) break;
               number.unshift(formula[previousIndex]);
               previousIndex--;
          }
          let numberString = number.join("");
          const factorial = 'factorial(';
          const closeParenthesis = ')';
          let times = factorialSequence + 1;
          let toReplace = numberString + FACTORIAL.repeat(times);
          let replacement = factorial.repeat(times) + numberString + closeParenthesis.repeat(times);
          factorialNumbers.push({toReplace: toReplace,replacement: replacement,});
          factorialSequence = 0;
     });
     return factorialNumbers;
}
function disableAdvanceKey(){
     const advanceKeys = document.querySelectorAll('.advance-keys');
     advanceKeys.forEach((key) => {
          key.childNodes.forEach((button) => {
               if(!SCIENTIFIC_MODE){
                    button.disabled = true;
               }else{
                    button.disabled = false;
               }
          });
     });
     data.formula = [];
     data.operation = [];
     updateOutputOperation(data.operation.join(""));
     updateOutputOperation(0);
}
const radian = document.getElementById('radian');
radian.classList.add('active-angle');
const degree = document.getElementById('degree');
function angleToggler(){
     radian.classList.toggle('active-angle');
     degree.classList.toggle('active-angle');
}
function calculator(button){
     if(button.type == 'operator'){
          data.operation.push(button.symbol);
          data.formula.push(button.formula);
     }else if(button.type == 'number'){
          data.operation.push(button.symbol);
          data.formula.push(button.formula);
     }else if(button.type == 'trigo_function'){
          data.operation.push(button.symbol + '(');
          data.formula.push(button.formula);
     }else if(button.type == 'math_function'){
          let symbol;
          let formula;
          if(button.name == 'factorial'){
               symbol = '!';
               formula = button.formula;
               data.operation.push(symbol);
               data.formula.push(formula);
          }else if(button.name == 'power'){
               symbol = '^(';
               formula = button.formula;
               data.operation.push(symbol);
               data.formula.push(formula);
          }else if(button.name == 'square'){
               showPowerOnUi(data,button.formula,2);
          }else if(button.name == 'cube'){
               showPowerOnUi(data,button.formula,3);
          }else if(button.name == 'quad'){
               showPowerOnUi(data,button.formula,4);
          }else if(button.name == 'x-inverse'){
               showPowerOnUi(data,button.formula,-1);
          }else{
               symbol = button.symbol + '(';
               formula = button.formula + '(';
               data.operation.push(symbol);
               data.formula.push(formula);
          }
     }else if(button.type == 'key'){
          if(button.name == 'clear'){
               data.operation = [];
               data.formula = [];
               updateOutputResult(0);
          }else if(button.name == 'delete'){
               data.operation.pop();
               data.formula.pop();
          }else if(button.name == 'radian'){
               RADIAN = true;
               angleToggler();
          }else if(button.name == 'degree'){
               RADIAN = false;
               angleToggler();
          }
     }else if(button.type == 'calculate'){
          let formulaString = data.formula.join("");
          let powerSearchResult = search(data.formula,POWER);
          let factorialSearchResult = search(data.formula,FACTORIAL);
          let bases = powerBaseGetter(data.formula,powerSearchResult);
          bases.forEach((base) => {
               let toReplace = base + POWER;
               let replacement = 'Math.pow(' + base + ',';
               formulaString = formulaString.replace(toReplace,replacement);
          });
          const factorialNumbers = factorialNumberGetter(data.formula,factorialSearchResult);
          factorialNumbers.forEach((factorial) => {
               formulaString = formulaString.replace(factorial.toReplace,factorial.replacement);
          });
          let result;
          try {
               result = eval(formulaString);
          }catch(error){
               if(error instanceof SyntaxError){
                    result = 'Syntax Error';
                    updateOutputResult(result);
                    return;
               }
          }
          answer = result;
          data.operation = [result];
          data.formula = [result];
          updateOutputResult(result);
          return;
     }
     updateOutputOperation(data.operation.join(""));
}
input.addEventListener('click',(event) => {
     const targetButton = event.target;
     calculator_buttons.forEach((button) => {
          if(button.name == targetButton.id) calculator(button);
     });
});
scientific.classList.add('active-calculation');
scientific.addEventListener('click',() => {
     SCIENTIFIC_MODE = true;
     scientific.classList.add('active-calculation');
     normal.classList.remove('active-calculation');
     disableAdvanceKey();
});
normal.addEventListener('click',() => {
     SCIENTIFIC_MODE = false;
     scientific.classList.remove('active-calculation');
     normal.classList.add('active-calculation');
     disableAdvanceKey();
});