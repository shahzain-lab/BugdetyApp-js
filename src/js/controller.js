import fieldsView from "./views/FieldsView";
import * as model from './model';
import addItemsView from "./views/addItemsView";
import budgetView from "./views/budgetView";
import delItemView from "./views/deleteItemView";
import updateItemView from "./views/updateItemView";


class Controller{
    #NewItemID;
    #newItemType

    constructor() {
        this.#init()
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
        addItemsView.displayPercentage(percentage);
    }

    //function 4 for getting input 
    #ctrlAddItem(getInput) {
        //1. get input data
        const {type, value, description} = getInput();
       
        if(description !== "" && !isNaN(value) && value > 0){
        //2. Add item to the budget controller
        const newItem = model.addItem(type, description, value);
        //3. Add the item to the UI
        addItemsView.addListItem(newItem ,type);
        //5. update the budget
        this.#updateBudget()
        //6. update the percentage
        this.#updatePercentage()
        }
    }
    //function 5 for deleting item 
    #ctrlDeleteItem(itemID) {

        if(!itemID) return;
        const [type, num] = itemID.split('-');
        const ID = parseInt(num);

        //1. Delete th item from data structure
        model.deleteItem(type, ID);
        //2. Delete the item from th UI
        delItemView.deleteListItem(itemID);
        //3. update the UI
        this.#updateBudget();
        //4. update the percentage
        this.#updatePercentage()
        
    }

    // #ctrlUpdateItem(itemID) {
    //     if(!itemID) return;
    //     const [type, num] = itemID.split('-');
    //     this.#newItemType = type
    //     const ID = parseInt(num);

    //     //1. update th item in data structure
    //     const item = model.updateItem(this.#newItemType, ID);
        
    //     //render obj
    //     updateItemView.addListItem(item,this.#newItemType);

    // }

    #ctrlUpdateForm(description, value, itemID) {
        
        if(!itemID) return;
        const [type, num] = itemID.split('-');
        const id = parseInt(num);

        const updItem = model.updateItem(description, value, id, type);
        
        addItemsView.update(updItem, type);
        console.log(model.state);
        //3. update the UI
        this.#updateBudget();
        //4. update the percentage
        this.#updatePercentage()
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
            fieldsView.addChangeTypeHandler();
            updateItemView.addUpdateItemHandler();
            fieldsView.addSubmitHandler(this.#ctrlAddItem.bind(this));
            delItemView.addDeleteHandler(this.#ctrlDeleteItem.bind(this));
            updateItemView.addUpdateFormHandler(this.#ctrlUpdateForm.bind(this))
            }
        }

new Controller();