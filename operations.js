export const operations = {
  '+': sum,
  '-': subtract,
  '×': multiply,
  '÷': divide,
  x2: xPower2,
  xy: xPowerY,
  '√': sqrtX,
  'y√x': yRootX,
  '%': calculatePercent,
  'x!': calculateFactorial,
  '1/x': calculateFraction,
  ln: naturalLog,
  log: logarithmOf,
  sin: sineFromNumber,
  cos: cosineFromNumber,
  tan: tangentFromNumber,
  'decimal-binary': decimalToBinary,
  'decimal-octal': decimalToOctal,
  'decimal-hexadecimal': decimalToHexadecimal,
  'binary-decimal': binaryToDecimal,
  'binary-octal': binaryToOctal,
  'binary-hexadecimal': binaryToHexadecimal,
  'octal-decimal': octalToDecimal,
  'octal-binary': octalToBinary,
  'octal-hexadecimal': octalToHexadecimal,
  'hexadecimal-decimal': hexadecimalToDecimal,
  'hexadecimal-binary': hexadecimalToBinary,
  'hexadecimal-octal': hexadecimalToOctal,
};
function sum(a,b){
  return a + b;
}
function subtract(a,b){
  return a - b;
}
function multiply(a,b){
  return a * b;
}
function divide(a,b){
  return a / b;
}
function xPower2(a){
  return Math.pow(a,2);
}
function xPowerY(a,b){
  return Math.pow(a,b);
}
function sqrtX(a){
  return Math.sqrt(a);
}
function yRootX(a,b){
  return Math.pow(a,1 / b);
}
function calculatePercent(a){
  return a / 100;
}
function calculateFraction(a) {
  return 1 / Number(a);
}
function calculateFactorial(a){
  let response = a;
  if(a == 1 || a == 0) return 1;
  while(a > 1){
    a--;
    response *= a;
  }
  return response;
}
function naturalLog(a){
  return Math.log(a);
}
function logarithmOf(a){
  return Math.log10(a);
}
function sineFromNumber(a){
  return Math.sin(a);
}
function cosineFromNumber(a){
  return Math.cos(a);
}
function tangentFromNumber(a){
  return Math.tan(a);
}
function decimalToBinary(a){
  return Number(a).toString(2);
}
function decimalToOctal(a){
  return Number(a).toString(8);
}
function decimalToHexadecimal(a){
  return Number(a).toString(16).toUpperCase();
}
function binaryToDecimal(a){
  return parseInt(String(a),2);
}
function binaryToOctal(a){
  return decimalToOctal(binaryToDecimal(a));
}
function binaryToHexadecimal(a){
  return decimalToHexadecimal(binaryToDecimal(a));
}
function octalToDecimal(a){
  return parseInt(String(a),8);
}
function octalToBinary(a){
  return decimalToBinary(octalToDecimal(a));
}
function octalToHexadecimal(a){
  return decimalToHexadecimal(octalToDecimal(a));
}
function hexadecimalToDecimal(a){
  return parseInt(String(a),16);
}
function hexadecimalToBinary(a){
  return decimalToBinary(hexadecimalToDecimal(String(a)));
}
function hexadecimalToOctal(a){
  return decimalToOctal(hexadecimalToDecimal(String(a)));
}