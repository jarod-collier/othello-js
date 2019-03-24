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
   let fs = require('fs');
   let contents = fs.readFileSync(file);
   return contents; 
}

/**
 * Driver function.  "main" method, if you will.
 */
function start() {

    let size = 1;

	while(size %2 != 0 || size < 4){
		size = prompt('What size for your board? ');
	
		if(size %2 != 0){
			console.log("size has to be even");
		}else if(size < 4){
			console.log("size has to be 4 at least");
		}
	}



    //let width = 1;

//	while(width % 2 != 0 || width < 4){
//		width =prompt('What width for your board? ');
	
//		if(width %2 != 0){
  //                      console.log("width has to be even");
    //            }else if(width < 4){
//			console.log("width has to be 4 at least");
//		}
//	}

    	let color = "";
	
	while(color != "B" && color != "W"){
    		color = prompt("What color goes first, B or W? ");
    		let upperCaseColor = color.toUpperCase();
    		color = upperCaseColor;

		if(color != "B" && color != "W"){
			console.log("Invalid input. Try again");
		}
	}

    // SYNCHRONOUSLY read from keyboard
    console.log('Creating a board with size', size, 'x', size, 'where',
        color, "goes first.");

    console.log("\nIf at any point you would like to stop playing, enter in (0, 0) for the row and column");

    // Create new board object
    let myBoard = new board(size);

    // Print board
    while (!myBoard.isGameOver()) {
        myBoard.printBoard();

        let row = 0;
        let col = 0;
        do {
            console.log("Turn>", color, " - Enter location to place your disc");

            row = parseInt(prompt("Row "));
            col = parseInt(prompt("Col "));

		console.log(typeof(row) + "value: "+ row);
		console.log(typeof(col) + "value: "+ col);
	
            // checks for row and column being in the correct range
            if (row < 0 || row > myBoard.size || col < 0 || col > myBoard.size) {
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
