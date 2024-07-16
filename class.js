import {operations} from './operations.js';
import {notAMainFunction} from './util.js';
export class Calculator {
     constructor(previousElement,currentElement,answerDisplayElement,stoDisplayElement,historySelect){
          this.previousElement = previousElement;
          this.currentElement = currentElement;
          this.answerDisplayElement = answerDisplayElement;
          this.stoDisplayElement = stoDisplayElement;
          this.historySelect = historySelect;
          this.previousValue = "";
          this.currentValue = "";
          this.operation = undefined;
          this.storage = null;
          this.answer = null;
          this.history = [];
     }
     callPreviousAnswer(){
          let result = this.answer;
          if(result) return result;
          else return "";
     }
     recall(){
          let result = this.storage;
          if(result){
               this.storage = null;
               return result;
          }else return "";
     }
     store(number){
          this.storage = number;
          return "";
     }
     clear(){
          this.previousValue = "";
          this.currentValue = "";
          this.operation = undefined;
     }
     clearCurrent(){
          this.currentValue = "";
     }
     clearPrevious(){
          this.previousValue = "";
     }
     delete(){
          this.currentValue = this.currentValue.toString().slice(0,-1);
     }
     appendNumber(number){
          if(number == '.' && this.currentValue.includes('.')) return;
          if(number == '0' && this.currentValue.length == 1 && this.currentValue[this.currentValue.length - 1] == '0') return;
          if(this.currentValue[0] == '0' && this.currentValue.length == 1 && number != '.') return;
          this.currentValue += number.toString();
     }
     getDisplayNumber(number){
          let [integer,decimal] = number.toString().split('.');
          integer = integer.split("");
          let final = [];
          while(integer.length > 0){
               let result = "";
               result += integer.pop();
               if(integer.length > 0) result += integer.pop();
               final.push(result.split("").reverse().join(""));
          }
          return `${final.reverse().join(',')}${decimal ? `.${decimal}` : ""}`;
     }
     compute(){
          let computation;
          let previous = Number(this.previousValue);
          let current = Number(this.currentValue);
          if(isNaN(current) || this.currentValue == "") return;
          else if(isNaN(previous) || this.previousValue == ""){
               if(notAMainFunction(this.operation)) computation = operations[this.operation](current);
               else return;
          }else computation = operations[this.operation](previous,current);
          this.answer = computation.toString();
          this.currentValue = computation.toString();
          this.operation = undefined;
          this.previousValue = "";
          this.history.unshift(this.getDisplayNumber(this.currentValue));
     }
     chooseOperation(operation){
          if(this.currentValue == ""){
               if(this.operation == operation) return;
               else{
                    this.operation = operation;
                    return;
               }
          }
          if(this.currentValue == '.') return;
          else if(this.currentValue.length > 1 && this.currentValue[0] == '.') this.currentValue = '0' + this.currentValue;
          if(this.previousValue != "") this.compute();
          else{
               if(notAMainFunction(operation)){
                    this.operation = operation;
                    this.compute();
                    return;
               }
          }
          this.operation = operation;
          if(notAMainFunction(operation)){
               this.compute();
               return;
          }
          this.previousValue = this.currentValue;
          this.currentValue = "";
     }
     conversion(type){
          if(this.currentValue == "") return;
          if(this.currentValue == '.') return;
          else if(this.currentValue.length > 1 && this.currentValue[0] == '.') this.currentValue = '0' + this.currentValue;
          if(this.previousValue != ""){
               this.operation = type;
               this.compute();
          }
          let computation = operations[type](this.currentValue);
          this.answer = computation.toString();
          this.currentValue = computation.toString();
          this.operation = undefined;
          this.previousValue = "";
          this.history.unshift(this.getDisplayNumber(this.currentValue));
     }
     renderHistory(){
          this.historySelect.replaceChildren();
          if(this.history.length > 0){
               this.history.forEach(x => {
                    let option1 = document.createElement('option');
                    option1.textContent = x;
                    this.historySelect.appendChild(option1);
               });
          }else{
               let option2 = document.createElement('option');
               option2.setAttribute('value','empty');
               option2.setAttribute('selected',"");
               option2.textContent = 'Empty';
               this.historySelect.appendChild(option2);
          }
     }
     updateDisplay(){
          if(this.answer == 'NAN' || this.answer == 'NaN') null;
          else if(this.answer) this.answerDisplayElement.textContent = `answer: ${this.answer}`;
          else this.answerDisplayElement.textContent = 'answer: empty';
          if(this.storage) this.stoDisplayElement.textContent = `STO: ${this.storage}`;
          else this.stoDisplayElement.textContent = 'sto: empty';
          if(this.currentValue == 'NAN' || this.currentValue == 'NaN'){
               this.currentElement.textContent = 'Error! Press \"AC\" to Clear.';
               return;
          }
          if(this.currentValue[this.currentValue.length - 1] == '.') this.currentElement.textContent = this.currentValue;
          else this.currentElement.textContent = this.getDisplayNumber(this.currentValue);
          this.renderHistory();
          if(this.operation != null){
               if(this.operation == 'y√x' || this.operation == 'xy'){
                    this.previousElement.textContent = `x = ${this.getDisplayNumber(this.previousValue)} | ${this.operation}`;
               }else{
                    this.previousElement.textContent = `${this.getDisplayNumber(this.previousValue)} ${this.operation}`;
               }
          }else this.previousElement.textContent = "";
     }
}