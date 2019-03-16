/**
 * Othello
 * Javascript project for CIS 343.
 * Command-line version of Othello.
 */

// Import our board definitions
const board = require('./board.js');
// Import a synchronous prompt library
const prompt = require('prompt-sync')();

/**
 * saveFile
 * SYNCHRONOUS (blocking) file save function.
 * @param file - The full filename path we want to save to.
 * @param contents - The object we wish to save as a JSON file.
 */
function saveFile(file, contents) {
    let fs = require('fs');
    fs.writeFileSync(file, JSON.stringify(contents));
}

/**
 * loadFile
 * SYNCHRONOUS (blocking) file read function.
 * @param file - The full filename path we wish to load an object from.
 * @return contents - The object converted from JSON.
 */
function loadFile(file) {

}

/**
 * Driver function.  "main" method, if you will.
 */
function start() {
    // Local variables
    let height = prompt('What height for your board? ');
    let width = prompt('What width for your board? ');
    let color = prompt("What color goes first, B or W? ");

    // SYNCHRONOUSLY read from keyboard
    console.log('Creating a board with size', height, 'x', width, 'where',
        color, "goes first.");

    // Create new board object
    let myBoard = new board(height, width);

    // Print board
    while (!myBoard.isGameOver()) {
        myBoard.printBoard();

        let row;
        let col;
        do {
            console.log("Turn>", color, " - Enter location to place your disc");

            row = parseInt(prompt("Row "));
            col = parseInt(prompt("Col "));

            if (row < 1 || row > myBoard.height || col < 1 || col > myBoard.width) {
                console.log("Sorry, invalid input. Try again.");
                continue;
            }
            //TODO check to see if this is bogus or not
            row--;
            col--;
            if (!myBoard.isValid(row, col, color)) {
                console.log("Sorry, that is not a valid move. Try again.");
                continue;
            }
            break;
        } while (true);
        console.log(row, col, color);
        myBoard.placeDiskAt(row, col, color);

        if (color == "B") color = "W";
        else color = "B";
    }

    let winner = myBoard.checkWinner();
    if (winner == "B" || winner == "W") {
        console.log("Game is over. The winner is " + color);
    } else {
        console.log("Game is over. No winner.");
    }


    // Save board example code.
    saveFile("test.json", myBoard);
}

console.clear();
start();