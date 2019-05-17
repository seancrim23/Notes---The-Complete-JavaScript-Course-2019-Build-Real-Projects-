// writing the interview question function using closures

function interviewQuestions(job){
    return function(name){
        if(job === 'teacher')
            console.log(name + ', what do you teach?');
        else if(job === 'designer')
            console.log(name + ', what do you design?');
        else if(job === 'artist')
            console.log(name + ', what do you create?');
        else
            console.log(name + ', what do you do?');
    }
}

var teacherInterviewQuestions = interviewQuestions('teacher');
teacherInterviewQuestions('Ron');
interviewQuestions('teacher')('Zawn');
var designerInterviewQuestions = interviewQuestions('designer');
designerInterviewQuestions('John');
var artistInterviewQuestions = interviewQuestions('artist');
artistInterviewQuestions('Vaughn');
var noJobInterviewQuestions = interviewQuestions('random');
noJobInterviewQuestions('Sean');
interviewQuestions('random')('Pawn');