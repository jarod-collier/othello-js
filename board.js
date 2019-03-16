/**
 * Board
 * Defines a board "class" for an Othello game.
 */

const BLACK = "B";
const WHITE = "W";
const EMPTY = "-";

module.exports = class Board {

    /**
     * Construct the object with required state
     */
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.board = [];
        for (let i = 0; i < this.height; ++i) {
            let tmp = [];
            for (let j = 0; j < this.width; ++j) {
                if ((i == (height / 2) - 1 && j == (width / 2) - 1) ||
                    (i == (height / 2) && j == (width / 2))) {
                    tmp.push(BLACK);
                } else if ((i == (height / 2) && j == (width / 2) - 1) ||
                    (i == (height / 2) - 1 && j == (width / 2))) {
                    tmp.push(WHITE);
                } else tmp.push(EMPTY);
            }
            this.board.push(tmp);
        }
    }

    /**
     * Print a representation of the board to the terminal.
     */
    printBoard() {
        for (let i = 0; i < this.height; ++i) {
            for (let j = 0; j < this.width; ++j) {
                if (this.board[i][j] == EMPTY) {
                    process.stdout.write(EMPTY + '\t')
                } else {
                    process.stdout.write(this.board[i][j] + "\t")
                }
            }
            console.log();
        }
    }

    /**
     * isValidMove
     * @param row An integer row number.
     * @param col An integer column number.
     * @param disc A character for the disc color.
     * @return boolean indicating whether the move is valid.
     */

    isValid(row, col, disc) {

        if (this.board[row][col] == EMPTY) {

            let validDirection = false;

            // Checks for disc in random direction
            if (disc == BLACK) {
                if ((this.board[row][col - 1] == WHITE && this.board[row][col - 2] != EMPTY) ||
                    (this.board[row - 1][col - 1] == WHITE && this.board[row - 2][col - 2] != EMPTY) ||
                    (this.board[row - 1][col] == WHITE && this.board[row - 2][col] != EMPTY) ||
                    (this.board[row - 1][col + 1] == WHITE && this.board[row - 2][col + 2] != EMPTY) ||
                    (this.board[row][col + 1] == WHITE && this.board[row][col + 2] != EMPTY) ||
                    (this.board[row + 1][col + 1] == WHITE && this.board[row + 2][col + 2] != EMPTY) ||
                    (this.board[row + 1][col] == WHITE && this.board[row + 2][col] != EMPTY) ||
                    (this.board[row + 1][col - 1] == WHITE && this.board[row + 2][col - 2] != EMPTY)) {
                } else {
                    return false;
                }
            } else {
                if ((this.board[row][col - 1] == BLACK && this.board[row][col - 2] != EMPTY) ||
                    (this.board[row - 1][col - 1] == BLACK && this.board[row - 2][col - 2] != EMPTY) ||
                    (this.board[row - 1][col] == BLACK && this.board[row - 2][col] != EMPTY) ||
                    (this.board[row - 1][col + 1] == BLACK && this.board[row - 2][col + 2] != EMPTY) ||
                    (this.board[row][col + 1] == BLACK && this.board[row][col + 2] != EMPTY) ||
                    (this.board[row + 1][col + 1] == BLACK && this.board[row + 2][col + 2] != EMPTY) ||
                    (this.board[row + 1][col] == BLACK && this.board[row + 2][col] != EMPTY) ||
                    (this.board[row + 1][col - 1] == BLACK && this.board[row + 2][col - 2] != EMPTY)) {
                } else {
                    return false;
                }
            }

            // Checking for another disc going left
            if (this.board[row][col - 1] != EMPTY && (col - 1) != 0) {
                for (let temp = col - 1; temp > 0; temp--) {
                    if (this.board[row][temp] == disc) validDirection = true;
                }
                for (let leftCol = col - 1; leftCol > 0; leftCol--) {
                    if (this.board[row][leftCol] != disc && this.board[row][leftCol - 1] != EMPTY && (leftCol - 1) != 0 && validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going right
            validDirection = false;
            if (this.board[row][col + 1] != EMPTY && (col + 1) != 8) {
                for (let temp = col + 1; temp < 8; temp++) {
                    if (this.board[row][temp] == disc) validDirection = true;
                }
                for (let rightCol = col + 1; rightCol < 8; rightCol++) {
                    if (this.board[row][rightCol] != disc && this.board[row][rightCol + 1] != EMPTY && (rightCol + 1) != 8 && validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going up
            validDirection = false;
            if (this.board[row - 1][col] != EMPTY && (row - 1) != 0) {
                for (let i = row - 1; i > 0; i--) {
                    if (this.board[i][col] == disc) validDirection = true;
                }
                for (let upRow = row - 1; upRow > 0; upRow--) {
                    if (this.board[upRow][col] != disc && this.board[upRow - 1][col] != EMPTY && (upRow - 1) != 0 && validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going down
            validDirection = false;
            if (this.board[row + 1][col] != EMPTY && (row + 1) != 8) {
                for (let upRow = row + 1; upRow < 8; upRow++) {
                    for (let i = row + 1; i < 8; i++) {
                        if (this.board[i][col] == disc) validDirection = true;
                    }
                    if (this.board[upRow][col] != disc && this.board[upRow + 1][col] != EMPTY && (upRow + 1) != 8 && validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going diagonal up left
            validDirection = false;
            if (this.board[row - 1][col - 1] != EMPTY && (col - 1) != 0 && (row - 1) != 0) {

                // Checks whether row or col is smaller
                let upDiagLeft, currentLocation = 0, count = 1;
                if (row <= col) upDiagLeft = row;
                else upDiagLeft = col;

                for (let i = upDiagLeft; i > 0; i--) {
                    if (this.board[row - count][col - count] == disc) validDirection = true;
                    count++;
                }
                count = 1;
                for (upDiagLeft; upDiagLeft > 0; upDiagLeft--) {
                    if (this.board[row - count][col - count] != disc && (col - count) != 0 && (row - count) != 0 && validDirection) {
                        return true;
                    }
                    currentLocation++;
                    count++;
                }
            }

            // Checking for another disc going diagonal down right
            validDirection = false;
            if (this.board[row + 1][col + 1] != EMPTY && (col + 1) != 8 && (row + 1) != 8) {

                // Checks whether row or col is smaller
                let downDiagRight, currentLocation = 0, count = 1;
                if (row >= col) downDiagRight = row;
                else downDiagRight = col;

                for (let i = downDiagRight; i < 8; i++) {
                    if (this.board[row + count][col + count] == disc) validDirection = true;
                    count++;
                }
                count = 1;
                for (downDiagRight; downDiagRight < 8; downDiagRight++) {
                    if (this.board[row + count][col + count] != disc && (col + count) != 8 && (row + count) != 8 && validDirection) {
                        return true;
                    }
                    currentLocation++;
                    count++;
                }
            }

            // Checking for another disc going diagonal down left
            validDirection = false;
            if (this.board[row + 1][col - 1] != EMPTY && (col - 1) != 0 && (row + 1) != 8) {

                // Checks if row + col is less than 10 to know where the cut off is
                let downDiagLeft, currentLocation = 0, count = 1;
                if (row + col < 10) {
                    downDiagLeft = col;
                    for (let i = downDiagLeft; i > 0; i--) {
                        if (this.board[row + count][col - count] == disc) validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (downDiagLeft; downDiagLeft > 0; downDiagLeft--) {
                        if (this.board[row + count][col - count] != disc && (col - count) != 0 && (row + count) != 8 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }

                } else {
                    downDiagLeft = row;
                    for (let i = downDiagLeft; i < 8; i++) {
                        if (this.board[row + count][col - count] == disc) validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (downDiagLeft; downDiagLeft < 8; downDiagLeft++) {
                        if (this.board[row + count][col - count] != disc && (col - count) != 0 && (row + count) != 8 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }
                }
            }

            // Checking for another disc going diagonal up right
            validDirection = false;
            if (this.board[row - 1][col + 1] != EMPTY && (col + 1) != 8 && (row - 1) != 0) {

                // Checks if row + col is less than 10 to know how far to check
                let upDiagRight, currentLocation = 0, count = 1;
                if (row + col < 10) {
                    upDiagRight = row;
                    for (let i = upDiagRight; i > 0; i--) {
                        if (this.board[row - count][col + count] == disc) validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight > 0; upDiagRight--) {
                        if (this.board[row - count][col + count] != disc && (col + count) != 8 && (row - count) != 0 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }

                } else {
                    upDiagRight = col;
                    for (let i = upDiagRight; i < 8; i++) {
                        if (this.board[row - count][col + count] == disc) validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight < 8; upDiagRight++) {
                        if (this.board[row - count][col + count] != disc && (col + count) != 8 && (row - count) != 0 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }
                }
            }
        }
        return false;
    }

    /**
     * placeDiscAt
     * @param row An integer number for row.
     * @param col An integer number for column.
     * @param disc A character standing for disc color.
     */
    placeDiskAt(row, col, disc) {

        //place the disc
        this.board[row][col] = disc;
        let validDirection = false;

        // Checking for flips going left
        if (this.board[row][col - 1] != EMPTY && (col - 1) != 0) {
            for (let temp = col - 1; temp > 0; temp--) {
                if (this.board[row][temp] == disc) validDirection = true;
            }
            for (let leftCol = col - 1; leftCol > 0; leftCol--) {
                if (this.board[row][leftCol] != disc && this.board[row][leftCol] != EMPTY && (leftCol) != 0 && validDirection) {
                    this.board[row][leftCol] = disc;
                } else break;
            }
        }

        validDirection = false;
        // Checking for flips going right
        if (this.board[row][col + 1] != EMPTY && (col + 1) != 8) {
            for (let temp = col + 1; temp < 8; temp++) {
                if (this.board[row][temp] == disc) validDirection = true;
            }
            for (let rightCol = col + 1; rightCol < 8; rightCol++) {
                if (this.board[row][rightCol] != disc && this.board[row][rightCol] != EMPTY && (rightCol) != 8 && validDirection) {
                    this.board[row][rightCol] = disc;
                } else break;
            }
        }

        validDirection = false;
        // Checking for flips going up
        if (this.board[row - 1][col] != EMPTY && (row - 1) != 0) {
            for (let i = row - 1; i > 0; i--) {
                if (this.board[i][col] == disc) validDirection = true;
            }
            for (let upRow = row - 1; upRow > 0; upRow--) {
                if (this.board[upRow][col] != disc && this.board[upRow - 1][col] != EMPTY && (upRow) != 0 && validDirection) {
                    this.board[upRow][col] = disc;
                } else break;
            }
        }

        validDirection = false;
        // Checking for flips going down
        if (this.board[row + 1][col] != EMPTY && (row + 1) != 8) {
            for (let i = row + 1; i < 8; i++) {
                if (this.board[i][col] == disc) validDirection = true;
            }
            for (let upRow = row + 1; upRow < 8; upRow++) {
                if (this.board[upRow][col] != disc && this.board[upRow + 1][col] != EMPTY && (upRow) != 8 && validDirection) {
                    this.board[upRow][col] = disc;
                } else break;
            }
        }

        // Checking for flips going  up left
        validDirection = false;
        if (this.board[row - 1][col - 1] != EMPTY && (col - 1) != 0 && (row - 1) != 0) {

            // Checks whether row or col is smaller
            let upDiagLeft, currentLocation = 0, count = 1;
            if (row <= col) upDiagLeft = row;
            else upDiagLeft = col;

            for (let i = upDiagLeft; i > 0; i--) {
                if (this.board[row - count][col - count] == disc) validDirection = true;
                count++;
            }
            count = 1;
            for (upDiagLeft; upDiagLeft > 0; upDiagLeft--) {
                if ((this.board[row - count][col - count] == disc || this.board[row - count][col - count] != EMPTY) &&
                    (col - count) != 0 && (row - count) != 0 && validDirection) {
                    this.board[row - currentLocation][col - currentLocation] = disc;
                    currentLocation++;
                    count++;
                } else break;
            }
        }

        // Checking for flips going diagonal down right
        validDirection = false;
        if (this.board[row + 1][col + 1] != EMPTY && (col + 1) != 8 && (row + 1) != 8) {

            // Checks whether row or col is smaller
            let downDiagRight, currentLocation = 0, count = 1;
            if (row >= col) downDiagRight = row;
            else downDiagRight = col;

            for (let i = downDiagRight; i < 8; i++) {
                if (this.board[row + count][col + count] == disc) validDirection = true;
                count++;
            }
            count = 1;
            for (downDiagRight; downDiagRight < 8; downDiagRight++) {
                if ((this.board[row + count][col + count] == disc || this.board[row + count][col + count] != EMPTY) &&
                    (col + count) != 8 && (row + count) != 8 && validDirection) {
                    this.board[row + currentLocation][col + currentLocation] = disc;
                    currentLocation++;
                    count++;
                } else break;
            }
        }

        // Checking for flips going diagonal down left
        // validDirection = false;
        // if (this.board[row + 1][col - 1] != EMPTY && (col - 1) != 0 && (row + 1) != 8) {
        //
        //     // Checks if row + col is less than 10 to know where the cut off is
        //     let downDiagLeft, currentLocation = 0, count = 1;
        //     if (row + col < 10) {
        //         downDiagLeft = col;
        //         for (let i = downDiagLeft; i > 0; i--) {
        //             if (this.board[row + count][col - count] == disc) validDirection = true;
        //             count++;
        //         }
        //         count = 1;
        //         for (downDiagLeft; downDiagLeft > 0; downDiagLeft--) {
        //             if ((this.board[row + count][col - count] == disc || this.board[row + count][col - count] != EMPTY) &&
        //                 (col - count) != 0 && (row + count) != 8 && validDirection) {
        //                 this.board[row + currentLocation][col - currentLocation] = disc;
        //                 currentLocation++;
        //                 count++;
        //             } else break;
        //         }
        //
        //     } else {
        //         downDiagLeft = row;
        //         for (let i = downDiagLeft; i < 8; i++) {
        //             if (this.board[row + count][col - count] == disc) validDirection = true;
        //             count++;
        //         }
        //         count = 1;
        //         for (downDiagLeft; downDiagLeft < 8; downDiagLeft++) {
        //             if ((this.board[row + count][col - count] == disc || this.board[row + count][col - count] != EMPTY) &&
        //                 (col - count) != 0 && (row + count) != 8 && validDirection) {
        //                 this.board[row + currentLocation][col - currentLocation] = disc;
        //                 currentLocation++;
        //                 count++;
        //             } else break;
        //         }
        //     }
        // }

        // Checking for flips going diagonal up right
        validDirection = false;
        if (this.board[row - 1][col + 1] != EMPTY && (col + 1) != 8 && (row - 1) != 0) {

            // Checks if row + col is less than 10 to know how far to check
            let upDiagRight, currentLocation = 0, count = 1;
            if (row + col < 10) {
                upDiagRight = row;
                for (let i = upDiagRight; i > 0; i--) {
                    if (this.board[row - count][col + count] == disc) validDirection = true;
                    count++;
                }
                count = 1;
                for (upDiagRight; upDiagRight > 0; upDiagRight--) {
                    if ((this.board[row - count][col + count] == disc || this.board[row - count][col + count] != EMPTY) &&
                        (col + count) != 8 && (row - count) != 0 && validDirection) {
                        this.board[row - currentLocation][col + currentLocation] = disc;
                        currentLocation++;
                        count++;
                    } else break;
                }

            } else {
                upDiagRight = col;
                for (let i = upDiagRight; i < 8; i++) {
                    if (this.board[row - count][col + count] == disc) validDirection = true;
                    count++;
                }
                count = 1;
                for (upDiagRight; upDiagRight < 8; upDiagRight++) {
                    if ((this.board[row - count][col + count] == disc || this.board[row - count][col + count] != EMPTY) &&
                        (col + count) != 8 && (row - count) != 0 && validDirection) {
                        this.board[row - currentLocation][col + currentLocation] = disc;
                        currentLocation++;
                        count++;
                    } else break;
                }
            }
        }
    }

    /**
     * isValidMoveAvailable
     * @param disc A character pertaining to a disc color.
     * @return boolean A boolean telling the user whether there are
     *        valid moves availabe for that disc.
     */
    isValidMoveAvailable(disc) {

        //Variable to count how many possible moves there are
        let possibleMoves = 0;

        // loops through each space on the board and checks if current disc could be placed
        for (let row = 1; row <= this.width; row++) {
            for (let col = 1; col <= this.height; col++) {
                possibleMoves++;
            }
        }
        if (possibleMoves > 0)
            return true;
        else
            return false;
    }

    /**
     * isBoardFull
     * @return boolean Whether or not the board is full.
     */
    isBoardFull() {
        for (let row = 1; row <= this.width; row++) {
            for (let col = 1; col <= this.height; col++) {
                if (this.board[row][col] == EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    /**
     * isGameOver
     * @return boolean Whether or not the game is over.
     */
    isGameOver() {
        if (this.isBoardFull() || !this.isValidMoveAvailable(WHITE) ||
            !this.isValidMoveAvailable(BLACK)) {
            return true;
        }
        return false;
    }

    /**
     * checkWinner
     * @return string Which player has won.  Return null if
     *        a tie exists.
     */
    checkWinner() {
        let countBlack = 0;
        let countWhite = 0;

        for (let row = 1; row <= SIZE; row++) {
            for (let col = 1; col <= SIZE; col++) {
                if (board[row][col] == WHITE)
                    countWhite++;
                if (board[row][col] == BLACK) {
                    countBlack++;
                }
            }
            if (countBlack > countWhite) {
                return BLACK;
            } else if (countBlack < countWhite) {
                return WHITE;
            } else {
                return EMPTY;
            }
        }
    }
}

//let board = new Board(10, 10);
//board.printBoard();