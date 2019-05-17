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

var scores, roundScore, activePlayer, dice, dice2, gamePlaying, previousRoll1, previousRoll2, twoSixes;

init();

document.querySelector('.btn-new').addEventListener('click', init);

document.querySelector('.btn-roll').addEventListener('click', function(){
   if(gamePlaying){
    // 1. random number
    var dice = generateDiceRoll();
    var dice2 = generateDiceRoll();
  
    if(previousRoll1 == 6 && dice == 6 ||
       previousRoll2 == 6 && dice == 6 ||
      previousRoll1 == 6 && dice2 == 6 ||
      previousRoll2 == 6 && dice2 == 6){
        twoSixes = true;
    }
       
    // 2. display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    var dice2DOM = document.querySelector('.dice2'); 
    dice2DOM.style.display = 'block';
    dice2DOM.src = 'dice-' + dice2 + '.png';   
       
    previousRoll1 = dice;
    previousRoll2 = dice2;
    
    // 3. update the round score IF the rolled number was NOT a 1
    if(dice > 1 && dice2 > 1 && !twoSixes){
        //add score
        roundScore += dice;
        roundScore += dice2;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    }else if(twoSixes){
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();  
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
    if(scores[activePlayer] >= document.getElementById('winningScore').value){
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
        previousRoll = 0;
        twoSixes = false;
        
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
}

function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; //0 - first player, 1 - second player
    previousRoll = 0;
    twoSixes = false;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    
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
    document.getElementById('winningScore').value = 100;
}



















