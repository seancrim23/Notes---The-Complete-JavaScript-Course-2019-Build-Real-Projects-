//this lecture is about using arrow functions

const years = [1900, 1921, 1281, 1920, 2001];

//ES5
var ages5 = years.map(function(current){
    return 2016 - current;
});
console.log(ages5);

//ES6
let ages6 = years.map(current => 2016 - current);
console.log(ages6);

ages6 = years.map((current, index) => `Age element ${index + 1}: ${2016 - current}`);
console.log(ages6);

//EXAMPLE OF MULTI LINE ARROW FUNCTION
ages6 = years.map((current, index) => {
    const now = new Date().getFullYear();
    const age = now - current;
    return `Age element ${index + 1}: ${age}`;
});
console.log(ages6);

/*
    lecture, arrow functions part 2\
*/

//ES5
var box5 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        var self = this;
        document.querySelector('.green').addEventListener('click', function(){
            var str = 'This is box' + self.position + ' and it is ' + self.color;
            alert(str);
        });
    }
}
//box5.clickMe();

//ES6 - we can write the same function with the arrow function and have access to the
//this keyword rather than doing the weird assignment of "this" to a variable in the
//above function
var box6 = {
    color: 'green',
    position: 1,
    clickMe: function(){
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
//box6.clickMe();

//if we change the clickMe function to an arrow function then the scope of the this keyword moves from the "box66" object from the previous function to the this keyword of the global scope

var position = 111;
var color = 'brown';

var box66 = {
    color: 'green',
    position: 1,
    clickMe: () => {
        document.querySelector('.green').addEventListener('click', () => {
            var str = 'This is box' + this.position + ' and it is ' + this.color;
            alert(str);
        });
    }
}
box66.clickMe();

function Person(name){
    this.name = name;
}

//ES5 - how to use bind to manually pass the "this" keyword to a function that normally cannot access the higher scoped this keyword
Person.prototype.myFriends5 = function(friends){
    
    var arr = friends.map(function(current){
       return this.name + ' is friends with ' + current;
    }.bind(this));
    
    console.log(arr);
}

var friends = ['ronda', 'juan', 'bo', 'zoom'];
new Person('john').myFriends5(friends);

//USING ES6, don't have to worry about the scope of the "this" keyword
Person.prototype.myFriends6 = function(friends){
    var arr = friends.map(current => `${this.name} is friends with ${current}`);
    console.log(arr);
}
new Person('hoobie').myFriends6(friends);

