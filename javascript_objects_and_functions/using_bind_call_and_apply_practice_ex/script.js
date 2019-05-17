// using the bind, call, and apply functions on functions

//example

var john = {
    name: 'John',
    age: 25,
    job: 'teacher',
    presentation: function(style, timeOfDay){
        if(style === 'formal'){
            console.log('Good ' + timeOfDay +
                       ', Ladies and gentlemen! I\'m ' + 
                       this.name + ', I\'m a ' +
                       this.job + ' and I\'m ' + 
                       this.age + ' years old.');
        }else if(style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name +
                       ', I\'m a ' + this.job +
                        ' and I\'m ' + this.age +
                       ' years old. Have a nice ' + 
                       timeOfDay + '.');
        }
    }
    
}

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('friendly', 'midnight');

//passing in "emily" object to the call function will replace the
//"this" object that would normally have "john" values with "emily" values 
john.presentation.call(emily, 'formal', 'afternoon');

//this will bind the john values to the "this" object, and will automatically
//state that the value of the first argument will always be "friendly"
var johnFriendly =
john.presentation.bind(john, 'friendly');
johnFriendly('morning');

var johnFriendlyMorning =
john.presentation.bind(john, 'friendly', 'morning');
johnFriendlyMorning();

var emilyFriendly =
john.presentation.bind(emily, 'friendly');
emilyFriendly('afternoon');

/*
    ANOTHER EXAMPLE
*/

var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn){
    var arrRes = [];
    for(var i = 0; i < arr.length; i++){
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(year){
    return 2016 - year;
}

function isFullAge(limit, year){
    return year >= limit;
}

var ages = arrayCalc(years, calculateAge);

var japanFullAge = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(japanFullAge);
var randomFullAge = arrayCalc(ages, isFullAge.bind(this, 1));
console.log(randomFullAge);