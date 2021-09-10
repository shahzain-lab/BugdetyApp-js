import { DOMstring } from "./baseView";

export default class View{
         _nodeListForEach(list, callBack) {
                    
                    for (let i = 0; i < list.length; i++) {
                            callBack(list[i], i)
                    }
                };
    
         _formatingNum (num) {
            
            
            num = Math.abs(num);
            num = num.toFixed(2);
            let numSplit = num.split('.');
    
            let int = numSplit[0];
            if(int.length > 3){
                int = `${int.substr(0, int.length - 3)},${int.substr(int.length - 3, 3)}`;
            }
            const dec = numSplit[1]
    
          
            return ` $${int}<span class="decimal-amount">.${dec}</span>`
            
          
        };
    
        
           
            
    
            deleteListItem(selectorID) {
                var ele = document.getElementById(selectorID);
                ele.parentNode.removeChild(ele);
            }
    
            clearField() {
                
             const feild = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);
             const feildArr = Array.from(feild);
              feildArr.forEach(function(element) {
                 element.value = "";
               });
              feildArr[0].focus()
            }
    
    
            
    
            displayMonth() {
                // var now, month, months, year;
    
                // now = new Date();
                // months = ['Jan'," Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                // month = now.getMonth();
                // year = now.getFullYear();
                // const date = now.getDate();
                // const timeZone = now.getHours() > 12 ? ' PM' : 'AM'
                // document.querySelector(DOMstring.dateLabel).textContent = date + ' ' + months[month] + ', ' + year + ' at ' +now.getHours()+":"+now.getMinutes() + timeZone; 
    
            }
    
            changeInput() {
               var feilds;
    
               feilds = document.querySelectorAll(
                    DOMstring.inputType + ',' +
                    DOMstring.inputValue + ',' +
                    DOMstring.inputDescription
                );
    
                this._nodeListForEach(feilds, function(curr) {
                    curr.classList.toggle('red-focus')
                })
                document.querySelector(DOMstring.inputType).classList.toggle('red')
            }
    
            getDOMstring() {
                return DOMstring
            }
    
        }
    

