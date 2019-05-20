// question game, coding challenge 7
/*

    1. build function constructor called Question to describe a question. question should include:
        1. question itself
        2. answers the player can choose from
        3. correct answer
    2. create a couple of questions with the constructor
    3. store questions in an array
    4. select random question and log it at the console, prompt user for the correct answer
    5. check if answer is correct, log to the console if answer is correct or not
    6. make sure all code is private and won't interfere with other programmers code

    "expert level" -
    7. after displaying result, display next random question so that the game never ends
    8. allow user to enter "exit" to quit the game
    9. track user score
    10.display user score in the console
*/

( function () {


var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
};

Question.prototype.displayQuestion = function(){
    console.log(this.question);
    for(var i = 0; i < this.answers.length; i++){
        console.log((i + 1) + ' - ' + this.answers[i]);
    }
}

Question.prototype.checkAnswer = function(answer, scoreFunc) {
    var sc;
    if(parseInt(answer) === this.correctAnswer){
        console.log('Correct answer, great job!');
        sc = scoreFunc(true);
        this.displayScore(sc);
    }else{
        console.log('Wrong answer, very bad job.');
        sc = scoreFunc(false);
        this.displayScore(sc);
    }
    
    nextQuestion();
}

//rather than define a global score variable, this allows for the score
//to be tracked during the duration of the game while being inside of the scope of the 
//immediately called function
function trackScore() {
    var score = 0;
    return function correctAnswer(correct){
        if(correct){
            score++;
        }
        return score;
    }
}
    
var currentScore = trackScore();

Question.prototype.displayScore = function(score){
    console.log('Current player score is: ' + score);
    console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
}
    
function getRandomQuestion(questions){
    return questions[Math.floor(Math.random() * questions.length)];
}


var questions = [];
questions.push(new Question('What is the best fast food?',
                             ['mcdonalds', 'hardees', 'popeyes'],
                            3));
questions.push(new Question('what is the best programming language?',
                           ['COBOL', 'javascript', 'perl'],
                           2));
questions.push(new Question('what is the best season?',
                           ['spring', 'summer', 'fall'],
                           2));
function nextQuestion(){
        
    var currentQuestion = getRandomQuestion(questions);
    currentQuestion.displayQuestion();
    
    var userAnswer = prompt('Please select the correct answer! Enter \'exit\' if you would like to quit!');
    
    if(userAnswer !== 'exit')
        currentQuestion.checkAnswer(userAnswer, currentScore);
    else
        console.log('thanks for playing! :)');
    
}
    
nextQuestion();

})();







