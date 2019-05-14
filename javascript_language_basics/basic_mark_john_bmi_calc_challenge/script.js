/*
    CODING CHALLENGE 1
    
    Mark and John are comparing their BMI (Body Mass Index)
    
    BMI = mass / height * height
    
    mass in KG, height in meter
    
    1. Store Mark and John's mass and height in variables
    2. Calculate both of their BMIs
    3. Create a boolean variable containing info about whether Mark has a higher BMI than John.
    4. Print a string containing the results from step 3.
    
    Test data: markMass = 81.6
    markHeight = 2
    
    johnMass = 63.5
    johnHeight = 1.5
*/


var markMass = prompt('What is Marks mass? (IN KG)');
var markHeight = prompt('What is Marks height? (IN METERS)');

var johnMass = prompt('What is Johns mass? (IN KG)');
var johnHeight = prompt('What is Johns heights? (IN METERS)');

var markBMI = markMass / (markHeight * markHeight);
var johnBMI = johnMass / (johnHeight * johnHeight);
console.log('markBMI = ' + markBMI);
console.log('johnBMI = ' + johnBMI);

var markHigherBMIThanJohn = markBMI > johnBMI;

console.log('Is Marks BMI higher than Johns? ' + markHigherBMIThanJohn);