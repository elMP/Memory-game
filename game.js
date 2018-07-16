const cards = document.getElementById('cards');
const startGame = document.getElementById("startGame");
const restartGame = document.getElementById("restart");
const closemodal = document.getElementById("closemodal");
const modal = document.getElementById("gameover");

let firstChoosedCard;
let openPairs = 0;
let count = 0;

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

    let indexes = images.map(function(val, index) {
        return index;
    });
    indexes = indexes.concat(indexes);
    shuffle(indexes);
    console.log(indexes);

    indexes.forEach(function(index) {
        let newCard = document.createElement('img');
        const imageName = images[0];
        newCard.setAttribute('src', 'images/' + imageName + '.jpg');
        newCard.setAttribute('class', 'card');
        newCard.setAttribute('data-id', index);
        cards.appendChild(newCard);
    });
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
                        modal.style.display = "block";
                        console.log('Win');
                    }
                }
                else {
                    const imageName = images[0];
                    element.setAttribute('src', 'images/' + imageName + '.jpg');
                    firstChoosedCard.setAttribute('src', 'images/' + imageName + '.jpg');
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