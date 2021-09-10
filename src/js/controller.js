import fieldsView from "./views/FieldsView";
import * as model from './model';
import itemsView from "./views/addItemsView";
import budgetView from "./views/budgetView";


class Controller{

    constructor() {
        this.#init()
    }

    #setupEventListener() {
    // var DOM = UIctrl.getDOMstring();
    

    // document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    // document.querySelector(DOM.inputType).addEventListener('change', UIctrl.changeInput)
    }
    
    #updateBudget() {
        //1. calculate the budget
        model.calculateBudget();
        //2. Return the budget
        const budget = model.getBudget();
        //3. display the budget to UI
        budgetView.displayBudget(budget);
    }

    //function 3 for calculate budget
     #updatePercentage() {
        //1. calculate the percentage
        model.calculatePercentages();
        //2. Read the percentage from th budget controller
        var percentage = model.getPercentages();
        //3. display the percentage to the UI
        itemsView.displayPercentage(percentage);
    }

    //function 4 for getting input 
    #ctrlAddItem(getInput) {

        //1. get input data
        const {type, value, description} = getInput();
       
        if(description !== "" && !isNaN(value) && value > 0){
        //2. Add item to the budget controller
        const newItem = model.addItem(type, description, value);
        //3. Add the item to the UI
        itemsView.addListItem(newItem ,type);
        //4. clear the input feild
        fieldsView.clearField();
        //5. update the budget
        this.#updateBudget()
        //6. update the percentage
        this.#updatePercentage()
        }
    }
    //function 5 for deleting item 
    #ctrlDeleteItem(e) {
        var itemID, splitID, type, ID;
        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;

        if(itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. Delete th item from data structure
            budgetctrl.deleteItem(type, ID);
            //2. Delete the item from th UI
            UIctrl.deleteListItem(itemID);
            //3. update the UI
            this.#updateBudget();
            //4. update the percentage
            updatePercentage()
        }
    }

            #init() {
            console.log('Application has started');
            // UIctrl.displayMonth();
            budgetView.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            fieldsView.addSubmitHandler(this.#ctrlAddItem.bind(this))
            }
        }

new Controller();