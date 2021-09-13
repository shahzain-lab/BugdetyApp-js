import { DOMstring } from "./baseView";

export default class View{

    addListItem(data, type){
        this._data = data;
        this._type = type;
        this.renderMarkup()
    }

         _nodeListForEach(list, callBack) {
                    
                    for (let i = 0; i < list.length; i++) {
                            callBack(list[i], i)
                    }
                };

                update(data,type) {
                    this._data = data;
                    this._type = type;
                    const newMarkup = this._generateMarkup();
                    const newDom = document.createRange().createContextualFragment(newMarkup);
                    const newElement = Array.from(newDom.querySelectorAll('*'));
                    const curIncome = Array.from(document.querySelector(DOMstring.incomesContainer).querySelectorAll('li'));
                    const curExpense = Array.from(document.querySelector(DOMstring.expensesContainer).querySelectorAll('li'));
                    
                   
                    curIncome.forEach((curEl) => {
                      if(curEl.id === newElement[0].id){
                        curEl.innerHTML = newElement[0].innerHTML;
                      }
                    });

                    curExpense.forEach((curEl) => {
                      if(curEl.id === newElement[0].id){
                        curEl.innerHTML = newElement[0].innerHTML;
                      }
                    });
                }
    
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
    
        }
    

