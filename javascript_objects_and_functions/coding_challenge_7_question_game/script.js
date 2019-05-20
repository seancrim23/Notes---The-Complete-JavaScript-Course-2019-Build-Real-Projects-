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

var userScore = 0;

function displayUserScore(){
    console.log('User Score is: ' + userScore);
}

var Question = function(question, answers, correctAnswer){
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
};

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

(function askRandomQuestion(){
    var currentQuestion = getRandomQuestion(questions);
    console.log(currentQuestion.question);
    for(var i = 0; i < currentQuestion.answers.length; i++){
        console.log((i + 1) + ' - ' + currentQuestion.answers[i]);
    }
    
    var userAnswer = prompt('Please select the correct answer! Enter \'exit\' if you would like to quit!');
    
    if(userAnswer == 'exit'){
        console.log('Thanks for playing!');
    }else if(userAnswer == currentQuestion.correctAnswer){
        console.log('Correct answer, great job!');
        userScore++;
        displayUserScore();
        askRandomQuestion();
    }else{
        console.log('Wrong answer, very bad job.');
        displayUserScore();
        askRandomQuestion();
    }
})();



