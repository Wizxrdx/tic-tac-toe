playerTurn = 1;

playerOneBoard = 0b000000000;
playerTwoBoard = 0b000000000;

const wins = [
    0b111000000,
    0b000111000,
    0b000000111,
    0b100100100,
    0b010010010,
    0b001001001,
    0b100010001,
    0b001010100
];

function endPlayerTurn() {
    if (playerTurn == 1)
    {
        playerTurn = 2;
    } else {
        playerTurn = 1;
    }
    
    displayPlayerTurn();
}

function displayPlayerTurn() {
    if (playerTurn == 1) {
        document.getElementById("playerTurn").innerHTML = "Player 1";
    } else {
        document.getElementById("playerTurn").innerHTML = "Player 2";
    }
}

function checkIfPlayerWin(winningCombinations) {
    if (playerTurn == 1)
    {
        result = playerOneBoard & winningCombinations;
    } else
    {
        result = playerTwoBoard & winningCombinations;
    }
    if (result == winningCombinations)
    {
        playerWon();
    }
}

function isBoardFull() {
    if ((playerOneBoard | playerTwoBoard) == 0b111111111) {
        alert("Its a Tie!");
        resetBoard();
    }
}

function playerWon() {
    alert("Player " + playerTurn + " Won!");
    resetBoard();
}

function resetBoard() {
    [0,1,2,3,4,5,6,7,8].forEach(function (index) {
        document.getElementById(index.toString()).innerHTML = "";
    });
    
    playerOneBoard = 0;
    playerTwoBoard = 0;
}

function IsTileOpen(binaryIndex) {
    open = playerOneBoard | playerTwoBoard;
    if ((open & binaryIndex) == 0) return true;
    return false;
}

function onClick(event) {
    text = event.target.innerHTML;
    if (text.length == 0) {
        index = parseInt(event.target.id);
        binary = Math.pow(2, index);
        if(IsTileOpen(binary)) {
            if (playerTurn == 1) {
                event.target.innerHTML += "X";
                playerOneBoard |= binary;
            } else 
            {
                event.target.innerHTML += "O";
                playerTwoBoard |= binary;
            }
            
            wins.forEach(checkIfPlayerWin);
            isBoardFull();
            endPlayerTurn();
        }
    }
}

[0,1,2,3,4,5,6,7,8].forEach(
    function (index) {
        document.getElementById(index.toString()).addEventListener("click", onClick);
    }
);