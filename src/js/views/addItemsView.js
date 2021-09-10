import { DOMstring } from "./baseView";
import View from "./view";


class AddItemsView extends View{
    addListItem(obj, type) {
        let html, element;
          //create HTML string placeholder text
           if(type === 'inc'){
               element = DOMstring.incomesContainer;

               html = `
             <li class="income-list__item" id="inc-${obj.id}">
                 <div class="desc_time--history">
                     <span class="item-desc">${obj.description}</span>
                     <span class="item-time">28 feb,2021 at 4:50 AM</span>
                 </div>
                 <button class="update_trans--feild">||</button>
             <span class="trans_item--value">+ ${this._formatingNum(obj.value)}</span>
             <div class="item__delete">
                                <button class="item__delete--btn"><i class="fas fa-trash-alt fa-2x"></i></button>
                            </div>
         </li>
             `;
          }
           if(type === 'exp'){
              element = DOMstring.expensesContainer;

              html = `
              <li class="expense-list__item " id="exp-${obj.id}">
                          <div class="desc_time--history">
                              <span class="item-desc">${obj.description}</span>
                              <span class="item-time">28 feb,2021 at 4:50 AM</span>
                          </div>
                      <button class="update_trans--feild">||</button>
                      <span class="trans_item--value">- ${this._formatingNum(obj.value)}</span>
                    <div class="item__percentage"></div>
                    <div class="item__delete">
                                <button class="item__delete--btn"><i class="fas fa-trash-alt fa-2x"></i></button>
                            </div>
                  </li>
              `;
          } 

          //insert data to the DOM
           document.querySelector(element).insertAdjacentHTML('beforeend', html)
      }

      displayPercentage(percentage) {
        const feilds = document.querySelectorAll(DOMstring.itemPercLabel);

        this._nodeListForEach(feilds, function(current ,i) {
            if(percentage[i] > 0){
                current.textContent = percentage[i] + '%'; 
            } else{
                current.textContent = '-1%'
            }
        })
    }
}

export default new AddItemsView()