// ------ HTML Element ------

const statusDiv = document.querySelector(".status");
const resetDiv = document.querySelector(".reset");
const cellDivs = document.querySelectorAll(".cell");
const playerOneSelect = document.querySelector("#player-one");
const playerTwoSelect = document.querySelector("#player-two");
const playerOneName = document.querySelector('#player-name-one');
const playerTwoName = document.querySelector('#player-name-two');
const aiToggle = document.querySelector(".ai");

// ------ Game Variables ------

let gameIsLive = true;
let playerOneIsNext = true;
let moveCount = 0;
let playerOne = null;
let playerTwo = null;
let aiLive = false;

// Functions

const aiMove = () => {
    let validMoves = [];
    for (let i = 0; i < cellDivs.length; i++) {
        if (cellDivs[i].classList.contains('o') || cellDivs[i].classList.contains('x')) {
        } else {
            validMoves.push(i);
        }
    }
    let randomPick = Math.floor(Math.random() * validMoves.length);
    let choice = validMoves[randomPick];
    cellDivs[choice].classList.add('o');
    playerOneIsNext = !playerOneIsNext;
    moveCount++;
};

const handleWinner = (winner) => {
    gameIsLive = false;
    if (winner === "x") {
        statusDiv.textContent = `${playerOne} has won!`
    } else {
        if (aiLive) { statusDiv.textContent = `The AI has won!` }
        else {
            statusDiv.textContent = `${playerTwo} has won!`
        }
    }
    statusDiv.style.color = "red";
};

const checkGameState = () => {
    const topLeft = cellDivs[0].classList[1];
    const topMiddle = cellDivs[1].classList[1];
    const topRight = cellDivs[2].classList[1];
    const middleLeft = cellDivs[3].classList[1];
    const middleMiddle = cellDivs[4].classList[1];
    const middleRight = cellDivs[5].classList[1];
    const bottomLeft = cellDivs[6].classList[1];
    const bottomMiddle = cellDivs[7].classList[1];
    const bottomRight = cellDivs[8].classList[1];

    //Check for win condition
    if (topLeft && topLeft === topMiddle && topLeft === topRight) {
        handleWinner(topLeft);
    } else if (middleLeft && middleLeft === middleMiddle && middleLeft === middleRight) {
        handleWinner(middleLeft);
    } else if (bottomLeft && bottomLeft === bottomMiddle && bottomLeft === bottomRight) {
        handleWinner(bottomLeft);
    } else if (topLeft && topLeft === middleLeft && topLeft === bottomLeft) {
        handleWinner(topLeft);
    } else if (topMiddle && topMiddle === middleMiddle && topMiddle === bottomMiddle) {
        handleWinner(topMiddle);
    } else if (topRight && topRight === middleRight && topRight === bottomRight) {
        handleWinner(topRight);
    } else if (topLeft && topLeft === middleMiddle && topLeft === bottomRight) {
        handleWinner(topLeft);
    } else if (bottomLeft && bottomLeft === middleMiddle && bottomLeft === topRight) {
        handleWinner(bottomLeft);
    } else if (moveCount === 9) {
        gameIsLive = false;
        statusDiv.textContent = `Game is a tie!`
    } else {
        if (playerOne === null) { playerOne = "Player One"; }
        if (playerTwo === null) { playerTwo = "Player Two"; }
        if (!playerOneIsNext) { statusDiv.textContent = `${playerTwo}'s turn`; }
        if (playerOneIsNext) { statusDiv.textContent = `${playerOne}'s turn`; }
    }
};

// ------ Event Listeners -------

// Reset Game
resetDiv.addEventListener('click', (e) => {
    statusDiv.style.color = "#444";
    for (let cellDiv of cellDivs) {
        cellDiv.classList.remove('x');
        cellDiv.classList.remove('o');
    }
    gameIsLive = true;
    playerOneIsNext = true;
    if (playerOne !== null) {
        statusDiv.textContent = `${playerOne}'s turn`;
    } else {
        statusDiv.textContent = `Player One's turn`;
    }
    moveCount = 0;
    aiLive = false;
});

// Place marker on cell
for (let cellDiv of cellDivs) {
    cellDiv.addEventListener('click', (e) => {

        if (!gameIsLive) {return}

        moveCount++;
        
        if (e.target.classList[1]) { return }
        if (playerOneIsNext) {
            e.target.classList.add("x");
            playerOneIsNext = !playerOneIsNext;
            checkGameState();
            if (aiLive === true && gameIsLive=== true) {
                aiMove();
                checkGameState();
            }
        } else { 
            e.target.classList.add("o");
            playerOneIsNext = !playerOneIsNext;
            checkGameState();
        }
    });
}

// Name player one 
playerOneSelect.addEventListener('click', (e) => {
    e.preventDefault();

    playerOne = playerOneName.value;
    if (moveCount === 0) {
        statusDiv.textContent = `${playerOne}'s turn`;
    }
});

// Name player two
playerTwoSelect.addEventListener('click', (e) => {
    e.preventDefault();

    playerTwo = playerTwoName.value;
    console.log(playerTwo);
});

// Toggle AI

aiToggle.addEventListener('click', (e) => {
    if (moveCount > 0) { return }
    aiLive = !aiLive;
});