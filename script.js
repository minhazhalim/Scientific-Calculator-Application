import {Calculator} from './class.js';
const allButtons = document.querySelectorAll('.calculator-grid > button');
const conversion = document.querySelectorAll('.conversion');
const option = document.querySelectorAll('option');
const currentOperand = document.querySelector('.current-operand');
const previousOperand = document.querySelector('.previous-operand');
const ansDisplay = document.querySelector('#answer-display');
const stoDisplay = document.querySelector('#sto-display');
const check = document.querySelector('#check');
const toggler = document.querySelector('#toggler');
const body = document.querySelector('body');
const conversionCtr = document.querySelector('#conversion-ctr');
const button = conversionCtr.querySelector('button');
const historyCtr = document.querySelector('#history-ctr');
const history = historyCtr.querySelector('#history');
const calculator = new Calculator(previousOperand,currentOperand,ansDisplay,stoDisplay,history);
calculator.renderHistory();
button.addEventListener('click',(event) => {
  event.preventDefault();
  let target = event.target;
  let from = target.parentElement.querySelector('select:nth-of-type(1)').value;
  let to = target.parentElement.querySelector('select:nth-of-type(2)').value;
  if(from == to) return;
  calculator.conversion(from + '-' + to);
  calculator.updateDisplay();
});
allButtons.forEach((button) => {
  button.addEventListener('click',(event) => {
    event.preventDefault();
    let target = event.currentTarget;
    if(target.textContent == 'π' || target.textContent == 'e'){
      calculator.clearCurrent();
      if(target.textContent == 'π') calculator.appendNumber((Math.PI).toString());
      else if(target.textContent == 'e') calculator.appendNumber((Math.E).toString());
      calculator.updateDisplay();
      return;
    }
    if(
      target.textContent != Number(target.textContent) &&
      target.textContent != '.' &&
      target.textContent != 'A' &&
      target.textContent != 'B' &&
      target.textContent != 'C' &&
      target.textContent != 'D' &&
      target.textContent != 'E' &&
      target.textContent != 'F'
    ){
      if(target.textContent == '='){
        if(calculator.previousValue != "") calculator.compute();
        calculator.updateDisplay();
      }else{
        if(target.textContent == 'ac'){
          calculator.clear();
        }else if(target.textContent == 'delete'){
          calculator.delete();
        }else if(target.textContent == 'rcl'){
          if(calculator.storage == null) return;
          calculator.clearCurrent();
          calculator.appendNumber(calculator.recall());
        }else if(target.textContent == 'sto'){
          if(currentOperand.textContent == "") return;
          calculator.store(currentOperand.textContent);
          calculator.clearCurrent();
        }else if(target.textContent == 'answer'){
          if(calculator.answer == null) return;
          calculator.clearCurrent();
          calculator.appendNumber(calculator.callPreviousAnswer());
        }else if(target.id == 'y-root-x'){
          if(calculator.currentValue == ""){
            if(calculator.previousValue == "") return;
          }
          calculator.chooseOperation('y√x');
        }else if(target.textContent == 'usehistory'){
          if(history.value == 'empty') return;
          calculator.appendNumber(history.value.split(',').join(""));
        }else{
          if(calculator.currentValue == ""){
            if(
              target.textContent != '+' &&
              target.textContent != '-' &&
              target.textContent != '×' &&
              target.textContent != '÷' &&
              target.textContent != 'xy' &&
              target.textContent != 'y√x'
            ) return;
          }else{
            calculator.chooseOperation(target.textContent);
            calculator.updateDisplay();
            return;
          }
          if(calculator.previousValue != "") calculator.compute();
          calculator.chooseOperation(target.textContent);
        }
        calculator.updateDisplay();
      }
    }else{
      calculator.appendNumber(target.textContent);
      calculator.updateDisplay();
    }
  });
});
function loadColorMode(event) {
  event.preventDefault();
  allButtons.forEach((button) => {
    button.classList.toggle('dark');
    button.classList.toggle('mode');
    button.classList.toggle('switch');
  });
  conversion.forEach((x) => {
    x.classList.toggle('dark');
    x.classList.toggle('mode');
    x.classList.toggle('switch');
  });
  option.forEach((x) => {
    x.classList.toggle('dark');
    x.classList.toggle('mode');
    x.classList.toggle('switch');
  });
  conversionCtr.classList.toggle('dark');
  conversionCtr.classList.toggle('mode');
  conversionCtr.classList.toggle('switch');
  toggler.classList.toggle('dark');
  toggler.classList.toggle('mode');
  toggler.classList.toggle('switch');
  body.classList.toggle('dark');
  body.classList.toggle('mode');
  body.classList.toggle('switch');
  historyCtr.classList.toggle('dark');
  historyCtr.classList.toggle('mode');
  historyCtr.classList.toggle('switch');
  history.classList.toggle('dark');
  history.classList.toggle('mode');
  history.classList.toggle('switch');
}
check.addEventListener('change',loadColorMode);