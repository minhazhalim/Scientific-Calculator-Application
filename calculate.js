function solve(){
     let input = document.querySelector('#input');
     let result = document.querySelector('#result');
     let selectMenuTo = document.querySelector('#selectMenuTo');
     let button = document.querySelector('#container button');
     let option = selectMenuTo.querySelector('option');
     let hexadecimalOption = document.createElement('option');
     if(selectMenuTo.childElementCount == 1){
          option.textContent = 'Binary';
          option.setAttribute('value','binary');
          hexadecimalOption.textContent = 'Hexadecimal';
          hexadecimalOption.setAttribute('value','hexadecimal');
          selectMenuTo.appendChild(hexadecimalOption);
     }
     button.addEventListener('click',() => {
          let decimalValue = input.value;
          let hexadecimalValue = [];
          let binaryValue = [];
          const hexadecimalCode = {
               10: 'A',
               11: 'B',
               12: 'C',
               13: 'D',
               14: 'E',
               15: 'F',
          };
          if(selectMenuTo.value == 'hexadecimal'){
               result.value = "";
               let initial = Number(decimalValue);
               if(initial == 0) result.value = '0';
               else{
                    while(initial > 0){
                         let remainder = initial % 16;
                         initial = Math.floor(initial / 16);
                         if(remainder > 9) remainder = hexadecimalCode[remainder];
                         hexadecimalValue.push(remainder);
                    }
                    let hexadecimalFinal = hexadecimalValue.reverse().join("");
                    result.value = hexadecimalFinal;
               }
          }else if(selectMenuTo.value == 'binary'){
               result.value = "";
               let initial = Number(decimalValue);
               if(initial == 0) result.value = '0';
          }else{
               while(initial > 0){
                    let remainder = initial % 2;
                    initial = Math.floor(initial / 2);
                    binaryValue.push(remainder);
               }
               let binaryFinal = binaryValue.reverse().join("");
               result.value = binaryFinal;
          }
     });
}