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
        document.getElementById("playerTurn").innerHTML = "Human (X)";
    } else {
        document.getElementById("playerTurn").innerHTML = "Computer (O)";
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
    alert((playerTurn == 1 ? "Human (X)" : "Computer (O)") + " Won!");
    resetBoard();
}

function resetBoard() {
    [0,1,2,3,4,5,6,7,8].forEach(function (index) {
        document.getElementById(index.toString()).innerHTML = "";
    });
    
    playerOneBoard = 0;
    playerTwoBoard = 0;
}

function isTileOpen(binaryIndex) {
    open = playerOneBoard | playerTwoBoard;
    if ((open & binaryIndex) == 0) return true;
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function computerTurn() {
    var choice;
    var binary;
    
    // console.log(isTileOpen(binary));
    // console.log(document.getElementById(choice.toString()).text == null);
    do {
        choice = (Math.random() * 8).toFixed();
        binary = Math.pow(2, choice);
        
        await sleep(500);
        
    } while (!(isTileOpen(binary) && document.getElementById(choice.toString()).text == null));
    console.log(choice);
    if (playerTurn == 2) {
        document.getElementById(choice.toString()).innerHTML += "O";
        playerTwoBoard |= binary;
        
        wins.forEach(checkIfPlayerWin);
        isBoardFull();
        endPlayerTurn();
    }
}

function onClick(event) {
    text = event.target.innerHTML;
    if (text.length == 0) {
        index = parseInt(event.target.id);
        binary = Math.pow(2, index);
        if(isTileOpen(binary)) {
            if (playerTurn == 1) {
                event.target.innerHTML += "X";
                playerOneBoard |= binary;
            } else {
                return;
            }
            
            wins.forEach(checkIfPlayerWin);
            isBoardFull();
            endPlayerTurn();
            computerTurn();
        }
    }
}

[0,1,2,3,4,5,6,7,8].forEach(
    function (index) {
        document.getElementById(index.toString()).addEventListener("click", onClick);
    }
);