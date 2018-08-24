const cards = document.getElementById('cards');
const startGame = document.getElementById("startGame");
const restartGame = document.getElementById("restart");
const closemodal = document.getElementById("closemodal");
const modal = document.getElementById("gameover");
const timeNow = document.getElementsByClassName("time")[0];

let firstChoosedCard;
let openPairs = 0;
let count = 0;
let movesCount;
let timer;
let hours, minutes, seconds;
const backgroundImage = 'background';
//image's array
const images = [
    'Chrysanthemum',
    'Desert',
    'Hydrangeas',
    'Jellyfish',
    'Koala',
    'Lighthouse',
    'Penguins',
    'Tulips'
];

//random shuffle
function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const randomPosition = Math.floor(Math.random() * i);

        const temp = array[randomPosition];
        array[randomPosition] = array[i];
        array[i] = temp;
    }
}

//how many stars to fill
function fillStars(n) {
    const star1 = document.getElementById('star1');
    const star2 = document.getElementById('star2');
    const star3 = document.getElementById('star3');
    let stars = [star1, star2, star3];

    for (let i = 0; i < n; ++i) {
        stars[i].src = "images/star-fill.jpg";
    }
    for (let i = n; i < stars.length; ++i) {
        stars[i].src = "images/star.jpg";
    }
}

//that to do then player won
function displayWin() {
    let movesElement = document.getElementsByClassName('moves')[0];
    let timeElement = document.getElementsByClassName('finishTime')[0];
    const message = document.getElementsByClassName('message')[0];

    //stop time
    clearInterval(timer);
    //set moves count
    movesElement.innerHTML = movesCount;
    //set time, if only one digit in second, minite or hour - add leading 0
    timeElement.innerHTML = (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' + 
        (seconds < 10 ? '0' + seconds : seconds);

    //3 stars if the player did less then 20 moves and the game lasted less then 1 minute
    //2 stars if the player did more then 20 moves but the game lasted less then 1 minute
    //2 stars if the player did less then 20 moves but the game lasted more then 1 minute
    //1 stars if the player did more then 20 moves and the game lasted more then 1 minute
    if (minutes < 1)
        if (movesCount < 20) {
            message.innerHTML = "Excellent job!";
            fillStars(3);
        }
        else {
            message.innerHTML = "Good job!";
            fillStars(2);
        }
    else
        if (movesCount < 20) {
            message.innerHTML = "Good job!";
            fillStars(2);
        }
        else {
            message.innerHTML = "Not bad!";
            fillStars(1);
        }
    //dispaly modal window
    modal.style.display = "flex";
}

function startNewGame() {
    //delete prevous cards
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    //delete prevuos game stats
    openPairs = 0;
    movesCount = 0;
    clearInterval(timer);
    
    //shuffle images - more precisely their indexes
    let indexes = images.map(function(val, index) {
        return index;
    });
    indexes = indexes.concat(indexes);
    shuffle(indexes);

    //create game elements
    indexes.forEach(function(index) {
        let newCard = document.createElement('div');
        newCard.setAttribute('class', 'card');
        
        let newCardContent = document.createElement('img');
        newCardContent.setAttribute('src', 'images/' + backgroundImage + '.jpg');        
        newCardContent.setAttribute('data-id', index);

        newCard.appendChild(newCardContent);
        cards.appendChild(newCard);
    });

    //set timer
    seconds = 0;
    minutes = 0;
    hours = 0;
    //every second time++
    timer = setInterval(function(){
        if (seconds == 59) {
            seconds = 0;
            if (minutes == 59) {
                minutes = 0;
                ++hours;
            }
            else
                ++minutes;
        }
        else {
            ++seconds;
        }
        timeNow.innerHTML = (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' + 
            (seconds < 10 ? '0' + seconds : seconds);
    }, 1000);
    
    let movesElement = document.getElementsByClassName('movesdone')[0];
    movesElement.innerHTML = movesCount;
}

function restart() {
    modal.style.display = "none";
    startNewGame();
}

//functions for buttons
startGame.onclick = startNewGame;
restartGame.onclick = restart;
closemodal.onclick = function() {
    modal.style.display = "none";
}

//if we clicked on a card - that to do
cards.onclick = function(e) {
    e.preventDefault();

    //if already two cards is open - we don't open another card
    if (count == 2)
        return;

    //if this card already found and open - we don't need to do anything
    let element = e.target;
    if (element.getAttribute('data-status') == 'found')
        return;
    
    //open the card
    let number = element.getAttribute('data-id');
    const imageName = images[number];
    element.setAttribute('src', 'images/' + imageName + '.jpg');  
    count++;

    //if it's a second card - match first and second cards
    if (firstChoosedCard) {
            //if first and second clicked cards is the same - don't do anything
            if (firstChoosedCard == element) {
                count--;
                return;
            }

            //one move - it's two open cards
            ++movesCount;
            let movesElement = document.getElementsByClassName('movesdone')[0];
            movesElement.innerHTML = movesCount;
            
            //if first and second cards have the same image
            //leave them open and increment count of open pairs
            if (firstChoosedCard.getAttribute('data-id') == number) {
                element.setAttribute('data-status', 'found');
                firstChoosedCard.setAttribute('data-status', 'found');

                openPairs++;
                //if all pairs is open - it's a win
                if (openPairs == images.length) {
                    displayWin();                        
                }

                firstChoosedCard = undefined;
                count = 0;
            }
            //if card's images is different - pause game for a second
            //so the player can see the images on open cards
            else {
                setTimeout(function() {
                    //close cards
                    element.setAttribute('src', 'images/' + backgroundImage + '.jpg');
                    firstChoosedCard.setAttribute('src', 'images/' + backgroundImage + '.jpg');
                    
                    firstChoosedCard = undefined;
                    count = 0;
                }, 1000);
            }
    }
    //if it's a first card - remember it
    else {
        firstChoosedCard = element;
    }

}

