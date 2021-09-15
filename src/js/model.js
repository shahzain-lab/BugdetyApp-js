
class Transaction{
    constructor(id ,description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
}

class Expenses extends Transaction{
    constructor(id ,description, value) {
    super(id, description, value)
    this.percentage = -1;
 }
}
class Incomes extends Transaction{
     constructor(id ,description, value) {
        super(id, description, value)
 }
}


// Global App's state
export const state = {
    allItems: {
        exp: [],
        inc: []
    },
    totals: {
        exp: 0,
        inc: 0
    },
    budget: 0,
    percentage: -1,
}


         function calculateTotal(type) {
             const total = state.allItems[type].reduce((acc, curr) => {
                 acc += curr.value
                 return acc;
             }, 0);

             state.totals[type] = total;
         }
       
         function persistBookmark() {
            localStorage.setItem('bookmarks', JSON.stringify(state.allItems))
        }
     
          
        export function addItem(type ,des, val) {
             let newItem, ID;
             const itemArr = state.allItems[type];
    
             // generate ID
             itemArr.length > 0 ? ID = itemArr[itemArr.length - 1].id + 1 : ID = 0;
            
             // create object instance
             if(type === 'exp'){
               newItem =  new Expenses(ID, des, val);
             }
             if(type === 'inc'){
                 newItem = new Incomes(ID ,des ,val);
             }

             itemArr.push(newItem);
             // store to bookmark
             persistBookmark();

             return newItem;
         }
         
        export function deleteItem(type, id) {
             const ids = state.allItems[type].map(function(curr) {
                 return curr.id
             })
             const index = ids.indexOf(id);
     
             if(index !== -1){
                 state.allItems[type].splice(index, 1);
                  // store to bookmark
                persistBookmark();
             }
         }
     
         
     
         export function calculateBudget() {
             //calculate the total income and expense
             calculateTotal('exp');
             calculateTotal('inc');
             //calculate the budget: income - expense
             state.budget = state.totals.inc - state.totals.exp;
             //calculate the percentages
             if(state.totals.inc > 0){
                 state.percentage = Math.round((state.totals.exp / state.totals.inc) * 100); 
             }else{
                 state.percentage = -1
             }
         }
         
         function calcPercentage(totalIncome, curr) {
            if(totalIncome > curr.value){
                curr.percentage = Math.round((curr.value / totalIncome) * 100);
            }else{
                curr.percentage = -1;
            }
       }
     
        export function calculatePercentages() {
             state.allItems.exp.forEach(function(curr) {
                 calcPercentage(state.totals.inc, curr);
             })
         }

         export function updateItem(newItem, type) {
             const {description, value, id} = newItem;

            const ids = state.allItems[type].map(function(curr) {
                return curr.id
            })

            const index = ids.indexOf(id);
            if(index === -1) return;

             state.allItems[type][index].description = description;
             state.allItems[type][index].value = value;
              // store to bookmark
             persistBookmark()
         }

         

         
     
      export  function getPercentages() {
             const allPerc = state.allItems.exp.map(function(curr) {
                 return curr.percentage
             })
             return allPerc;
          }

         export function getBudget() {
             return{
                 budget: state.budget,
                 totalInc: state.totals.inc,
                 totalExp: state.totals.exp,
                 percentage: state.percentage
             }
         }
        

         function init() {
            const storage = localStorage.getItem('bookmarks');
        
            if(!storage) return;
            state.allItems = JSON.parse(storage);
            
        }
        
        init()