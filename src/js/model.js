
    class Expenses{
    constructor(id ,description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
    this.percentage = -1;
}
calcPercentage(totalIncome) {
     if(totalIncome > 0){
         this.percentage = Math.round((this.value / totalIncome) * 100);
     }else{
         this.percentage = -1;
     }
}

getPercentage() {
     return this.percentage;
}
}


class Incomes{
     constructor(id ,description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
}
}

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
    percentage: -1
}


         function calculateTotal(type) {
             const total = state.allItems[type].reduce((acc, curr) => {
                 acc += curr.value
                 return acc;
             }, 0);

             state.totals[type] = total;
         }
     
          
        export function addItem(type ,des, val) {
             let newItem, ID;
             const itemArr = state.allItems[type];
     
             itemArr.length > 0 ? ID = itemArr[itemArr.length - 1].id + 1 : ID = 0;
     
             if(type === 'exp'){
               newItem =  new Expenses(ID, des, val);
             }
             if(type === 'inc'){
                 newItem = new Incomes(ID ,des ,val);
             }
     
             itemArr.push(newItem);
             return newItem;
             
         }
     
     
         function deleteItem(type, id) {
             var ids , index;
     
             ids = data.allItems[type].map(function(curr) {
                 return curr.id
             })
             index = ids.indexOf(id);
     
             if(index !== -1){
                 data.allItems[type].splice(index, 1);
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
     
     
        export function calculatePercentages() {
             state.allItems.exp.forEach(function(curr) {
                 curr.calcPercentage(state.totals.inc);
             })
         }
     
      export  function getPercentages() {
             var allPerc = state.allItems.exp.map(function(curr) {
                 return curr.getPercentage()
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
        

