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

const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');
	
displayCards();

restartButton.addEventListener('click', function restartClicked() {
	deck.innerHTML = '';
	displayCards();
	matchedCards = [];
});

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
		console.log('target: ' + event.target.children[0].className);
		checkMatched(event.target.children[0]);
		console.log("matched cards: " + matchedCards);
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
	console.log("match!");
	matchedCards.push(card1);
	matchedCards.push(card2);
	card1.parentElement.className = 'card match';
	card2.parentElement.className = 'card match';
	flippedCard = '';
}

function turnCardsOver(card1, card2)
{
	console.log("no match!" + card1.outerHTML + "\n" + card2.outerHTML);
	card1.parentElement.className = 'card';
	card2.parentElement.className = 'card';
	flippedCard = '';
}

function validCard(card)
{
	return card.className === 'card' && //user actually cliked on a card
			!card.classList.contains(' open show'); //it's not already flipped over
			
}

function getSymbol(card)
{
	return card.className.substring(6); // cut off "fa fa-"
}