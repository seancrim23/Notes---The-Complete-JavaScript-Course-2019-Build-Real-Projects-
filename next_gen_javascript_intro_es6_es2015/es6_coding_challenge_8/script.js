//ES6 Code Challenge #8 MY SOLUTION

/*
    small town admin, in charge of two town elements:
    - parks
    - streets
    
    small town, 3 parks 4 streets
    
    parks and streets have a name and build year
    
    boss wants a final report:
    1. tree density of each park in the town (number of trees/park area)
    2. average age of each towns park (sum of all ages/number of parks)
    3.name of the park that has more than 1000 trees
    4. total and average length of the town's streets
    5. size classification of all streets: tiny/small/normal/big/huge. if size is unknown, default is normal
    
    all report data should be printed to the console
    
    (use some ES6 features: classes, subclasses, template strings, default parameters, maps, arrow functions, destructuring)
*/

class Park {
    constructor(name, buildYear, numTrees, parkArea){
        this.name = name;
        this.buildYear = buildYear;
        this.numTrees = numTrees;
        this.parkArea = parkArea;
    }
    
    getAge(){
        return new Date().getFullYear() - this.buildYear;
    }
    
    getTreeDensity(){
        console.log(`${this.name} has a tree density of ${this.numTrees / this.parkArea} trees per square km.`);
    }
    
    hasGreaterThanThousandTrees(){
        this.numtrees > 1000 ? console.log(`${this.name} has more than 1000 trees.`) : this.name = this.name;
    }
}

class Street {
    constructor(name, buildYear, streetLength){
        this.name = name;
        this.buildYear = buildYear;
        this.streetLength = streetLength;
    }
    
    getSizeClassification(){
        let classification = '';
        if(this.streetLength <= 50){
            classification = 'tiny';
        }else if(this.streetLength > 50 && this.streetLength <= 150){
            classification = 'small';
        }else if(this.streetLength > 150 && this.streetLength <= 250){
            classification = 'normal';
        }else if(this.streetLength > 250 && this.streetLength <= 350){
            classification = 'big';
        }else{
            classification = 'huge';
        }
        
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification} street.`);
    }
}

const getAllTreeDensity = function(parks){
    parks.forEach(current => current.getTreeDensity());
}

const sumOfAllAges = function(parks){
    var sum = 0;
    parks.forEach(current => sum += current.getAge());
    return sum;
}

const getAverageParkAge = function(parks){
    console.log(`Our ${parks.length} have an average age of ${sumOfAllAges(parks)/parks.length} years.`);
}

const getParksWithThousandTrees = function(parks){
    parks.forEach(current => current.hasGreaterThanThousandTrees());
}

const sumOfAllLengths = function(streets){
    var sum = 0;
    streets.forEach(current => sum += current.streetLength);
    return sum;
}

const getSumAndAverageStreet = function(streets){
    console.log(`Our ${streets.length} have a total length of ${sumOfAllLengths(streets)} km, with an average of ${sumOfAllLengths(streets)/streets.length} km.`);
}

const getAllStreetClassifications = function(streets){
    streets.forEach(current => current.getSizeClassification());
}

let parks = [];
parks.push(new Park('Green Park', 1995, 500, 34));
parks.push(new Park('National Park', 1950, 1504, 125));
parks.push(new Park('Oak Park', 2001, 145, 15));

let streets = [];
streets.push(new Street('Ocean Avenue', 1999, 150));
streets.push(new Street('Evergreen Street', 1950, 12));
streets.push(new Street('45th Street', 2010, 500));
streets.push(new Street('Sunset Boulevard', 1982, 250));

const streetAndParksReport = function(parks, streets){
    console.log('------PARKS REPORT-----');
    getAverageParkAge(parks);
    getAllTreeDensity(parks);
    getParksWithThousandTrees(parks);
    console.log('-------STREETS REPORT----------');
    getSumAndAverageStreet(streets);
    getAllStreetClassifications(streets);
}

streetAndParksReport(parks, streets);


