let player = "X";

function render() {
    const resultDiv = document.getElementById("result");

    if (checkWinner("X")) {
        resultDiv.textContent = "Player X won!";
        flashBackground("rgba(0, 158, 87)"); // Flash X
        disableClicks();
    } else if (checkWinner("O")) {
        resultDiv.textContent = "Player O won!";
        flashBackground("rgba(255, 0, 0, 0.7)"); // Flash O
        disableClicks();
    } else if (isBoardFull()) {
        resultDiv.textContent = "Draw!";
        flashBackground("rgba(255, 255, 0, 0.7)"); // Flash empate
    }
}


function play(cell) {
    if (cell.innerHTML === "") {
        cell.innerHTML = player;
        render();
        switchPlayer();
    } else {
        // Optionally, provide feedback that the cell is already filled.
        console.log("Cell already filled. Choose another one.");
    }
}

function checkWinner(currentPlayer) {
    const board = document.querySelectorAll(".square");

    // Check rows and columns
    for (let i = 0; i < 3; i++) {
        if (
            (board[i * 3].innerHTML === currentPlayer &&
                board[i * 3 + 1].innerHTML === currentPlayer &&
                board[i * 3 + 2].innerHTML === currentPlayer) ||
            (board[i].innerHTML === currentPlayer &&
                board[i + 3].innerHTML === currentPlayer &&
                board[i + 6].innerHTML === currentPlayer)
        ) {
            return true;
        }
    }

    // Check diagonals
    if (
        (board[0].innerHTML === currentPlayer &&
            board[4].innerHTML === currentPlayer &&
            board[8].innerHTML === currentPlayer) ||
        (board[2].innerHTML === currentPlayer &&
            board[4].innerHTML === currentPlayer &&
            board[6].innerHTML === currentPlayer)
    ) {
        return true;
    }

    return false;
}

function isBoardFull() {
    const board = document.querySelectorAll(".square");

    for (const cell of board) {
        if (cell.innerHTML === "") {
            return false;
        }
    }

    return true;
}

function disableClicks() {
    const board = document.querySelectorAll(".square");

    for (const cell of board) {
        cell.onclick = null; // Disables the click function
    }
}

function switchPlayer() {
    player = (player === "X") ? "O" : "X";
}

function flashBackground(color) {
    const body = document.body;
    body.style.transition = "background 0.5s";
    body.style.background = color;

    setTimeout(() => {
        body.style.background = "";
        body.style.transition = "";
        flashBackground(color);
    }, 500);
}

function restartGame() {
    const resultDiv = document.getElementById("result");
    const board = document.querySelectorAll(".square");

    for (const cell of board) {
        cell.innerHTML = "";
    }

    resultDiv.textContent = "";

    
    for (const cell of board) {
        cell.onclick = function() {
            play(this);
        };
    }

    
    player = "X";

    
    document.body.style.background = "";
}
