//writing modules with the module pattern
//budget controller
var budgetController = (function(){
    
    //some code
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
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
        }
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
        inputButton: '.add__btn'
    };
    
    //some code
    //function to get some input
    return {
        getInput: function(){
            return {
                type: document.querySelector(DOMStrings.inputType).value,
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: document.querySelector(DOMStrings.inputValue).value
            };
        },
        getDOMStrings: function(){
            return DOMStrings;
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
        
    };
    
    var ctrlAddItem = function(){
        //get the field input data
        var input = UICtrl.getInput(); 
        //add the item to the budget controller
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        
        //add the new item to the UI
        
        //calculate the budget
        
        //display the budget on the UI 
        
    }
    
    return {
        init: function(){
            console.log('Application has started.');
            setupEventListeners();
        }
    }
    

    
})(budgetController, UIController);

controller.init();