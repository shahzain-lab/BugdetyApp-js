import { DOMstring } from "./baseView";
import View from "./view";


class AddItemsView extends View{

    renderMarkup() {
        let html;
          //create HTML string placeholder text
           if(this._type === 'inc'){
            this._parentElement = this._incomeContainer;
             html = this._generateMarkup('inc')
          }
           if(this._type === 'exp'){
             this._parentElement = this._expenseContainer;
             html = this._generateMarkup('exp')
          } 

          //insert data to the DOM
           this._parentElement.insertAdjacentHTML('beforeend', html);
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