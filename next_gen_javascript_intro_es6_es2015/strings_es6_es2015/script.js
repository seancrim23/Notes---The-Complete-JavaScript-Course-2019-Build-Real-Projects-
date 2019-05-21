//this lecture is about strings in ES6

let firstName = 'sean';
let lastName = 'john';
const yearOfBirth = 1990;

function calcAge(year){
    return 2016 - year;
}

//ES5
console.log('this is ' + firstName + ' ' + lastName + '. He was born in ' + yearOfBirth + '. So today he is ' + calcAge(yearOfBirth) + ' years old.');

//ES6 - string literals!!! yayyyyyyy
console.log(`this is ${firstName} ${lastName}. He was born in ${yearOfBirth}. Today he is ${calcAge(yearOfBirth)} years old.`);

const n = `${firstName} ${lastName}`;
console.log(n.startsWith('s'));
console.log(n.endsWith('hn'));
console.log(n.includes('hii'));
console.log(`${firstName} `.repeat(5));
