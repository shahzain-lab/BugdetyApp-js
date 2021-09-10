import { DOMstring } from "./baseView";
import View from "./view";

class FieldsView extends View{

    addSubmitHandler(handler) {
        document.querySelector(DOMstring.formLabel).addEventListener('submit', e => {
            e.preventDefault();
            handler(this.#getInput);
        } )
    }

    #getInput() {
        return{
          type: document.querySelector(DOMstring.inputType).value,
          description: document.querySelector(DOMstring.inputDescription).value,
          value: parseFloat(document.querySelector(DOMstring.inputValue).value)
     }
 }
}

export default new FieldsView()