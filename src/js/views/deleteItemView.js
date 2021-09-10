import { DOMstring } from "./baseView";

class DelItemView {
    addDeleteHandler(handler) {
        document.querySelector(DOMstring.container).addEventListener('click', (e) => {
        const btn = e.target.closest(DOMstring.deleteItemLabel);
        if(!btn) return;
        const itemID = btn.parentNode.parentNode.id
        handler(itemID)
        });
    }
      
    
    deleteListItem(selectorID) {
        const ele = document.getElementById(selectorID);
        ele.parentNode.removeChild(ele);
    }
}

export default new DelItemView()