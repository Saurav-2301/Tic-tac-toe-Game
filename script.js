const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    boxes.forEach((box, index) => {
        box.innerText = "";
        box.style.pointerEvents = "all";
        box.classList.remove("win");
    });
}

initGame();

function swapTurn() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        checkGameOver();
    }
}

function checkGameOver() {
    let winner = "";

    // check all winning positions
    winningPositions.forEach(position => {
        const [a, b, c] = position;

        if (
            gameGrid[a] !== "" &&
            gameGrid[a] === gameGrid[b] &&
            gameGrid[b] === gameGrid[c]
        ) {
            winner = gameGrid[a];

            // highlight winning boxes
            boxes[a].classList.add("win");
            boxes[b].classList.add("win");
            boxes[c].classList.add("win");
        }
    });

    if (winner !== "") {
        gameInfo.innerText = `Winner - ${winner}`;
        newGameBtn.classList.add("active");
        boxes.forEach(box => (box.style.pointerEvents = "none"));
        return;
    }

    // check for draw
    let fillCount = 0;
    gameGrid.forEach(cell => {
        if (cell !== "") fillCount++;
    });

    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied!";
        newGameBtn.classList.add("active");
    } else {
        // if no win and no tie → swap turn
        swapTurn();
    }
}

// attach event listeners to all boxes
boxes.forEach((box, index) => {
    box.addEventListener("click", () => handleClick(index));
});

// new game button
newGameBtn.addEventListener("click", initGame);
