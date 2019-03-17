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

    let height = prompt('What height for your board? ');



    let width = prompt('What width for your board? ');

    let color = "";
    color = prompt("What color goes first, B or W? ");
    let upperCaseColor = color.toUpperCase();
    color = upperCaseColor;

    // SYNCHRONOUSLY read from keyboard
    console.log('Creating a board with size', height, 'x', width, 'where',
        color, "goes first.");

    console.log("If at any point you would like to stop playing, enter in (0, 0) for the row and column");

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

            // checks for row and column being in the correct range
            if (row < 0 || row > myBoard.height || col < 0 || col > myBoard.width) {
                console.log("Sorry, your row and column were not valid entries.");
                continue;
            }

            // Exits the program if the user enters 0 and 0
            if (row == 0 && col == 0) {
                console.log("Game is now ending. Thanks for playing!");
                process.exit();
            }
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