import { DOMstring } from "./baseView";
import View from "./view";

class FieldsView extends View{

    addChangeTypeHandler() {
        document.querySelector(DOMstring.inputType).addEventListener('change', (e) => {
            if(e.target.value === 'inc'){
                this.#typeToggler()
            };
            if(e.target.value === 'exp'){
                this.#typeToggler()
            }
        })
    }
    
    #typeToggler() {  
        document.querySelector(DOMstring.incTypeLabel).classList.toggle('hidden');
        document.querySelector(DOMstring.expTypeLabel).classList.toggle('hidden');
        document.querySelector(DOMstring.submitBTN).classList.toggle('inc__sub-btn');
        document.querySelector(DOMstring.submitBTN).classList.toggle('exp__sub-btn');
    }

    addSubmitHandler(handler) {
        document.querySelector(DOMstring.formLabel).addEventListener('submit', e => {
            e.preventDefault();
            handler(this.#getInput);
            this.#clearField()
        } )
    }

    #getInput() {
        return{
          type: document.querySelector(DOMstring.inputType).value,
          description: document.querySelector(DOMstring.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstring.inputValue).value)
     }
 }
 #clearField() {
                
    const feild = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);
    const feildArr = Array.from(feild);
     feildArr.forEach(function(element) {
        element.value = "";
      });
     feildArr[0].focus()
   }
}

export default new FieldsView()