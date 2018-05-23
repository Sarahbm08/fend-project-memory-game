/* TODO:
 * 		- add moves counter
 *		- take away stars depending on number of moves
 *		- add running timer
 *		- display moves, stars, and total time at win screen
 *		- check usability across tablets and phones
 *		- Update README
 *		- check comments
 *		- check code format and readability
 */


/*
 * Create a list that holds all of your cards
 */
let cards = ['diamond', 'diamond',
			'paper-plane-o', 'paper-plane-o',
			'anchor', 'anchor',
			'bolt', 'bolt',
			'cube', 'cube',
			'leaf', 'leaf',
			'bicycle', 'bicycle', 
			'bomb', 'bomb'];

// list of cards that are currently flipped over (none to start)
let matchedCards = [];
let flippedCard = '';

let mainContainer = document.querySelector('.container');
let winContainer = document.querySelector('.win');
const deck = document.querySelector('.deck');
const restartButtons = document.getElementsByClassName('restart');
	
displayCards();
restartButtons[0].addEventListener('click', restart);
restartButtons[1].addEventListener('click', restart);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards()
 {
	 shuffle(cards);
	 	 
	 for(let i = 0; i < cards.length; i++)
	 {
		let newCard = document.createElement('li');
		newCard.className += 'card';
		
		const newSymbol = document.createElement('i');
		newSymbol.className += `fa fa-${cards[i]}`;
		
		newCard.appendChild(newSymbol);
		deck.appendChild(newCard);
	 }
	 deck.addEventListener('click', cardClicked);
 }

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function cardClicked(event)
{
	if(validCard(event.target))
	{
		showCardSymbol(event.target);
		checkMatched(event.target.children[0]);
	}
}

function showCardSymbol(card)
{
	//assert: we already have a valid card
	card.className += ' open show';
}
  
function checkMatched(card)
{
	//assert: we already have a valid card
	const symbol = getSymbol(card);
	if(flippedCard == '')
	{		
		flippedCard = card;
	}
	else //we have already flipped one over, let's check if the new card matches
	{
		if(symbol === getSymbol(flippedCard)) //match!
			matchCards(flippedCard, card);
		else
			turnCardsOver(flippedCard, card);
	}
}

function matchCards(card1, card2)
{
	matchedCards.push(card1);
	matchedCards.push(card2);
	card1.parentElement.className = 'card match';
	card2.parentElement.className = 'card match';
	flippedCard = '';
	if(matchedCards.length == 16)
		winGame();
}

function turnCardsOver(card1, card2)
{
	card1.parentElement.className += ' wrong';
	card2.parentElement.className += ' wrong';
	
	// delay hiding the cards until after they see that it was wrong
	setTimeout(function resetCards() {
		card1.parentElement.className = 'card';
		card2.parentElement.className = 'card';
	}, 500);
	flippedCard = '';
}

function validCard(card)
{
	return card.className === 'card' && //user actually cliked on a card
			!card.classList.contains('match') && //it's not already matched
			card.children[0] != flippedCard; //it's not our current flipped card
}

function getSymbol(card)
{
	return card.className.substring(6); // cut off "fa fa-"
}

function restart()
{
	deck.innerHTML = '';
	displayCards();
	matchedCards = [];
	mainContainer.style.display = 'flex';
	winContainer.style.display = 'none';
}

function winGame()
{
	mainContainer.style.display = 'none';
	winContainer.style.display = 'inline';	
	let winInfo = document.querySelector('.win-info');
	winInfo.innerHTML = '<p>Moves: 20</p><p>Stars: 2</p>';
}