//===============Budget Controller
var budgetController = (function() {
   var Expenses = function(id ,description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
       this.percentage = -1;
   }

   Expenses.prototype.calcPercentage = function(totalIncome) {
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
   }

   Expenses.prototype.getPercentage = function() {
        return this.percentage;
   }

   var Incomes = function(id ,description, value) {
       this.id = id;
       this.description = description;
       this.value = value;
   }
   
    function calculateTotal(type) {
     var sum = 0;
     data.allItems[type].forEach(function(curr) {
         sum += curr.value;
     })
     data.totals[type] = sum;
    }

   var data = {
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
   return{
    addItem: function(type ,des, val) {
        var newItem, ID;

        if(data.allItems[type].length > 0){
            ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
        }else{
            ID = 0;
        }

        if(type === 'exp'){
          newItem =  new Expenses(ID, des, val);
        }else if(type === 'inc'){
            newItem = new Incomes(ID ,des ,val);
        }

        data.allItems[type].push(newItem);
        return newItem;
        
    },


    deleteItem: function(type, id) {
        var ids , index;

        ids = data.allItems[type].map(function(curr) {
            return curr.id
        })
        index = ids.indexOf(id);

        if(index !== -1){
            data.allItems[type].splice(index, 1);
        }
    },


    calculateBudget: function() {
        //calculate the total income and expense
        calculateTotal('exp');
        calculateTotal('inc');
        //calculate the budget: income - expense
        data.budget = data.totals.inc - data.totals.exp;
        //calculate the percentages
        if(data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
        }else{
            data.percentage = -1
        }
    },


    calculatePercentages: function() {
        data.allItems.exp.forEach(function(curr) {
            curr.calcPercentage(data.totals.inc);
        })
    },

    getPercentages: function() {
        var allPerc = data.allItems.exp.map(function(curr) {
            return curr.getPercentage()
        })
        return allPerc;
     },
    getBudget: function() {
        return{
            budget: data.budget,
            totalInc: data.totals.inc,
            totalExp: data.totals.exp,
            percentage: data.percentage
        }
    },
   

    testing: function() {
        console.log(data);
    }
   }
})();



//===============UI Controller
var UIController = (function() {
    var DOMstring = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomesContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        itemPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };

        function nodeListForEach(list, callBack) {
                
                for (let i = 0; i < list.length; i++) {
                        callBack(list[i], i)
                }
            };

    var formatingNum = function(num, type) {
        var numSplit, type, int, dec
        
        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');

        int = numSplit[0];
        if(int.length > 3){
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3)
        }
        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+')+ ' ' + int + '.' + dec;
    };

    return{
        getInput: function() {
           return{
             type: document.querySelector(DOMstring.inputType).value,
             description: document.querySelector(DOMstring.inputDescription).value,
             value: parseFloat(document.querySelector(DOMstring.inputValue).value)
        }
    },
        addListItem: function(obj, type) {
          var html, newHtml, element;
            //create HTML string placeholder text
             if(type === 'inc'){
                 element = DOMstring.incomesContainer;

                 html = ' <div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div> <div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">X</i></button></div></div></div>'
             }else if(type === 'exp'){
                element = DOMstring.expensesContainer;

                 html = ' <div class="item clearfix" id="exp-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline">X</i></button></div></div></div>'
             }
            //replace the HTML placeholder with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatingNum(obj.value, type))
            //insert that data to the DOM
             document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)
        },

        deleteListItem: function(selectorID) {
            var ele = document.getElementById(selectorID);
            ele.parentNode.removeChild(ele);
        },

        clearField: function() {
            var feild, feildArr;
            feild = document.querySelectorAll(DOMstring.inputDescription + ',' + DOMstring.inputValue);
           feildArr = Array.prototype.slice.call(feild);
           feildArr.forEach(function(element) {
               element.value = "";
           });
           feildArr[0].focus()
        },

        displayBudget: function(obj) {
            var type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';

           document.querySelector(DOMstring.budgetLabel).textContent = formatingNum(obj.budget, type);
           document.querySelector(DOMstring.incomeLabel).textContent = formatingNum(obj.totalInc ,'inc');
           document.querySelector(DOMstring.expenseLabel).textContent = formatingNum(obj.totalExp, 'exp');
           if(obj.budget > 0){
               document.querySelector(DOMstring.percentageLabel).textContent = obj.percentage + '%';
           }else{
            document.querySelector(DOMstring.percentageLabel).textContent = '--';
           }
        },

        displayPercentage: function(percentage) {
            var feild;
            feild = document.querySelectorAll(DOMstring.itemPercLabel);

         

            nodeListForEach(feild, function(current ,i) {
                if(percentage[i] > 0){
                    current.textContent = percentage[i] + '%'; 
                } else{
                    current.textContent = '--'
                }
            })
        },

        displayMonth: function() {
            var now, month, months, year;

            now = new Date()
            months = ['January'," February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "November", "December"];
            month = now.getMonth();
            year = now.getFullYear();

            document.querySelector(DOMstring.dateLabel).textContent = months[month] + ' ' + year; 

        },

        changeInput: function() {
           var feilds;

           feilds = document.querySelectorAll(
                DOMstring.inputType + ',' +
                DOMstring.inputValue + ',' +
                DOMstring.inputDescription
            );

            nodeListForEach(feilds, function(curr) {
                curr.classList.toggle('red-focus')
            })
            document.querySelector(DOMstring.inputType).classList.toggle('red')
        },

        getDOMstring: function() {
            return DOMstring
        },

    }
})();





//===============Global Controller
var controller = (function(budgetctrl ,UIctrl) {
    //function 1 for event listener
    function setupEventListener() {
    var DOM = UIctrl.getDOMstring();
    document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
    document.addEventListener('keypress',function(e) {
        if(e.keyCode === 13 || e.which === 13){
            ctrlAddItem()
        };
    })
    document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    document.querySelector(DOM.inputType).addEventListener('change', UIctrl.changeInput)
    }
    //function 2 for calculate budget
    function updateBudget() {
        //1. calculate the budget
        budgetctrl.calculateBudget();
        //2. Return the budget
        var budget = budgetctrl.getBudget();
        //3. display the budget to UI
        UIctrl.displayBudget(budget);
    }

    //function 3 for calculate budget
    var updatePercentage = function() {
        //1. calculate the percentage
        budgetctrl.calculatePercentages();
        //2. Read the percentage from th budget controller
        var percentage = budgetctrl.getPercentages();
        //3. display the percentage to the UI
        UIctrl.displayPercentage(percentage);
    }

    //function 4 for getting input 
    function ctrlAddItem() {
        var input, newItem;        
        //1. get input data
        input = UIctrl.getInput();
        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
        //2. Add item to the budget controller
        newItem = budgetctrl.addItem(input.type, input.description, input.value);
        //3. Add the item to the UI
        UIctrl.addListItem(newItem ,input.type);
        //4. clear the input feild
        UIctrl.clearField();
        //5. update the budget
        updateBudget()
        //6. update the percentage
        updatePercentage()
        }
    }
    //function 5 for deleting item 
    function ctrlDeleteItem(e) {
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
            updateBudget();
            //4. update the percentage
            updatePercentage()
        }
    }

    return{
        init: function() {
            console.log('Application has started');
            UIctrl.displayMonth();
            UIctrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            })
            setupEventListener();
        }
    }
})(budgetController, UIController);

controller.init()