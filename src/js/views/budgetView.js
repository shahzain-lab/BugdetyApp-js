import { DOMstring } from "./baseView";
import View from "./view";

class BudgetView extends View{
    #type;
    displayBudget(data) {
        data.budget >= 0 ? this.#type = 'inc' : this.#type = 'exp';

       document.querySelector(DOMstring.budgetLabel).innerHTML = `${this.#type === 'exp' ? '-' : '+'}${this._formatingNum(data.budget)}`;
       document.querySelector(DOMstring.incomeLabel).innerHTML = this._formatingNum(data.totalInc);
       document.querySelector(DOMstring.expenseLabel).innerHTML = this._formatingNum(data.totalExp);
       if(data.budget > 0){
           document.querySelector(DOMstring.percentageLabel).textContent = data.percentage + '%';
       }else{
        document.querySelector(DOMstring.percentageLabel).textContent = '--';
       }
    }
}

export default new BudgetView();