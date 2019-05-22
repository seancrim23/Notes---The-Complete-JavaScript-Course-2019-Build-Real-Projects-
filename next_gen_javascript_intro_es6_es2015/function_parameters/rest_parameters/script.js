//this lecture is about rest parameters

//ES5
function isFullAge5(){
    console.log(arguments);
    var argsArray = Array.prototype.slice.call(arguments);
    
    argsArray.forEach(function(current){
        console.log((2016 - current) >= 18);
    });
}

//isFullAge5(1990, 1999, 1995);
//isFullAge5(1990, 1999, 1995, 2016, 2000, 2005);

//ES6 (the rest parameter)
function isFullAge6(limit, ...years){
    console.log(years);
    years.forEach(current => console.log((2016 - current) >= limit));
}

isFullAge6(16, 1990, 1999, 1995, 2016, 1975, 2005);



