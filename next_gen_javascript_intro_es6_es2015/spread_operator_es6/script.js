//this lecture is about the spread operator

function addFourAges (a, b, c, d){
    return a + b + c + d;
}

var sum1 = addFourAges(1, 2, 3, 4);
console.log(sum1);

//ES5
var ages = [1, 2, 3, 4, 5];
var sum2 = addFourAges.apply(null, ages);
console.log(sum2);

//ES6
const sum3 = addFourAges(...ages);
console.log(sum3);

const familySmith = ['John', 'jane', 'mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');
const all = [h, ...boxes];
console.log(all);
console.log(Array.from(all));
all.forEach(current => current.style.color = 'blue');
//Array.from(all).forEach(current => current.style.color = 'purple');