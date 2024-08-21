const result = document.getElementById('result');
const operation = document.getElementById('operation');
const toggleRadian = document.getElementById('toggleRadian');
const toggleSecond = document.getElementById('toggleSecond');
const button = document.querySelectorAll('button');
let data = {formats: [],operations: [],result: 0,resultFormat: [],staging: [],};
function clearData(){
     data.staging = [];
     data.result = 0;
     data.operations = [];
     data.formats = [];
     data.resultFormat = [];
     operation.value = data.formats.join("");
     result.value = data.staging.join("");
}
function toggleRadianDegree(){
     if(toggleRadian.innerText === 'radian'){
          toggleRadian.innerText = 'degree',
          toggleRadian.value = 'degree'
     }else{
          toggleRadian.innerText = 'radian',
          toggleRadian.value = 'radian'
     }
}
function toggleSecondDegree(){
     const button0 = [
          {if: 'trigonometric-sin',newFunction: 'sec',newText: 'sec'},
          {if: 'trigonometric-cos',newFunction: 'cosec',newText: 'cosec'},
          {if: 'trigonometric-tan',newFunction: 'cot',newText: 'cot'},
     ];
     const button1 = [
          {if: 'trigonometric-sin',newFunction: 'sin',newText: 'sin'},
          {if: 'trigonometric-cos',newFunction: 'cos',newText: 'cos'},
          {if: 'trigonometric-tan',newFunction: 'tan',newText: 'tan'},
     ];
     if(toggleSecond.value === '0'){
          button0.forEach(buttonObject => {
               const element = document.createElement(buttonObject.id);
               element.setAttribute('onclick',`trigonometric('${buttonObject.newFunction}')`);
               element.innerText = buttonObject.newText;
          });
          toggleSecond.value = '1';
     }else{
          button1.forEach(buttonObject => {
               const element = document.createElement(buttonObject.id);
               element.setAttribute('onclick',`trigonometric('${buttonObject.newFunction}')`);
               element.innerText = buttonObject.newText;
          });
          toggleSecond.value = '0';
     }
}
function number(value){
     if(/(active)/.test(data.resultFormat[data.resultFormat.length - 1])) data.formats.pop();
     data.staging.push(value);
     result.value = data.staging.join("");
}
function factorialCalculation(value){
     if(value < 0) return 'Invalid Input';
     else if(value == 0) return 1;
     else return value * factorialCalculation(value - 1);
}
function constant(operationType) {
     const operations = {
          π: () => Math.PI,
          e: () => Math.E,
     };
     data.result = operations[operationType]();
     data.formats.push(operationType);
     data.resultFormat = [];
     data.resultFormat.push('active');
     operation.value = data.formats.join("");
     result.value = data.result;
     operation.value = data.formats.join("");
     data.staging = [];
}
function percentage(){
     if(data.staging.length !== 0){
          percent = data.staging.join("") * 0.01;
          data.staging = [];
          data.result = percent;
          result.value = data.result;
     }else if(data.result.length !== 0){
          percent = data.result * 0.01;
          data.result = percent;
          result.value = data.result;
     }
}
function balanceParentheses(value){
     data_temporary = [...value];
     if(!Array.isArray(data_temporary)) return;
     if(data_temporary.length !== 0){
          let jumlah_open = data_temporary.filter(function (item){
               return item === '(';
          }).length;
          let jumlah_close = data_temporary.filter(function (item){
               return item === ')';
          }).length;
          let jumlah = jumlah_open - jumlah_close;
          if(isNaN(parseFloat(data_temporary.length - 1)) && !data_temporary[data_temporary.length - 1].includes(')')){
               data_temporary.push(1);
               for(let i = 0;i <= jumlah - 1;i++){
                    data_temporary.push(')');
               }
          }else{
               for(let i = 0;i <= jumlah - 1;i++){
                    data_temporary.push(')');
               }
          }
     }
     return data_temporary;
}
function operator(value,format){
     if(data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))){
          if(data.formats.length === 0 || (data.formats.length > 0 && !data.formats[data.formats.length - 1].includes(')'))){
               data.operations.push(data.staging.join(""));
               data.formats.push(data.staging.join(""));
               data.staging = [];
               formula_string = balanceParentheses(data.operations);
               data.result = eval(formula_string.join(""));
               operation.value = data.formats.join("");
               result.value = data.result;
          }
     }else{
          if(data.operations.length > 0 &&
               data.resultFormat.length === 0 &&
               isNaN(parseFloat(data.operations[data.operations.length - 1])) &&
               data.operations[data.operations.length - 1] !== '(' &&
               data.operations[data.operations.length - 1] !== ')'){
               data.operations.pop();
               data.formats.pop();
          }else{
               if(data.staging.length !== 0 && data.operations[data.operations.length - 1] !== ')'){
                    data.operations.push(data.staging.join(""));
                    data.formats.push(data.staging.join(""));
                    data.result = parseFloat(data.staging.join(""));
                    data.staging = [];
               }else if(data.operations[data.operations.length - 1] !== ')'){
                    data.operations = data.operations.concat(data.result);
                    if(data.resultFormat.length === 0){
                         data.formats = data.formats.concat(data.result);
                         result.value = data.result;
                    }else data.resultFormat = [];
               }
          }
     }
     data.resultFormat = [];
     data.operations.push(value);
     data.formats.push(format);
     operation.value = data.formats.join("");
}
function math_function(operationType){
     const operations = {
          log: (x) => Math.log10(x),
          ln: (x) => Math.log(x),
          factorial: (x) => factorialCalculation(x),
          sqrt: (x) => Math.sqrt(x),
     };
     const formatMap = {
          log: (i) => `log(${i})`,
          ln: (i) => `ln(${i})`,
          factorial: (i) => `factorial(${i})`,
          sqrt: (i) => `√(${i})`,
     };
     if(data.staging.length !== 0){
          i = data.staging.join("");
          data.result = operations[operationType](i);
          data.formats.push(formatMap[operationType](i));
          data.resultFormat = [];
          data.resultFormat.push('active');
          result.value = data.result;
          operation.value = data.formats.join('');
          data.staging = [];
     }else if(data.result !== 0 || data.result === 0){
          i = data.result;
          data.result = operations[operationType](i);
          if(data.formats.length > 0 && /(active)/.test(data.resultFormat.length - 1)){
               j = data.formats[data.formats.length - 1];
               data.formats.pop();
               data.formats.push(formatMap[operationType](j));
          }else data.formats.push(formatMap[operationType](i));
          data.resultFormat = [];
          data.resultFormat.push('active');
          result.value = data.result;
          operation.value = data.formats.join('');
     }
}
function trigonometric(value){
     const operations = {
          sin: (x) => Math.sin(x),
          cos: (x) => Math.cos(x),
          tan: (x) => Math.tan(x),
          sec: (x) => 1 / Math.cos(x),
          cosec: (x) => 1 / Math.sin(x),
          cot: (x) => 1 / Math.tan(x),
     };
     const formats = {
          sin: (i,unit) => unit === 'degree' ? `sin₀(${i})` : `sinᵣ(${i})`,
          cos: (i,unit) => unit === 'degree' ? `cos₀(${i})` : `cosᵣ(${i})`,
          tan: (i,unit) => unit === 'degree' ? `tan₀(${i})` : `tanᵣ(${i})`,
          sec: (i,unit) => unit === 'degree' ? `sec₀(${i})` : `secᵣ(${i})`,
          cosec: (i,unit) => unit === 'degree' ? `cosec₀(${i})` : `cosecᵣ(${i})`,
          cot: (i,unit) => unit === 'degree' ? `cot₀(${i})` : `cotᵣ(${i})`,
     };
     if(data.staging.length !== 0){
        let angleInRadians = toggleRadian.value === 'degree' ? data.staging.join('') * (Math.PI / 180) : data.staging.join('');
          data.result = operations[value](angleInRadians);
          data.formats.push(formats[value](data.staging.join(''),toggleRadian.value));
          data.resultFormat = [];
          data.resultFormat.push('active');
          result.value = data.result;
          operation.value = data.formats.join("");
          data.staging = [];
     }else if(data.result !== 0 || data.result === 0){
          let i = data.result;
          let angleInRadians = toggleRadian.value === 'degree' ? data.result * (Math.PI / 180) : data.result;
          data.result = operations[value](angleInRadians);
          if(data.formats.length > 0 && /(active)/.test(data.resultFormat[data.resultFormat.length - 1])){
               let j = data.formats[data.formats.length - 1];
               data.formats.pop();
               data.formats.push(formats[value](j,toggleRadian.value));
          }else data.formats.push(formats[value](i,toggleRadian.value));
          data.resultFormat = [];
          data.resultFormat.push('active');
          result.value = data.result;
          operation.value = data.formats.join("");
     }
}
function calculate(){
     if(data.operations[data.operations.length - 1] !== ')'){
          if(data.staging.length !== 0){
               data.operations = data.operations.concat(data.staging);
               data.formats = data.formats.concat(data.staging);
          }else{
               data.operations = data.operations.concat(data.result);
               if(data.resultFormat.length == 0){
                    data.formats = data.formats.concat(data.result);
               }else data.resultFormat = [];
          }
     }
     data.staging = [];
     formula_string = balanceParentheses(data.operations);
     try {
          data.result = eval(formula_string.join(""));
          data.operations.push('=');
          data.formats.push('=');
          operation.value = data.formats.join("");
          result.value = data.result;
          data.operations = [];
          data.formats = [];
     }catch(error){
          if(error instanceof SyntaxError){
               result.value = 'Syntax Error!';
               return;
          }
     }
}
function parenthesesOpen(){
     if(data.staging.length !== 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))){
          data.operations.push(data.staging.join(""),'*','(');
          data.formats.push(data.staging.join(''),'×','(');
          formula_string = balanceParentheses(data.operations);
          data.result = eval(formula_string.join(""));
     }else if(data.staging.length === 0 && /(active)/.test(data.resultFormat[data.resultFormat.length - 1])){
          data.operations.push(data.result,'*','(');
          data.formats.push('×','(');
     }else if(data.staging.length === 0 && data.operations[data.operations.length - 1] === ')'){
          data.operations.push('*','(');
          data.formats.push('×','(');
     }else if(data.staging.length === 0 && isNaN(parseFloat(data.operations[data.operations.length - 1]))){
          data.operations.push('(');
          data.formats.push('(');
     }
     data.staging = [];
     data.resultFormat = [];
     operation.value = data.formats.join("");
     result.value = data.result;
}
function parenthesesClose(){
     let jumlah_open = data.operations.filter(function (item){
          return item === '(';
     }).length;
     let jumlah_close = data.operations.filter(function (item){
          return item === ')';
     }).length;
     let jumlah = jumlah_open - jumlah_close;
     if(jumlah > 0){
          if(/(active)/.test(data.resultFormat[data.resultFormat.length - 1])){
               data.operations.push(data.result,')');
               data.formats.push(')');
               let formula_string = balanceParentheses(data.operations);
               data.result = eval(formula_string.join(""));
          }else if(data.staging.length !== 0){
               data.operations.push(data.staging.join(""),')');
               data.formats.push(data.staging.join(""),')');
               let formula_string = balanceParentheses(data.operations);
               data.result = eval(formula_string.join(""));
          }else if(data.staging.length === 0){
               data.operations.push(data.result,')');
               data.formats.push(data.result,')');
               let formula_string = balanceParentheses(data.operations);
               data.result = eval(formula_string.join(""));
          }
          data.staging = [];
          data.resultFormat = [];
          operation.value = data.formats.join("");
          result.value = data.result;
     }
}
button.forEach(buttons => {
     buttons.addEventListener('click',() => {
          if(buttons.id === 'calculate') buttons.disabled = true;
          else document.getElementById('calculate').disabled = false;
     });
});
document.getElementById('toggleRadian').addEventListener('click',() => toggleRadianDegree());
document.getElementById('toggleSecond').addEventListener('click',() => toggleSecondDegree());
document.getElementById('clear-data').addEventListener('click',() => clearData());
document.getElementById('parenthesesOpen').addEventListener('click',() => parenthesesOpen());
document.getElementById('parenthesesClose').addEventListener('click',() => parenthesesClose());
document.getElementById('percentage').addEventListener('click',() => percentage());
document.getElementById('calculate').addEventListener('click',() => calculate());
document.getElementById('trigonometric-sin').addEventListener('click',() => trigonometric('sin'));
document.getElementById('trigonometric-cos').addEventListener('click',() => trigonometric('cos'));
document.getElementById('trigonometric-tan').addEventListener('click',() => trigonometric('tan'));
document.getElementById('constant1').addEventListener('click',() => constant('e'));
document.getElementById('constant2').addEventListener('click',() => constant('π'));
document.getElementById('factorial').addEventListener('click',() => math_function('factorial'));
document.getElementById('ln').addEventListener('click',() => math_function('ln'));
document.getElementById('log').addEventListener('click',() => math_function('log'));
document.getElementById('sqrt').addEventListener('click',() => math_function('sqrt'));