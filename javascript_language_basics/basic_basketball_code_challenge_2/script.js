/*
    CODING CHALLENGE 2
    
    John has a basketball team. Mike has a basketball team.
    
    They play 3 games each. 
    
    1. Calculate average score for each team.
    2. Decide which team's average score wins.
    3. Modify the scores to get different winners.
    
    4. Add another person with a basketball team. Calculate the average winner using compound conditionals.
    
    testdata:
    john1 = 89
    john2 = 120
    john3 = 103
    
    mike1 = 116
    mike2 = 94
    mike3 = 123
    
    mary1 = 100
    mary2 = 78
    mary3 = 121
*/

var johnScoreOne = 100;
var johnScoreTwo = 100;
var johnScoreThree = 100;

var mikeScoreOne = 100;
var mikeScoreTwo = 100;
var mikeScoreThree = 100;

var maryScoreOne = 100;
var maryScoreTwo = 100;
var maryScoreThree = 10;

var avgScoreJohn = (johnScoreOne + johnScoreTwo + johnScoreThree) / 3;
var avgScoreMike = (mikeScoreOne + mikeScoreTwo + mikeScoreThree) / 3;
var avgScoreMary = (maryScoreOne + maryScoreTwo + maryScoreThree) / 3;

if(avgScoreJohn > avgScoreMike && avgScoreJohn > avgScoreMary){
    console.log('John averaged the highest score with ' + avgScoreJohn + ' in three games.');
}else if(avgScoreMike > avgScoreJohn && avgScoreMike > avgScoreMary){
    console.log('Mike averaged the highest score with ' + avgScoreMike + ' in three games.');
}else if(avgScoreMary > avgScoreJohn && avgScoreMary > avgScoreMike){
    console.log('Mary averaged the highest score with ' + avgScoreMary + ' in three games.');
}else{
    if(avgScoreJohn == avgScoreMike && avgScoreJohn == avgScoreMary){
        console.log('All three tied scores!');
    }else if(avgScoreJohn == avgScoreMike){
        console.log('John and Mike tied with scores of ' + avgScoreJohn);
    }else if(avgScoreJohn == avgScoreMary){
        console.log('John and Mary tied with scores of ' + avgScoreJohn);
    }else if(avgScoreMary == avgScoreMike){
        console.log('Mike and Mary tied with scores of ' + avgScoreMary);
    }
}