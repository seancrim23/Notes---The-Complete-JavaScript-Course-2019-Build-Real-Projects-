/*
    CODING CHALLENGE 4
    
    John and Mark BMI Calculator With Objects
    
    1.for each person, create an object with properties for their full name, mass,
    and height.
    2. then, add a method to each to calc the BMI. save the BMI to the object and also return it from the method.
    3. log to console who has highest BMI, together with full name and respective BMI. check for same BMI
    
    BMI = mass / (height * height)
*/

var John = new Object();
John.fullName = 'John Smith';
John.mass = 400;
John.height = 3;
John.calcBMI = function(){
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
};

var Mark = new Object();
Mark.fullName = 'Mark Johnson';
Mark.mass = 100;
Mark.height = 3;
Mark.calcBMI = function(){
    this.BMI = this.mass / (this.height * this.height);
    return this.BMI;
};

if(John.calcBMI() > Mark.calcBMI()){
    console.log(John.fullName + ' has the highest BMI of ' + John.BMI);
}else if(Mark.calcBMI() > John.calcBMI()){
    console.log(Mark.fullName + ' has the highest BMI of ' + Mark.BMI);
}else{
    console.log(Mark.fullName + ' and ' + John.fullName + ' have the same BMI.');
}