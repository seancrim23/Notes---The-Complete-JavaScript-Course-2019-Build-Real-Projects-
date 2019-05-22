//this lecture is about Maps in ES6

//MAPS === GOOD, use maps!!!

const question = new Map();
question.set('question', 'What is the official name of the latest major JavaScript version?');
question.set(1, 'ES5');
question.set(2, 'ES6');
question.set(3, 'ES2015');
question.set(4, 'ES7');
question.set('correct', 3);
question.set(true, 'correct answer!');
question.set(false, 'incorrect answer, bad job :(');

if(question.has(4)){
    console.log('yes 4 exists in the map');
}

question.forEach((value, key) => console.log(`This is the key: ${key} and this is it\'s value: ${value}`));

for(let [key, value] of question.entries()){
    if(typeof(key) === 'number'){
        console.log(`This key is a number: ${key}!`);
    }
}

const ans = parseInt(prompt('What is the correct answer?'));
console.log(question.get(question.get('correct') === ans));
