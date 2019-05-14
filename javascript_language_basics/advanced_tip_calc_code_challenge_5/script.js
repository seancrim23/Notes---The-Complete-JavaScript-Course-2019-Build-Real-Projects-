/*
    CODING CHALLENGE 5
    
    John holiday restaurant man.
    Went to 5 restaurants.
    bills were:
    124
    48
    268
    180
    42
    
    tip:
    when bill is less than 50, tip 20%
    when bill is between 50 and 200, tip 15
    when bill is more than 200, tip 10
    
    requirements:
    1. create object with array for bill values
    2. add method to calculate the tip
    3. method should include a loop to iterate over paid bills and do calcs
    4. as output, create a new array including all tips and an array containing final paid amounts
    
    extra, mark:
    mark did same thing
    bills were:
    77
    375
    110
    45
    
    tips:
    20% when less than 100
    10% when bill is between 100 and 300
    25% if bill is more than 300
    
    1. implement a mark object with same functionality
    2. create a function to calculate the average of a given array of tips
    3. calculate average tip for each family
    4. log to console who paid the highest avg tip
*/

function getAvgTips(tips){
    var total = 0;
    for(var i = 0; i < tips.length; i++){
        total += tips[i];
    }
    return total/tips.length;
}

var john = new Object();
john.restaurantBills = [124, 48, 268, 180, 42];
john.restaurantTips = [];
john.restaurantTotals = [];
john.calculateJohnTip = function(restaurantBill){
    if(restaurantBill < 50){
        return restaurantBill * .2;
    }else if(restaurantBill >= 50 && restaurantBill <= 200){
        return restaurantBill * .15;
    }else{
        return restaurantBill * .1;
    }
    return null;
};
john.calculateRestaurantValues = function(){
    for(var i = 0; i < this.restaurantBills.length; i++){
        this.restaurantTips.push(this.calculateJohnTip(this.restaurantBills[i]));
        this.restaurantTotals.push(this.restaurantBills[i] + this.restaurantTips[i]);
    }
};

john.calculateRestaurantValues();
console.log('John\'s tips: ' + john.restaurantTips);
console.log('John\'s totals: ' + john.restaurantTotals);

var mark = new Object();
mark.restaurantBills = [77, 375, 110, 45];
mark.restaurantTips = [];
mark.restaurantTotals = [];
mark.calculateMarkTip = function(restaurantBill){
    if(restaurantBill < 100){
        return restaurantBill * .2;
    }else if(restaurantBill >= 100 && restaurantBill <= 300){
        return restaurantBill * .1;
    }else{
        return restaurantBill * .25;
    }
    return null;
};
mark.calculateRestaurantValues = function(){
    for(var i = 0; i < this.restaurantBills.length; i++){
        this.restaurantTips.push(this.calculateMarkTip(this.restaurantBills[i]));
        this.restaurantTotals.push(this.restaurantBills[i] + this.restaurantTips[i]);
    }
};

mark.calculateRestaurantValues();
console.log('Mark\'s tips ' + mark.restaurantTips);
console.log('Mark\'s totals ' + mark.restaurantTotals);

var avgJohnTip = getAvgTips(john.restaurantTips);
var avgMarkTip = getAvgTips(mark.restaurantTips);
console.log('avgJohnTip ' + avgJohnTip);
console.log('avgMarkTip ' + avgMarkTip);

if(avgJohnTip > avgMarkTip){
    console.log('John had the highest average tip of ' + avgJohnTip);
}else if(avgMarkTip > avgJohnTip){
    console.log('Mark had the highest average tip of ' + avgMarkTip);
}else{
    console.log('Both had the same average tip!');
}

