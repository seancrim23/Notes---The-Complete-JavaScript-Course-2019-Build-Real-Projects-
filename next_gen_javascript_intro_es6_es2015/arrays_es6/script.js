//this lecture is about arrays in es6

const boxes = document.querySelectorAll('.box');

//ES5
var boxesArr5 = Array.prototype.slice.call(boxes);
boxesArr5.forEach(function(current){
    current.style.backgroundColor = 'dodgerblue';
});

//ES6
Array.from(boxes).forEach(current => current.style.backgroundColor = 'dodgerblue');

//ES5
/*for(var i = 0; i < boxesArr5.length; i++){
    
    if(boxesArr5[i].className === 'box blue'){
        continue;
        //continue will break the loop and continue the for loop
        //break will break the loop completely
    }
    
    boxesArr5[i].textContent = 'i changed to blue!';
    
}*/

//ES6 -
for(const cur of boxesArr5){
    if(cur.className == 'box blue'){
        continue;
    }
    cur.textContent = 'woooooahhhhhh';
}

//ES5
var ages = [12, 8, 19, 21, 90, 121];

var full = ages.map(function(current){
   return current >= 18; 
});
console.log(full);

console.log(full.indexOf(true));

//ES6
console.log(ages.findIndex(current => current >= 18));
console.log(ages.find(current => current >= 18));