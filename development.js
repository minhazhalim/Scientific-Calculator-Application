const dataNumber = document.querySelectorAll('[data-number]');
const dataUnaryOperation = document.querySelectorAll('[data-unary-operation]');
const dataDirectValue = document.querySelectorAll('[data-direct-value]');
const equation = document.getElementById('equation');
const output = document.getElementById('output');
const equalButton = document.getElementById('equal-button');
const allClearButton = document.getElementById('all-clear-button');
const backspaceButton = document.getElementById('backspace-button');
const signToggleButton = document.getElementById('sign-toggle-button');
const feButton = document.getElementById('fe-button');
const degreeButton = document.getElementById('degree-button');
const msButton = document.getElementById('ms-button');
const mrButton = document.getElementById('mr-button');
const mpButton = document.getElementById('mPlus-button');
const mmButton = document.getElementById('mMinus-button');
const mcButton = document.getElementById('mc-button');
const powerCell = document.getElementById('power-cell');
const trigonometryCellButton = document.getElementById('trigonometry-cell-button');
const functionCellButton = document.getElementById('function-cell-button');
trigonometryCellButton.onclick = () => {
     if(document.getElementById('trigonometry-cell-content').style.display === 'block'){
          document.getElementById('trigonometry-cell-content').style.display = 'none';
     }else{
          document.getElementById('trigonometry-cell-content').style.display = 'block';
     }
};
functionCellButton.onclick = () => {
     if(document.getElementById('function-cell-content').style.display === 'block'){
          document.getElementById('function-cell-content').style.display = 'none';
     }else{
          document.getElementById('function-cell-content').style.display = 'block';
     }
};
function toggleClearAndReadButtons(){
     if(localStorage.getItem('calculator-item') === null){
          mcButton.style.opacity = '0.1';
          mrButton.style.opacity = '0.1';
          mcButton.style.pointerEvents = 'none';
          mrButton.style.pointerEvents = 'none';
     }else{
          mcButton.style.opacity = '1';
          mrButton.style.opacity = '1';
          mcButton.style.pointerEvents = 'auto';
          mrButton.style.pointerEvents = 'auto';
     }
}
class Calculator {
     constructor(){
          this.equation = 0;
          this.isDecimalLegal = true;
          this.feMode = false;
          this.powerMode = false;
          this.isOperatorLegal = true;
          this.degreeMode = false;
          this.lastComputed = 0;
          equation.innerText = "";
          output.innerText = this.equation;
          toggleClearAndReadButtons();
     }
     getEquation(){
          return this.equation;
     }
     getLastComputed(){
          return this.lastComputed;
     }
     equationToExponential(){
          if(this.lastComputed !== 0){
               this.equation = this.lastComputed;
          }
          if(this.feMode){
               this.equation = Number(this.equation).toFixed();
               this.feMode = false;
          }else{
               this.equation = Number(this.equation).toExponential();
               this.feMode = true;
          }
          output.innerText = this.equation;
          this.lastComputed = this.equation;
          this.equation = 0;
     }
     appendNumber(number){
          if(this.equation === 0 && number === '0') return;
          if((number === '+' || number === '-' || number === '*' || number === '/' || number === '%' || number === '**') && this.lastComputed !== 0){
               this.equation = this.lastComputed;
               this.lastComputed = 0;
          }else{
               this.lastComputed = 0;
          }
          if((number === '+' || number === '-' || number === '*' || number === '/' || number === '%' || number === '**') && this.isOperatorLegal === false) return;
          if((number === '+' || number === '-' || number === '*' || number === '/' || number === '%' || number === '**') && this.isOperatorLegal){
               this.isOperatorLegal = false;
               this.isDecimalLegal = true;
          }else{
               this.isOperatorLegal = true;
          }
          if(number === '.'){
               if(this.isDecimalLegal === false) return;
               else this.isDecimalLegal = false;
          }
          if(number === ')' && ((this.equation.toString().split(')').length - 1) >= (this.equation.toString().split('(').length - 1))) return;
          if(number === '(' && this.equation.toString().slice(-1) === ')'){
               this.equation += '*';
          }
          if(this.equation === 0 && !(number === '+' || number === '-' || number === '*' || number === '/' || number === '%' || number === '**')){
               this.equation = number;
          }else{
               this.equation += number;
          }
          equation.innerText = "";
          output.innerText = this.equation;
     }
     compute(){
          try{
               let computation = eval(this.equation);
               equation.innerText = `${this.equation} =`;
               if(computation === Infinity && this.equation.toString().includes('/')){
                    computation = 'Can Not Divide by Zero';
               }
               output.innerText = computation;
               if(isNaN(computation)){
                    this.lastComputed = 0;
               }else{
                    this.lastComputed = computation;
               }
               this.equation = 0;
          }catch(error){
               equation.innerText = `${this.equation} =`;
               output.innerText = 'Invalid Expression';
               this.equation = 0;
          }
     }
     signToggle(){
          if(this.lastComputed !== 0){
               this.equation = this.lastComputed;
          }
          let equationNumber = parseFloat(this.equation);
          if(equationNumber > 0){
               this.equation = Math.abs(equationNumber) * -1;
          }else{
               this.equation = Math.abs(equationNumber);
          }
          output.innerText = this.equation;
          this.lastComputed = this.equation;
     }
     unaryOperation(operation){
          if(this.lastComputed !== 0){
               this.equation = this.lastComputed;
          }
          if(this.equation === "") return;
          let computation;
          const current = parseFloat(this.equation);
          if(isNaN(current)) return;
          switch(operation){
               case 'sin':
                    if(this.degreeMode){
                         computation = Math.sin(current * Math.PI / 180);
                    }else{
                         computation = Math.sin(current);
                    }
                    break;
               case 'cos':
                    if(this.degreeMode){
                         computation = Math.cos(current * Math.PI / 180);
                    }else{
                         computation = Math.cos(current);
                    }
                    break;
               case 'tan':
                    if(this.degreeMode){
                         computation = Math.tan(current * Math.PI / 180);
                    }else{
                         computation = Math.tan(current);
                    }
                    break;
               case 'hyp':
                    computation = Math.hypot(current);
                    break;
               case 'sec':
                    if(this.degreeMode){
                         computation = 1 / Math.cos(current * Math.PI / 180);
                    }else{
                         computation = 1 / Math.cos(current);
                    }
                    break;
               case 'csc':
                    if(this.degreeMode){
                         computation = 1 / Math.sin(current * Math.PI / 180);
                    }else{
                         computation = 1 / Math.sin(current);
                    }
                    break;
               case 'cot':
                    if(this.degreeMode){
                         computation = 1 / Math.tan(current * Math.PI / 180);
                    }else{
                         computation = 1 / Math.tan(current);
                    }
                    break;
               case 'ceil':
                    computation = Math.ceil(current);
                    break;
               case 'floor':
                    computation = Math.floor(current);
                    break;
               case 'abs':
                    computation = Math.abs(current);
                    break;
               case 'ln':
                    if(current !== 0){
                         computation = Math.log(current);
                    }else{
                         computation = 'Invalid Input';
                    }
                    break;
               case 'log':
                    if(current !== 0){
                         computation = Math.log10(current);
                    }else{
                         computation = 'Invalid Input';
                    }
                    break;
               case '10^':
                    computation = Math.pow(10,current);
                    break;
               case 'sqrt':
                    computation = Math.sqrt(current);
                    break;
               case 'cuberoot':
                    computation = Math.cbrt(current);
                    break;
               case 'sqr':
                    computation = Math.pow(current,2);
                    break;
               case '1/':
                    if(current !== 0){
                         computation = 1 / current;
                    }else{
                         computation = 'Can Not Divided by Zero';
                    }
                    break;
               case 'exp':
                    computation = current.toExponential();
                    break;
               case 'cube':
                    computation = Math.pow(current,3);
                    break;
               case '2^':
                    computation = Math.pow(2,current);
                    break;
               case 'e^':
                    computation = Math.pow(Math.E,current);
                    break;
               case '!':
                    if(current >= 0){
                         let factorial = (number) => {
                              let temperature = 1;
                              for(let i = 2;i <= number;i++){
                                   temperature = temperature * i;
                              }
                              return temperature;
                         }
                         computation = factorial(current);
                    }else{
                         computation = 'Invalid Input';
                    }
                    break;
               default:
                    return;
          }
          equation.innerText = `${operation}(${this.equation}) =`;
          output.innerText = computation;
          if(isNaN(computation)){
               this.lastComputed = 0;
               this.equation = 0;
          }else{
               this.lastComputed = computation;
               this.equation = 0;
          }
     }
     printDirectValue(value){
          let computation;
          switch(value){
               case 'pi':
                    computation = Math.PI;
                    break;
               case 'e':
                    computation = Math.E;
                    break;
               case 'radian':
                    computation = Math.random();
                    break;
          }
          this.equation = computation;
          equation.innerText = "";
          output.innerText = this.equation;
          this.lastComputed = computation;
          this.equation = 0;
     }
     clear(){
          this.equation = 0;
          this.isDecimalLegal = true;
          this.isOperatorLegal = true;
          this.lastComputed = 0;
          equation.innerText = "";
          output.innerText = this.equation;
     }
     backspace(){
          this.equation = this.equation.toString().slice(0,-1);
          if(this.equation === ""){
               this.equation = 0;
          }
          this.isDecimalLegal = true;
          this.isOperatorLegal = true;
          output.textContent = this.equation;
     }
}
const calculator = new Calculator();
dataNumber.forEach(button => {
     if(calculator.feMode){
          calculator.feMode = false;
          feButton.style.borderBottom = 'none';
     }
     button.addEventListener('click',() => {
          calculator.appendNumber(button.getAttribute('data-number'));
     });
});
equalButton.onclick = () => {
     calculator.compute();
}
allClearButton.onclick = () => {
     calculator.clear();
}
backspaceButton.onclick = () => {
     calculator.backspace();
}
signToggleButton.onclick = () => {
     calculator.signToggle();
}
dataUnaryOperation.forEach(button => {
     if(calculator.feMode){
          calculator.feMode = false;
          feButton.style.borderBottom = 'none';
     }
     button.addEventListener('click',() => {
          calculator.unaryOperation(button.getAttribute('data-unary-operation'));
     });
});
dataDirectValue.forEach(button => {
     if(calculator.feMode){
          calculator.feMode = false;
          feButton.style.borderBottom = 'none';
     }
     button.addEventListener('click',() => {
          calculator.printDirectValue(button.getAttribute('data-direct-value'));
     });
});
feButton.onclick = () => {
     calculator.equationToExponential();
     if(calculator.feMode){
          feButton.style.borderBottom = '2px solid var(--primaryColor)';
     }else{
          feButton.style.borderBottom = 'none';
     }
}
degreeButton.onclick = () => {
     if(calculator.degreeMode){
          degreeButton.innerText = 'radian';
          calculator.degreeMode = false;
     }else{
          degreeButton.innerText = 'degree';
          calculator.degreeMode = true;
     }
}
function turnOnPowerMode(){
     if(calculator.powerMode){
          document.getElementById('sqrtOrCube').setAttribute('data-unary-operation','sqr');
          document.getElementById('sqrtOrCube').innerHTML = 'x<sup>2</sup>';
          document.getElementById('sqrtOrCubeRoot').setAttribute('data-unary-operation','sqrt');
          document.getElementById('sqrtOrCubeRoot').innerHTML = '&#8730';
          document.getElementById('10RaiseXOr2RaiseX').setAttribute('data-unary-operation','10^');
          document.getElementById('10RaiseXOr2RaiseX').innerHTML = '10<sup>x</sup>';
          document.getElementById('logOrERaiseX').setAttribute('data-unary-operation','log');
          document.getElementById('logOrERaiseX').innerHTML = 'log';
          calculator.powerMode = false;
     }else{
          document.getElementById('sqrtOrCube').setAttribute('data-unary-operation','cube');
          document.getElementById('sqrtOrCube').innerHTML = 'x<sup>3</sup>';
          document.getElementById('sqrtOrCubeRoot').setAttribute('data-unary-operation','cuberoot');
          document.getElementById('sqrtOrCubeRoot').innerHTML = '&#8731';
          document.getElementById('sqrtOrCubeRoot').style.padding = '0.5rem';
          document.getElementById('10RaiseXOr2RaiseX').setAttribute('data-unary-operation','2^');
          document.getElementById('10RaiseXOr2RaiseX').innerHTML = '2<sup>x</sup>';
          document.getElementById('logOrERaiseX').setAttribute('data-unary-operation','e^');
          document.getElementById('logOrERaiseX').innerHTML = 'e<sup>x</sup>';
          document.getElementById('logOrERaiseX').style.padding = '0.5rem';
          calculator.powerMode = true;
     }
}
powerCell.onclick = () => {
     turnOnPowerMode();
     if(calculator.powerMode){
          powerCell.style.backgroundColor = 'var(--primaryColor)';
          powerCell.style.color = 'var(--cardBackgroundColor)';
     }else{
          powerCell.style.backgroundColor = 'var(--cardSecondaryBackgroundColor)';
          powerCell.style.color = 'var(--textColor)';
     }
}
msButton.onclick = () => {
     if(calculator.getEquation() !== "" && !(isNaN(calculator.getEquation()))){
          if(calculator.getEquation() === 0){
               localStorage.setItem('calculator-item',calculator.getLastComputed());
          }else{
               localStorage.setItem('calculator-item',calculator.getEquation());
          }
          toggleClearAndReadButtons();
     }
}
mrButton.onclick = () => {
     if(localStorage.getItem('calculator-item') !== null){
          if(!(calculator.getEquation().toString().includes('+') ||
               calculator.getEquation().toString().includes('-') ||
               calculator.getEquation().toString().includes('*') ||
               calculator.getEquation().toString().includes('/') ||
               calculator.getEquation().toString().includes('%') ||
               calculator.getEquation().toString().includes('**'))
          ) calculator.clear();
          calculator.appendNumber(localStorage.getItem('calculator-item'));
     }
}
mpButton.onclick = () => {
     let current;
     if(calculator.getEquation() !== ""){
          if(calculator.getEquation() === 0){
               current = parseFloat(calculator.getLastComputed());
          }else{
               current = parseFloat(calculator.getEquation());
          }
     }
     if(localStorage.getItem('calculator-item') !== null){
          let memoryValue = Number(localStorage.getItem('calculator-item'));
          localStorage.setItem('calculator-item',memoryValue + current);
     }else{
          localStorage.setItem('calculator-item',current);
          toggleClearAndReadButtons();
     }
}
mmButton.onclick = () => {
     let current;
     if(calculator.getEquation() !== ""){
          if(calculator.getEquation() === 0){
               current = parseFloat(calculator.getLastComputed());
          }else{
               current = parseFloat(calculator.getEquation());
          }
     }
     if(localStorage.getItem('calculator-item') !== null){
          let memoryValue = Number(localStorage.getItem('calculator-item'));
          localStorage.setItem('calculator-item',memoryValue - current);
     }else{
          localStorage.setItem('calculator-item',current);
          toggleClearAndReadButtons();
     }
}
mcButton.onclick = () => {
     if(localStorage.getItem('calculator-item')){
          localStorage.removeItem('calculator-item');
          toggleClearAndReadButtons();
     }
}
window.onclick = function(event){
     if(!event.target.matches('.function-cell-button')){
          let dropdowns = document.getElementsByClassName('function-cell-content');
          for(let i = 0;i < dropdowns.length;i++){
               let openDropdown = dropdowns[i];
               if(openDropdown.style.display === 'block'){
                    openDropdown.style.display = 'none';
               }
          }
     }
     if(!event.target.matches('.trigonometry-cell-button')){
          let dropdowns = document.getElementsByClassName('trigonometry-cell-content');
          for(let i = 0;i < dropdowns.length;i++){
               let openDropdown = dropdowns[i];
               if(openDropdown.style.display === 'block'){
                    openDropdown.style.display = 'none';
               }
          }
     }
     if(!event.target.matches('.power-cell-button')){
          let dropdowns = document.getElementsByClassName('power-cell-content');
          for(let i = 0;i < dropdowns.length;i++){
               let openDropdown = dropdowns[i];
               if(openDropdown.style.display === 'block'){
                    openDropdown.style.display = 'none';
               }
          }
     }
}
window.addEventListener('keydown',(event) => {
     if(calculator.feMode){
          calculator.feMode = false;
          feButton.style.borderBottom = 'none';
     }
     if((event.key >= 0 && event.key <= 9) || (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/' || event.key === '%' || event.key === '.' || event.key === '(' || event.key === ')')){
          calculator.appendNumber(event.key);
     }
     if(event.key === '^') calculator.appendNumber('**');
     if(event.key === 'Enter') calculator.compute();
     if(event.key === 'Backspace') calculator.backspace();
     if(event.key === 'Escape') calculator.clear();
});