const cards = document.getElementById('cards');
const startGame = document.getElementById("startGame");

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

startGame.onclick = function() {
    //delete prevous cards
    while (cards.firstChild) {
        cards.removeChild(cards.firstChild);
    }

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

cards.onclick = function(e) {
    e.preventDefault();

    let element = e.target;
    let number = element.getAttribute('data-id');
    const imageName = images[number];
    element.setAttribute('src', 'images/' + imageName + '.jpg');    
}