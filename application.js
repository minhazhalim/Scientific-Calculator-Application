const display = document.getElementById('display');
const topDisplay = document.getElementById('topDisplay');
const powerButton = document.getElementById('powerButton');
const powerMinus1 = document.getElementById('power-1');
const cubeRootButton = document.getElementById('cubeRootButton');
const dot = document.getElementById('dot');
const trigonometricMode = document.getElementById('trigonometric-mode');
const trigonoToggle = document.getElementById('trigono-toggle');
const exponential = document.getElementById('exponential');
const answerButton = document.getElementById('answerButton');
const squareButton = document.querySelector('#squareButton');
const sqrtButton = document.querySelector('#sqrtButton');
const percentButton = document.querySelector('#percentButton');
const equalButton = document.querySelector('#equalButton');
const ac = document.querySelector('#ac');
const deleteButton = document.querySelector('#delete');
const numberButton = document.querySelectorAll('.numberButton');
const operationButton = document.querySelectorAll('.operationButton');
const bracketButton = document.querySelectorAll('.bracketButton');
const operators = ['+','-','*','/'];
let calculation = [];
let showOnScreen = [];
let trigonoMode = 'degree';
trigonometricMode.innerText = trigonoMode;
function calculate(equationArray){
     return eval(equationArray.join(""));
}
function updateScreen(){
     topDisplay.innerText = showOnScreen.join("");
}
function clearExponential(){
     exponential.innerText = "";
     exponential.parentElement.classList.remove('active');
}
function trigonometricModeFunction(){
     if(trigonoMode == 'radian') trigonoMode = 'degree';
     else trigonoMode = 'radian';
     trigonometricMode.innerText = trigonoMode;
}
trigonometricMode.addEventListener('click',trigonometricModeFunction);
function trigo(operator,angle){
     if(trigonoMode == 'degree' && operator.name[0] !== 'a'){
          angle = angle * Math.PI / 100;
     }
     let result;
     if(operator.name == 'sin' && angle == (Math.PI)){
          result = 0;
          return result;
     }else if(operator.name == 'cos' && (angle == (Math.PI / 2) || angle == (3 * Math.PI / 2))){
          result = 0;
          return result;
     }else if(operator.name = 'tan' && angle == (Math.PI / 2)){
          result = 'Invalid Input';
          return result;
     }
     result = operator(angle)
     if(trigonoMode == 'degree' && operator.name[0] === '0'){
          result = result * 180 / Math.PI;
     }
     return result;
}
function autoCloseBracket(){
     let startParenthesis = 0;
     let endParenthesis = 0;
     for(element of calculation){
          element = element.toString();
          if(element.indexOf('(') != -1) startParenthesis++;
          else if(element.indexOf(')') != -1) endParenthesis++;
     }
     for(let i = endParenthesis;i < startParenthesis;i++){
          calculation.push(')');
     }
}
function powerFunction(){
     if(calculation.includes('power(')){
          let powerStart;
          let powerEnd;
          let powerOf = [];
          let power = ['('];
          if(calculation[calculation.indexOf('power(') - 1] == ')'){
               let bracketCount = 0;
               for(let i = calculation.indexOf('power(') - 1;i >= 0;i--){
                    powerStart = i;
                    if(calculation[i] === '(') bracketCount++;
                    if(calculation[i] === ')') bracketCount--;
                    powerOf.unshift(calculation[i]);
                    if(bracketCount === 0) break;
               }
          }else{
               for(let i = calculation.indexOf('power(') - 1;i >= 0;i--){
                    if(operators.includes(calculation[i])) break;
                    powerStart = i;
                    powerOf.unshift(calculation[i]);
               }
          }{
               let bracketCount = 1;
               for(let i = calculation.indexOf('power(') + 1;i <calculation.length;i++){
                    if(calculation[i] == '(') bracketCount++;
                    if(calculation[i] == ')') bracketCount--;
                    power.push(calculation[i]);
                    powerEnd = i;
                    if(bracketCount == 0) break;
               }
          }
          let powered = Math.pow(calculate(powerOf),calculate(power));
          calculation.splice(powerStart,powerEnd - powerStart + 1,powered);
          powerFunction();
     }
}
function acFunction(){
     calculation = [];
     showOnScreen = [];
     display.value = 0;
     updateScreen();
     clearExponential();
}
window.addEventListener('load',acFunction);
ac.addEventListener('click',acFunction);
function numberButtonFunction(event){
     calculation.push(event.target.innerText);
     showOnScreen.push(event.target.innerText);
     updateScreen();
}
numberButton.forEach(element => {
     element.addEventListener('click',numberButtonFunction);
});
function removeAnswer(event){
     calculation = [];
     showOnScreen = [];
     updateScreen();
     numberButton.forEach(element => {
          element.addEventListener('click',removeAnswer);
     });
     numberButtonFunction(event);
}
function operationButtonFunction(event){
     calculation.push(event.target.dataset.buttonSymbol);
     showOnScreen.push(event.target.innerText);
     updateScreen();
     numberButton.forEach(element => {
          element.removeEventListener('click',removeAnswer);
     });
}
operationButton.forEach(element => {
     element.addEventListener('click',operationButtonFunction);
});
function bracketFunction(event){
     let bracketCount = 0;
     for(let value of calculation.join("")){
          if(value == '(') bracketCount++;
          if(value == ')') bracketCount--;
     }
     if(isNaN(parseFloat(showOnScreen[showOnScreen.length - 1])) == false && event.target.innerText == '(') calculation.push('*');
     else if(event.target.innerText == ""){
          if(bracketCount == 0) return;
     }
     calculation.push(event.target.innerText);
     showOnScreen.push(event.target.innerText);
     updateScreen();
     numberButton.forEach(element => {
          element.removeEventListener('click',removeAnswer);
     });
}
bracketButton.forEach(element => {
     element.addEventListener('click',bracketFunction);
});
function rootFunction(event,root){
     !operators.includes(calculation.slice(-1)) ? calculation.push(`*${root}`) : calculation.push(root);
     showOnScreen.push(event.target.dataset.buttonSymbol);
     updateScreen();
     numberButton.forEach(element => {{
          element.removeEventListener('click',removeAnswer);
     }});
}
sqrtButton.addEventListener('click',event => {
     rootFunction(event,'Math.sqrt(');
});
cubeRootButton.addEventListener('click',event => {
     rootFunction(event,'Math.cbrt(');
});
function equalFunction(){
     clearExponential();
     autoCloseBracket();
     powerFunction();
     let answer;
     try {
          answer = calculate(calculation).toString();
          if(!answer.includes('e') && answer.includes('.') && answer.slice(0,-1).split('.')[1].endsWith('000000')){
               answer = parseFloat(answer.slice(0,-1)).toString();
          }
     }catch(error){
          if(error instanceof SyntaxError){
               display.value = 'Syntax Error!';
               return;
          }
     }
     calculation = [answer];
     showOnScreen = [answer];
     localStorage.setItem('answer',answer);
     if(answer.indexOf('e') != -1){
          const newAnswer = answer.split('e');
          exponential.innerText = newAnswer[1];
          exponential.parentElement.classList.add('active');
          answer = newAnswer[0];
     }
     display.value = answer;
     numberButton.forEach(element => {
          element.addEventListener('click',removeAnswer);
     });
}
equalButton.addEventListener('click',equalFunction);
document.getElementById('visibility-toggler').addEventListener('click',() => {
     document.querySelectorAll('.toggle-visibility').forEach(element => {
          element.classList.toggle('visible');
     });
});
document.querySelectorAll('.button').forEach(button => {
     button.addEventListener('click',() => {
          button.classList.add('click-animation');
          button.addEventListener('animationend',() => button.classList.remove('click-animation'),{once: true});
     });
});
document.addEventListener('keydown',event => {
     let targetElement = event.key === 'Enter' ?
          equalButton : event.key === 'Backspace' ?
          ac: event.key === 'Delete' ?
          deleteButton : !isNaN(event.key) ?
          [...numberButton].find(element => element.innerText === event.key) :
          [...operationButton].find(element => element.dataset.buttonSymbol === event.key);
     targetElement && event.preventDefault();
     targetElement && targetElement.click();
});
trigonoToggle.addEventListener('click',() => {
     document.getElementById('trigonometric-container').classList.toggle('visible');
});
deleteButton.addEventListener('click',() => {
     calculation.pop();
     showOnScreen.pop();
     updateScreen();
});
answerButton.addEventListener('click',() => {
     let answer = localStorage.getItem('answer');
     calculation.push(answer);
     showOnScreen.push('ANSWER');
     updateScreen();
});
powerButton.addEventListener('click',event => {
     calculation.push('power(');
     showOnScreen.push(event.target.dataset.buttonSymbol);
     updateScreen();
});
powerMinus1.addEventListener('click',event => {
     calculation.push('power(','-1',')');
     showOnScreen.push('^(','-1',')');
     updateScreen();
});
squareButton.addEventListener('click',event => {
     calculation.push('power(','2',')');
     showOnScreen.push('^(','2',')');
     updateScreen();
});