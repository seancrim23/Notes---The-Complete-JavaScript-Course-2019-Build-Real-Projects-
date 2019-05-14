/*
    CODING CHALLENGE 3
    
    John and family went to three different restaurants on holiday.
    
    The bills were:
    124
    48
    268
    
    John created tip calculator:
    if bill is less than 50 bucks, John tips 20%
    if bill is between 50 and 200, John tips 15%
    if bill is more than 200, John tips 10%
    
    John would like 2 arrays:
    1. containing all three tips (one for each bill)
    2. containing all three final paid amounts (bill + tip)
*/

function tipCalculator(bill){
    if(bill <= 50){
        return bill * .2;
    }else if(bill > 50 && bill <= 200){
        return bill * .15;
    }else{
        return bill * .1;
    }
    return null;
}

function totalsWithTip(bill, tip){
    return bill + tip;
}

var johnRestaurantBills = [124, 48, 268];
var johnTips = [tipCalculator(johnRestaurantBills[0]),
               tipCalculator(johnRestaurantBills[1]),
               tipCalculator(johnRestaurantBills[2])];
var johnTotalsWithTip = [totalsWithTip(johnRestaurantBills[0], johnTips[0]),
                        totalsWithTip(johnRestaurantBills[1], johnTips[1]),
                        totalsWithTip(johnRestaurantBills[2], johnTips[2])];

console.log('John\'s tips: ' + johnTips);
console.log('John\'s totals: ' + johnTotalsWithTip);