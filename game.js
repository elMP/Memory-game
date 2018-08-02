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

function shuffle(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        const randomPosition = Math.floor(Math.random() * i);
        //console.log(randomPosition);

        const temp = array[randomPosition];
        array[randomPosition] = array[i];
        array[i] = temp;
    }
}

function startNewGame() {
    //delete prevous cards
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }
    openPairs = 0;
    movesCount = 0;

    let indexes = images.map(function(val, index) {
        return index;
    });
    indexes = indexes.concat(indexes);
    shuffle(indexes);
    console.log(indexes);

    indexes.forEach(function(index) {
        let newCard = document.createElement('div');
        let newCardContent = document.createElement('img');
        //const imageName = images[0];
        newCardContent.setAttribute('src', 'images/' + backgroundImage + '.jpg');
        newCard.setAttribute('class', 'card');
        newCardContent.setAttribute('data-id', index);
        newCard.appendChild(newCardContent);
        cards.appendChild(newCard);
    });

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
        //console.log(seconds, ' ', seconds.length, ' ', (seconds < 10 ? '0' + seconds : seconds));
        timeNow.innerHTML = (hours < 10 ? '0' + hours : hours) + ':' +
            (minutes < 10 ? '0' + minutes : minutes) + ':' + 
            (seconds < 10 ? '0' + seconds : seconds);
    }, 1000);
    
}

function restart() {
    modal.style.display = "none";
    startNewGame();
}

startGame.onclick = startNewGame;
restartGame.onclick = restart;

cards.onclick = function(e) {
    e.preventDefault();

    if (count == 2)
        return;

    let element = e.target;
    if (element.getAttribute('data-status') == 'found')
        return;
    
    let number = element.getAttribute('data-id');
    const imageName = images[number];
    element.setAttribute('src', 'images/' + imageName + '.jpg');  
    count++;

    
    if (firstChoosedCard) {
            ++movesCount;
            if (firstChoosedCard == element) {
                count--;
                return;
            }

            setTimeout(function() {
                if (firstChoosedCard.getAttribute('data-id') == number) {
                    element.setAttribute('data-status', 'found');
                    firstChoosedCard.setAttribute('data-status', 'found');

                    openPairs++;
                    console.log(openPairs, images.length);
                    if (openPairs == images.length) {
                        let movesElement = document.getElementsByClassName('moves')[0];
                        let timeElement = document.getElementsByClassName('finishTime')[0];
                        /*console.log('Win' + (hours.length == 1 ? '0' + hours : hours) + ':' +
                        (minutes.length == 1 ? '0' + minutes : minutes) + ':' + 
                        (seconds.length == 1 ? '0' + seconds : seconds));*/
                        clearInterval(timer);
                        movesElement.innerHTML = movesCount;
                        timeElement.innerHTML = (hours < 10 ? '0' + hours : hours) + ':' +
                            (minutes < 10 ? '0' + minutes : minutes) + ':' + 
                            (seconds < 10 ? '0' + seconds : seconds);
                        modal.style.display = "block";
                        
                    }
                }
                else {
                    //const imageName = images[0];
                    element.setAttribute('src', 'images/' + backgroundImage + '.jpg');
                    firstChoosedCard.setAttribute('src', 'images/' + backgroundImage + '.jpg');
                }
                firstChoosedCard = undefined;
                count = 0;
            }, 1000);
    }
    else {
        firstChoosedCard = element;
    }

}

closemodal.onclick = function() {
    modal.style.display = "none";
}