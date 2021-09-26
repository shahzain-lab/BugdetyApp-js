import { DOMstring } from "./baseView";

export default class View{
  _incomeContainer = document.querySelector(DOMstring.incomesContainer);
  _expenseContainer = document.querySelector(DOMstring.expensesContainer);

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
         const curIncome = Array.from(this._incomeContainer.querySelectorAll('li'));
         const curExpense = Array.from(this._expenseContainer.querySelectorAll('li'));
             
         const transItems = (curEL) => {
           curEL.forEach((EL) => {
             if(EL.id === newElement[0].id){
             EL.innerHTML = newElement[0].innerHTML;
            }
           });
         } 

         transItems(curIncome);
         transItems(curExpense);
     }

     _generateMarkup() {
      return`
         <li class="${this._type}-list__item " id="${this._type}-${this._data.id}">
        <div class="desc_time--history">
          <span class="item-desc">${this._data.description}</span>
          <span class="item-time">${this.displayMonth(new Date())}</span>
        </div>
        <button class="update_trans--feild"><i class="fas fa-pencil-alt"></i></button>       
        <span class="trans_item--value">${this._type === 'exp' ? '-' : '+'} ${this._formatingNum(this._data.value)}</span>
           ${this._type === 'exp' ? '<div class="item__percentage"></div>' : ''}
         <div class="item__delete">
           <button class="item__delete--btn"><i class="fas fa-trash-alt fa-2x"></i></button>
         </div>
         </li>
           `;
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
        
            displayMonth(date) {
              // format: 28 feb,2021 at 4:50 AM

                const months = ['Jan'," Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const year = date.getFullYear();
                const month = date.getMonth();
                const day = date.getDate()
                let hours = date.getHours() > 12 ? ' PM' : 'AM';
                let minutes = date.getMinutes();
                let ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? `0${minutes}` : minutes;
                let strTime =  `${day} ${months[month]}, ${year} at ${hours}:${minutes} ${ampm}`;
                return strTime;

            }
    
        }
    

