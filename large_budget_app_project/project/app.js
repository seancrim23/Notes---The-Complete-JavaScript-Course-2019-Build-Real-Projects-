//writing modules with the module pattern
//budget controller
var budgetController = (function(){
    
    //some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    Expense.prototype.calcPercentage = function(totalIncome){
        
        if(totalIncome > 0){
            this.percentage = Math.round((this.value / totalIncome) * 100);
        }else{
            this.percentage = -1;
        }
        
    };
    
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    };
    
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
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
    };
    
    var calculateTotal = function(type){
        var sum = 0;
        data.allItems[type].forEach(function(current, index, array){
             sum += current.value;
        });
        data.totals[type] = sum;
    };
    
    return {
        addItem: function(type, des, val){
            var newItem, ID;
            
            //create new ID 
            if(data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length-1].id + 1;
            }else{
                ID = 0;
            }
            
            //create new item based on type (inc or exp)
            if(type === 'inc'){
                newItem = new Income(ID, des, val);
            } else if (type === 'exp'){
                newItem = new Expense(ID, des, val);
            }
            
            //push the new item onto the data structure
            data.allItems[type].push(newItem);
            
            //return the new element
            return newItem;
        },
        calculateBudget: function(){
          
            //calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            //calculate the budget (income - expenses)
            data.budget = data.totals.inc - data.totals.exp;
            //calculate the percentage of income that was spent
            if(data.totals.inc > 0){
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            }else{
                data.percentage = -1;
            }
        },
        calculatePercentages: function(){
            
            /*
                a=20, b=10, c=40
                income = 100
                percA = 20/100 = 20%
                percB = 10/100 = 10%
                percC = 40/100 = 40%
            */
            data.allItems.exp.forEach(function(current, index, array){
                current.calcPercentage(data.totals.inc); 
            });
            
        },
        getPercentages: function(){
            var allPerc = data.allItems.exp.map(function(current){
                return current.getPercentage();
            }); 
            return allPerc;
        },
        getBudget: function(){
          return {
              budget: data.budget,
              totalInc: data.totals.inc,
              totalExp: data.totals.exp,
              percentage: data.percentage
          }; 
        },
        deleteItem: function(type, id){
            var ids, index;
            
            //id = 3
            ids = data.allItems[type].map(function(current, index, array){
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allItems[type].splice(index, 1);
            }
        },
        testing: function(){
            console.log(data);
        }
    };
    
})();

//ui controller
var UIController = (function(){
    
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        htmlIncomeString: '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>',
        htmlExpenseString: '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        budgetIncLabel: '.budget__income--value',
        budgetExpLabel: '.budget__expenses--value',
        budgetPercLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercentageLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    
    
    var formatNumber = function(num, type){
            var numSplit, int, dec, sign;
            /*
            
                + or - before the number
                exactly 2 decimal points
                comma separating the thousands
                
                2310.4567 -> + 2,310.46
                2000 -> + 2,000.00
            */
            
            num = Math.abs(num);
            num = num.toFixed(2);
            
            numSplit = num.split('.');
            int = numSplit[0];
            if(int.length > 3){
                int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
            }
            dec = numSplit[1];
            type === 'exp' ? sign = '-' : sign = '+';
            
            return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
        }
    //some code
    var nodeListForEach = function(list, callback) {
        for(var i = 0; i < list.length; i++){
            callback(list[i], i);
        }  
    };
    
    return {
        //function to get some input
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
            };
        },
        addListItem: function(obj, type){
            var html, newHtml, element;
            //create HTML string with placeholder text
            if(type === 'inc'){
                element = DOMStrings.incomeContainer;
                html = DOMStrings.htmlIncomeString;
            }else if(type === 'exp'){
                element = DOMStrings.expensesContainer;
                html = DOMStrings.htmlExpenseString;
            }
            
            //replace the placeholder text with data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            //insert HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        getDOMStrings: function(){
            return DOMStrings;
        },
        clearFields: function(){
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + ', ' + DOMStrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array){
                current.value = "";
            });
            
            fieldsArr[0].focus();
        },
        displayBudget: function(obj){
            
            obj.budget > 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.budgetIncLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.budgetExpLabel).textContent = formatNumber(obj.totalExp, 'exp');

            
            if(obj.percentage > 0){
                document.querySelector(DOMStrings.budgetPercLabel).textContent = obj.percentage + '%';
            }else{
                document.querySelector(DOMStrings.budgetPercLabel).textContent = '---';
            }
            
        },
        deleteListItem: function(selectorID){
            var element = document.getElementById(selectorID);
            element.parentNode.removeChild(element);
        },
        displayPercentages: function(percentages){
            
            var fields = document.querySelectorAll(DOMStrings.expensesPercentageLabel);
            
            nodeListForEach(fields, function(current, index){
                
                if(percentages[index] > 0){
                    current.textContent = percentages[index] + '%';
                }else{
                    current.textContent = '---';        
                }
                
            });
            
        },
        displayMonth: function(){
            var now, months;
            now = new Date();
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            document.querySelector(DOMStrings.dateLabel).textContent = months[now.getMonth()] + ' ' + now.getFullYear();
        },
        changedType: function(){
            
            var fields = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );
            
            nodeListForEach(fields, function(cur){
                cur.classList.toggle('red-focus'); 
            });
            
            document.querySelector(DOMStrings.inputButton).classList.toggle('red');
            
        }

    }
    
})();

//global app controller 
var controller = (function(budgetCtrl, UICtrl){
    
    var setupEventListeners = function(){
        var DOM = UICtrl.getDOMStrings();
        
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event){
       
            //console.log(event);
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changedType);
        
    };
    
    var updateBudget = function(){
        var budget;
        //calc the budget
        budgetCtrl.calculateBudget();
        //return the budget
        budget = budgetCtrl.getBudget();
        //display the budget on the UI
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function(){
        var percentages;
        //calculate percentages
        budgetCtrl.calculatePercentages();
        //read them from budget ctrl
        percentages = budgetCtrl.getPercentages();
        //display percentages on UI
        UICtrl.displayPercentages(percentages);
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        //get the field input data
        input = UICtrl.getInput(); 

        if(input.description !== "" && !isNaN(input.value) && input.value > 0){
            //add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
            //add the new item to the UI
            UICtrl.addListItem(newItem, input.type);
        
            //clear the fields
            UICtrl.clearFields();
        
            //calculate and update budget
            updateBudget();
            
            updatePercentages();
        }
    };
    
    var ctrlDeleteItem = function(event){
        var itemID, splitID, type, ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if(itemID){
            
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //delete item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            //delete the item from the ui
            UICtrl.deleteListItem(itemID);
            //update and show the new budget
            updateBudget();
            
            updatePercentages();
        }
    };
    
    return {
        init: function(){
            console.log('Application has started.');
            UICtrl.displayBudget({       
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0
            });
            UICtrl.displayMonth();
            setupEventListeners();
        }
    }
    

    
})(budgetController, UIController);

controller.init();