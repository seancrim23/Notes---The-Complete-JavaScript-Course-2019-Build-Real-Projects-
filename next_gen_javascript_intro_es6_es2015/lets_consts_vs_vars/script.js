//this lecture is about let and const

//ES5
var name5 = 'jane smith';
var age5 = 23;
name5 = 'jane miller';
console.log(name5);

//ES6
const name6 = 'jane smith';
let age6 = 23;
//name6 = 'jane miller';
console.log(name6);

//ES5
function driversLicense5(passedTest){
    
    if(passedTest){
        var firstName = 'john';
        var yearOfBirth = 1990;
    }
    
    console.log(firstName + ' ' + yearOfBirth +
                   ' can drive now.');
    
}

driversLicense5(true);

//ES6
function driversLicense6(passedTest){
    let firstName;
    const yearOfBirth = 1990;
    if(passedTest){
        firstName = 'john';
    }
 
            console.log(firstName + ' ' + yearOfBirth +
                   ' can drive now.');
}

driversLicense6(true);

//ES6 (let and its block scope example)

let i = 23;

for(let i = 0; i < 10; i++){
    console.log(i);
}

console.log(i);

