// DOM variables
let mainContainer = document.querySelector('.container');
let winContainer = document.querySelector('.win');
let movesSpan = document.querySelector('.moves');
let starsDisplay = document.querySelector('.stars');
let timerDisplay = document.querySelector('.timer');
const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');

// game control variables
let cards = ['diamond',
			'paper-plane-o',
			'anchor',
			'bolt',
			'cube',
			'leaf',
			'bicycle', 
			'bomb'];
cards = cards.concat(cards); //each element has a pair
let matchedCards = 0;
let flippedCard = '';
let numMoves = 0; //number of times the user flips a card over
let numStars = 3;
let timerSeconds = 0;
let timerMinutes = 0;
let timer = setInterval(timerInterval, 1000);


displayCards();
restartButton.addEventListener('click', restart);


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
 function displayCards() {
	 shuffle(cards);
	 	 
	 for(let i = 0; i < cards.length; i++) {
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
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function cardClicked(event) {
	if(validCard(event.target)) {
		showCardSymbol(event.target);
		checkMatched(event.target.children[0]);
	}
}

function showCardSymbol(card) {
	//assert: we already have a valid card
	card.className += ' open show';
	updateStars();
}

function updateStars() {
	if((numMoves > 15 && numStars === 3) ||
		(numMoves > 30 && numStars === 2)) {
		removeStar();
	}
}

function removeStar() {
	numStars--;
	starsDisplay.removeChild(starsDisplay.firstElementChild);
}

function checkMatched(card) {
	//assert: we already have a valid card
	const symbol = getSymbol(card);
	if(flippedCard == '') {		
		flippedCard = card;
	}
	else { //we have already flipped one over, let's check if the new card matches
		numMoves++;
		movesSpan.innerHTML = numMoves;
		if(symbol === getSymbol(flippedCard)) //match!
			matchCards(flippedCard, card);
		else
			turnCardsOver(flippedCard, card);
	}
}

function matchCards(card1, card2) {
	matchedCards += 2;
	card1.parentElement.className = 'card match';
	card2.parentElement.className = 'card match';
	flippedCard = '';
	if(matchedCards == 16)
		winGame();
}

function turnCardsOver(card1, card2) {
	card1.parentElement.className += ' wrong';
	card2.parentElement.className += ' wrong';
	
	// delay hiding the cards until after they see that it was wrong
	setTimeout(function resetCards() {
		card1.parentElement.className = 'card';
		card2.parentElement.className = 'card';
	}, 500);
	flippedCard = '';
}

function validCard(card) {
	return card.className === 'card' && //user actually cliked on a card
			!card.classList.contains('match') && //it's not already matched
			card.children[0] != flippedCard; //it's not our current flipped card
}

function getSymbol(card) {
	return card.className.substring(6); // cut off "fa fa-"
}

function timerInterval() {
	timerSeconds++;
	if(timerSeconds === 60) {
		timerMinutes++;
		timerSeconds = 0;
	}
	timerDisplay.innerHTML = timerMinutes + ':' + 
		(timerSeconds < 10 ? '0' + timerSeconds : timerSeconds);
}

function restart() {
	deck.innerHTML = '';
	displayCards();
	flippedCard = '';
	matchedCards = 0;
	numMoves = 0;
	movesSpan.innerHTML = numMoves;
	numStars = 3;
	starsDisplay.innerHTML = `<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>
        		<li><i class="fa fa-star"></i></li>`;
	clearInterval(timer);
	timerMinutes = 0;
	timerSeconds = 0;
	timerDisplay.innerHTML = '0:00';
	timer = setInterval(timerInterval, 1000);
	/*mainContainer.style.display = 'flex';
	winContainer.style.display = 'none';*/
}

function winGame() {
	clearInterval(timer);
	swal({
		title: 'Congratulations! You WIN!',
		text: getWinText(),
		type: 'success',
		confirmButtonText: 'Play Again'
	}).then((result) => {
		if (result.value) {
			restart();
		}
	})
	/*mainContainer.style.display = 'none';
	winContainer.style.display = 'inline';	
	let winInfo = document.querySelector('.win-info');
	winInfo.innerHTML = `<p>Moves: ${numMoves} </p>
		<p>${numStars} Star${numStars > 1 ? 's' : ''}</p>
		<p>Total time: ${timerMinutes}:${(timerSeconds < 10 ? '0' + timerSeconds : timerSeconds)}`;*/
}

function getWinText()
{
	let text = `You took ${numMoves} moves with a time of ${timerMinutes}:${(timerSeconds < 10 ? '0' + timerSeconds : timerSeconds)}
			and got ${numStars} Star${numStars > 1 ? 's' : ''}. `;
	
	if(numStars === 1)
		text+= 'Better luck next time!';
	else if(numStars === 2)
		text += 'Good job!';
	else //3 stars
		text += 'WOW!';
	
	return text;
}