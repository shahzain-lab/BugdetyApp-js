import { DOMstring } from "./baseView";
import View from "./view";


class AddItemsView extends View{

    renderMarkup() {
        let html;
          //create HTML string placeholder text
           if(this._type === 'inc'){
            this._parentElement = document.querySelector(DOMstring.incomesContainer);
             html = this._generateMarkup('inc')
          }
           if(this._type === 'exp'){
             this._parentElement = document.querySelector(DOMstring.expensesContainer);
             html = this._generateMarkup('exp')
          } 

          //insert data to the DOM
           this._parentElement.insertAdjacentHTML('beforeend', html);
      }

      _generateMarkup() {
          return`
          <li class="${this._type}-list__item " id="${this._type}-${this._data.id}">
          <div class="desc_time--history">
              <span class="item-desc">${this._data.description}</span>
              <span class="item-time">28 feb,2021 at 4:50 AM</span>
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