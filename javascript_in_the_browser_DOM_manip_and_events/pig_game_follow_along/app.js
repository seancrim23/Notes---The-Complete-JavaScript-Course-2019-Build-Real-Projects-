/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

function generateDiceRoll(){
    return Math.floor(Math.random() * 6) + 1;
}

var scores, roundScore, activePlayer, dice, gamePlaying;

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function(){
   if(gamePlaying){
    // 1. random number
    var dice = generateDiceRoll();
    
    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    
    // 3. update the round score IF the rolled number was NOT a 1
    if(dice > 1){
        //add score
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }else{
        //next player
        nextPlayer();
    }
       
   }

    
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
    //add current score to total player score
    scores[activePlayer] += roundScore;
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    
    //check if player won the game
    if(scores[activePlayer] >= 100){
        document.getElementById('name-' + activePlayer).textContent = 'WINNER';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        gamePlaying = false;
    }else{
    //next player
    nextPlayer();
    }
    }
});

function nextPlayer(){
        activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-0').textContent = 0;
        document.getElementById('current-1').textContent = 0;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; //0 - first player, 1 - second player
    gamePlayer = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');
}



















