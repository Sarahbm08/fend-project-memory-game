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
let openCards = [];

const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');
restartButton.addEventListener('click', restartClicked);
			
displayCards();

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
	showCardSymbol(event.target);
	//console.log('target: ' + event.target.children[0].className);
	addToOpenCards(event.target);
}

function showCardSymbol(card)
{
	if(card.className === 'card' && !card.classList.contains(' open show'))
		card.className += ' open show';
}
  
function addToOpenCards(card)
{
	if(openCards.length < 2)
	{
		//openCards.add(event.target.children[0]
	}
}

