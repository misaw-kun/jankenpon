/**
 * Vote RPS (from 賭ケグルイ)
 * * 30 randomized cards
 * TODO: change randomized cards to people-voted cards in future
 * * Players draws 3 card each per round
 * * Choose one card to face off
 * ? If round draw ...
 * * * Choose from the rest 2 till game ends
 * ! 3 draws = tie game
 * * Best of 5 wins the game
 */

const symbols = {
    1: 'rock',
    2: 'paper',
    3: 'scissors'
}

let playerWins = 0;
let compWins = 0;
let ties = 0;

function thirtyRandomCards() {

    const MAX = 3;
    const MIN = 1;

    const box = [];
    for (let index = 0; index < 30; index++) {
        let card = Math.floor(Math.random()*(MAX - MIN + 1) + MIN)
        box.push(card)
    }

    return box;
}

//30 cards a game stored globally
const set = thirtyRandomCards();

function drawCards() {

    let hand = []; //hand of 3 cards per player each round

    //* choosing 3 cards at random and removing from the box using splice
    while (hand.length < 3) {
        let choice = set.splice(Math.floor(Math.random() * set.length), 1);
        hand.push(choice);
    }

    return hand;
}

function playerDrawsHand() {
    let playerHand = drawCards();
    return playerHand;
}

function compDrawsHand() {
    let compHand = drawCards();
    return compHand;
}

function playerChose(playerHand) {

    start: while (true) {
        var choice = prompt(`choose out of ${playerHand.length} cards: `);
        if(choice !== typeof('number') && choice > playerHand.length) continue start;
        else break;
    }

    let playerChoice = symbols[playerHand[choice]];
    playerHand.splice(choice, 1);

    alert("player chose: " + playerChoice);

    return playerChoice;
}

function computerChose(compHand) {

    let choiceNum = Math.floor(Math.random() * compHand.length)

    let compChoice = symbols[compHand[choiceNum]]
    compHand.splice(choiceNum, 1);

    alert("computer chose: " + compChoice);

    return compChoice;
}

function gameLogic(c1, c2) {
    if (c1 === 'paper') {
        if(c2 === 'scissors') {
            compWins++;
            return 'computer wins!';
        } else {
            playerWins++;
            return 'player wins!';
        }
    }
    else if (c1 === 'scissors') {
        if(c2 === 'rock') {
            compWins++;
            return 'computer wins!';
        } else {
            playerWins++;
            return 'player wins!';
        }
    }
    else {
        if(c2 === 'paper') {
            compWins++;
            return 'computer wins!';
        } else {
            playerWins++;
            return 'player wins!';
        }
    }
}


function startRound() {

   let playerHand = playerDrawsHand();
   let compHand = compDrawsHand();
   let roundResult = '';

    let c1 = playerChose(playerHand);
    let c2 = computerChose(compHand);

    if ( c1 === c2 ) {
        start: while (c1 === c2) {
            alert("tie! choose from the remaining cards");
            c1 = playerChose(playerHand);
            c2 = computerChose(compHand);

            if( c1 !== c2)
                roundResult = gameLogic(c1, c2);
            else if (playerHand.length === 0) {
                ties++;
                return roundResult = 'Tie Round!';
            }
            else continue start;

        }
    } else {
        roundResult = gameLogic(c1, c2);
    }

    return roundResult
}

function game() {

    let round = 0;

    while (round < 5) {
        startRound();
        round++;
    }

    if (playerWins === compWins)
        return 'Game Tied!'

    return playerWins > compWins ? 'player wins the game' : 'you lose';

}

let result = game();
console.log(result);