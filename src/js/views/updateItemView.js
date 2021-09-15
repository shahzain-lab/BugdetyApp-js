import { DOMstring } from "./baseView"
import View from "./view";

class UpdateItemView extends View{
    #overlay = document.querySelector(DOMstring.overlay);
    #window = document.querySelector(DOMstring.windowBox);
    #openForm = document.querySelector(DOMstring.updateForm);
    #inpDesc = document.querySelector(DOMstring.updateInpDesc);
    #inpValue = document.querySelector(DOMstring.updateInpValue);
    #itemID;

    constructor() {
        super()
        this.#showFormWindow()       
    }

    addUpdateItemHandler() {
        document.querySelector(DOMstring.container).addEventListener('click', (e) => {
            const btn = e.target.closest(DOMstring.updateItemBtn);
            if(!btn) return;
            const parentEL = btn.parentNode.children;
            this.#itemID = btn.parentNode.id
            this.#inpDesc.value = parentEL.item(0).firstElementChild.textContent;
            const value = parentEL.item(2).textContent;
            this.#inpValue.value = parseInt(value.replace(/[^0-9\.]/g, ''), 10);
    
            this.#toggleFormWindow();
    }
)};

addUpdateFormHandler(handler) {
    this.#openForm.addEventListener('submit', (e) => {
        e.preventDefault()
        this.#toggleFormWindow();
        handler(this.#inpDesc.value,Number(this.#inpValue.value), this.#itemID)
    }
    )
}


#toggleFormWindow() {
    this.#overlay.classList.toggle('hidden');
    this.#window.classList.toggle('hidden');
}

#showFormWindow() {
    this.#overlay.addEventListener('click', this.#toggleFormWindow.bind(this));

}
}

export default new UpdateItemView()