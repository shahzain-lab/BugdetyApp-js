import { DOMstring } from "./baseView";
import View from "./view";

class BookmarkView extends View{
    addLoadHandler(handler){
        window.addEventListener('load', handler)
    }

    displayBookmark(exp, inc) {
        exp.forEach(expEl => {
            this.addListItem(expEl, 'exp')
        });
        inc.forEach(incEl => {
            this.addListItem(incEl, 'inc')
        });
    }

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
      
}

export default new BookmarkView()