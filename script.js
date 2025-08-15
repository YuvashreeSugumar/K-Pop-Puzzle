
const images = [
    'img1.png', 'img2.png', 'img3.png', 'img4.png',
    'img1.png', 'img2.png', 'img3.png', 'img4.png'
];

let gameBoard = document.getElementById('game-board');
let flippedCards = [];
let matchedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    shuffle(images);
    images.forEach(image => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back" style="background-image: url('images/${image}')"></div>
            </div>
        `;
        card.addEventListener('click', () => flipCard(card, image));
        gameBoard.appendChild(card);
    });
}

function flipCard(card, image) {
    if (flippedCards.length < 2 && !card.classList.contains('flipped') && !matchedCards.includes(card)) {
        card.classList.add('flipped');
        flippedCards.push({ card, image });

        if (flippedCards.length === 2) {
            setTimeout(checkMatch, 800);
        }
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    if (first.image === second.image) {
        matchedCards.push(first.card, second.card);
    } else {
        first.card.classList.remove('flipped');
        second.card.classList.remove('flipped');
    }
    flippedCards = [];
}

createBoard();
