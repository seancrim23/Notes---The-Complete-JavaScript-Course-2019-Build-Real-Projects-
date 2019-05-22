//ES6 Code Challenge #8 INSTRUCTOR SOLUTION

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

class Element {
    constructor(name, buildYear){
        this.name = name;
        this.buildYear = buildYear;
    }
}

class Park extends Element {
    constructor(name, buildYear, area, numTrees){
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }
    
    treeDensity(){
        const density = this.numTrees / this.area;
        console.log(`${this.name} has a tree density of ${density} trees per square km.`);
    }
}

class Street extends Element {
    constructor(name, buildYear, length, size = 3){
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }
    
    classifyStreet(){
        const classification = new Map();
        classification.set(1, 'tiny');
        classification.set(2, 'small');
        classification.set(3, 'normal');
        classification.set(4, 'big');
        classification.set(5, 'huge');
        console.log(`${this.name}, built in ${this.buildYear}, is a ${classification.get(this.size)} street.`);
    }
}

const allParks = [new Park('Green Park', 1987, 0.2, 215),
                 new Park('National Park', 1895, 2.9, 3541),
                 new Park('Oak Park', 1953, 0.4, 949)];
const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4),
                   new Street('Evergreen Street', 2008, 2.7, 2),
                   new Street('4th Street', 2015, 0.8),
                   new Street('Sunset Boulevard', 1982, 2.5, 5)];

function calc(arr){
    
    const sum = arr.reduce((prev, cur, index) => prev + cur, 0);
    
    return [sum, sum/arr.length];
    
}

function reportParks(p){

    console.log('--------PARKS REPORT---------');
    
    //density
    p.forEach(current => current.treeDensity());
    
    //average age
    const ages = p.map(current => new Date().getFullYear() - current.buildYear);
    const [totalAge, avgAge] = calc(ages);
    console.log(`Our ${p.length} have an average of ${avgAge} years.`);
    
    //which has more than 1000 trees
    const i = p.map(current => current.numTrees).findIndex(current => current >= 1000);
    console.log(`${p[i].name} has more than 1000 trees.`);
    
}

function reportStreets(s){
    
    console.log('-----------STREETS REPORT-----------');
    
    //total and average street length
    const [totalLength, averageLength] = calc(s.map(current => current.length));
    console.log(`Our ${s.length} streets have a total length of ${totalLength} km, with an average of ${averageLength} km.`);
    
    //classify sizes
    s.forEach(current => current.classifyStreet());
    
}



reportParks(allParks);
reportStreets(allStreets);
