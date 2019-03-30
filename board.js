/**********************************************************************
 * Defines a board "class" for an Othello game that creates all of the
 * logic in order to play
 *
 * @author Jarod Collier, Maz Ashgar, Joe Hartsough
 * @version 3/18/2019
 *********************************************************************/

/** const variable to define what a black piece is */
const BLACK = "B";

/** const variable to define what a white piece is */
const WHITE = "W";

/** const variable to define what an empty piece is */
const EMPTY = "-";


module.exports = class Board {

    /******************************************************************
     * Constructor used to create an Othello board of the given size
     *@param size - used to determine how big the Othello board will be
     *****************************************************************/
    constructor(size) {
        this.size = size;
        this.board = [];
        for (let i = 0; i < this.size; ++i) {
            let tmp = [];
            for (let j = 0; j < this.size; ++j) {
                if ((i === (size / 2) - 1 && j === (size / 2) - 1) ||
                    (i === (size / 2) && j === (size / 2))) {
                    tmp.push(BLACK);
                } else if ((i === (size / 2) && j === (size / 2) - 1) ||
                    (i === (size / 2) - 1 && j === (size / 2))) {
                    tmp.push(WHITE);
                } else tmp.push(EMPTY);
            }
            this.board.push(tmp);
        }
    }

    /******************************************************************
     * Function used to load a board into our game from an existing
     * file
     * @param fromFile - the file that will be loaded in
     *****************************************************************/
    load(fromFile) {

        this.size = fromFile.size;
        this.board = [];
        for (let i = 0; i < this.size; ++i) {
            let tmp = [];
            for (let j = 0; j < fromFile.board[i].length; ++j) {
                if (fromFile.board[i][j] === 'B') tmp.push(BLACK);
                else if (fromFile.board[i][j] === 'W') tmp.push(WHITE);
                else tmp.push(EMPTY);
            }
            this.board.push(tmp);
        }
    }

    /******************************************************************
     * Print a representation of the board to the terminal.
     *****************************************************************/
    printBoard() {

        // Prints the numbers along the top
        let topNumbers = "\t";
        for (let i = 0; i < this.size; i++) {
            topNumbers += i + 1 + '\t';
        }

        console.log(topNumbers);

        let eachRow = "";
        for (let i = 0; i < this.size; ++i) {
            eachRow = i + 1 + "\t";
            for (let j = 0; j < this.size; ++j) {
                eachRow += this.board[i][j] + "\t";

                // I want to keep this here for reference so I
                // know another way to write things to the console
                // process.stdout.write(this.board[i][j] + "\t")
            }
            console.log(eachRow);
        }
    }

    /******************************************************************
     * isValidMove
     * @param row An integer row number.
     * @param col An integer column number.
     * @param disc A character for the disc color.
     * @return boolean indicating whether the move is valid.
     *****************************************************************/

    isValid(row, col, disc) {


        if (this.board[row][col] === EMPTY) {

            // checks to make sure that there are no undefined values being passed in
            if (typeof (row) == 'undefined' || typeof (col) == 'undefined') {
                return false;
            }

            if (row === undefined || col === undefined) {
                return false;
            }

            if (col - 1 === undefined ||col - 2 === undefined ||
                 row - 1 === undefined || col - 1 === undefined ||
                    row - 2 === undefined || col - 2 === undefined ||
                row - 1 === undefined ||row - 2 === undefined ||
                row - 1 === undefined || col + 1 === undefined ||
                    row - 2 === undefined || col + 2 === undefined ||
                col + 1 === undefined || col + 2 === undefined ||
                row + 1 === undefined || col + 1 === undefined ||
                    row + 2 === undefined || col + 2 === undefined ||
                row + 1 === undefined || row + 2 === undefined||
                row + 1 === undefined || col - 1 === undefined ||
                    row + 2 === undefined || col - 2 === undefined) {
                return false;
            }

            // if (( (this.board[row][col - 1]) === undefined &&
            //     (this.board[row][col - 2]) === undefined) ||
            //     ( (this.board[row - 1][col - 1]) === undefined &&
            //         (this.board[row - 2][col - 2]) === undefined) ||
            //     ((this.board[row - 1][col]) === undefined &&
            //         (this.board[row - 2][col]) === undefined) ||
            //     ((this.board[row - 1][col + 1]) === undefined &&
            //         (this.board[row - 2][col + 2]) === undefined) ||
            //     ((this.board[row][col + 1]) === undefined &&
            //         (this.board[row][col + 2]) === undefined) ||
            //     ((this.board[row + 1][col + 1]) === undefined &&
            //         (this.board[row + 2][col + 2]) === undefined) ||
            //     ((this.board[row + 1][col]) === undefined &&
            //         (this.board[row + 2][col]) === undefined) ||
            //     ((this.board[row + 1][col - 1]) === undefined &&
            //         (this.board[row + 2][col - 2]) === undefined)) {
            //     return false;
            // }

            // if ((typeof (this.board[row][col - 1]) == 'undefined' &&
            //             //     typeof (this.board[row][col - 2]) == 'undefined') ||
            //             //     (typeof (this.board[row - 1][col - 1]) == 'undefined' &&
            //             //         typeof (this.board[row - 2][col - 2]) == 'undefined') ||
            //             //     (typeof(this.board[row - 1][col]) == 'undefined'&&
            //             //         typeof(this.board[row - 2][col]) == 'undefined') ||
            //             //     (typeof(this.board[row - 1][col + 1]) == 'undefined' &&
            //             //         typeof(this.board[row - 2][col + 2]) == 'undefined') ||
            //             //     (typeof(this.board[row][col + 1]) == 'undefined' &&
            //             //         typeof(this.board[row][col + 2]) == 'undefined') ||
            //             //     (typeof(this.board[row + 1][col + 1]) == 'undefined' &&
            //             //         typeof(this.board[row + 2][col + 2]) == 'undefined') ||
            //             //     (typeof(this.board[row + 1][col]) == 'undefined' &&
            //             //         typeof(this.board[row + 2][col]) == 'undefined') ||
            //             //     (typeof(this.board[row + 1][col - 1]) == 'undefined' &&
            //             //         typeof(this.board[row + 2][col - 2]) == 'undefined')) {
            //             //     return false;
            //             // }



            let validDirection = false;

            // Checks for disc in random direction
            if (disc === BLACK) {

                if (!(row - 1 < 0) && !(col - 1 < 0) && !(row - 2 < 0)
                    && !(col - 2 < 0) && !(row + 1 > this.size - 1) &&
                    !(row + 2 > this.size - 1) &&
                    !(row + 1 > this.size - 1) &&
                    !(col + 1 > this.size - 1) &&
                    !(col + 2 > this.size - 1)) {

                    if ((this.board[row][col - 1] === WHITE &&
                        this.board[row][col - 2] !== EMPTY) ||
                        (this.board[row - 1][col - 1] === WHITE &&
                            this.board[row - 2][col - 2] !== EMPTY) ||
                        (this.board[row - 1][col] === WHITE &&
                            this.board[row - 2][col] !== EMPTY) ||
                        (this.board[row - 1][col + 1] === WHITE &&
                            this.board[row - 2][col + 2] !== EMPTY) ||
                        (this.board[row][col + 1] === WHITE &&
                            this.board[row][col + 2] !== EMPTY) ||
                        (this.board[row + 1][col + 1] === WHITE &&
                            this.board[row + 2][col + 2] !== EMPTY) ||
                        (this.board[row + 1][col] === WHITE &&
                            this.board[row + 2][col] !== EMPTY) ||
                        (this.board[row + 1][col - 1] === WHITE &&
                            this.board[row + 2][col - 2] !== EMPTY)) {
                    } else {
                        return false;
                    }
                }
            } else {

                if (!(row - 1 < 0) && !(col - 1 < 0) &&
                    !(row - 2 < 0) && !(col - 2 < 0) &&
                    !(row + 1 > this.size - 1) &&
                    !(row + 2 > this.size - 1) &&
                    !(row + 1 > this.size - 1) &&
                    !(col + 1 > this.size - 1) &&
                    !(col + 2 > this.size - 1)) {

                    if ((this.board[row][col - 1] === BLACK &&
                        this.board[row][col - 2] !== EMPTY) ||
                        (this.board[row - 1][col - 1] === BLACK &&
                            this.board[row - 2][col - 2] !== EMPTY) ||
                        (this.board[row - 1][col] === BLACK &&
                            this.board[row - 2][col] !== EMPTY) ||
                        (this.board[row - 1][col + 1] === BLACK &&
                            this.board[row - 2][col + 2] !== EMPTY) ||
                        (this.board[row][col + 1] === BLACK &&
                            this.board[row][col + 2] !== EMPTY) ||
                        (this.board[row + 1][col + 1] === BLACK &&
                            this.board[row + 2][col + 2] !== EMPTY) ||
                        (this.board[row + 1][col] === BLACK &&
                            this.board[row + 2][col] !== EMPTY) ||
                        (this.board[row + 1][col - 1] === BLACK &&
                            this.board[row + 2][col - 2] !== EMPTY)) {

                    } else {
                        return false;
                    }
                }
            }

            // Checking for another disc going left
            if (this.board[row][col - 1] !== EMPTY && (col - 1) !== 0) {
                for (let temp = col - 1; temp > 0; temp--) {
                    if (this.board[row][temp] === disc)
                        validDirection = true;
                }
                for (let leftCol = col - 1; leftCol > 0; leftCol--) {
                    if (this.board[row][leftCol] !== disc &&
                        this.board[row][leftCol - 1] !== EMPTY &&
                        (leftCol - 1) !== 0 && validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going right
            validDirection = false;
            if (this.board[row][col + 1] !== EMPTY &&
                (col + 1) !== this.size) {
                for (let temp = col + 1; temp < this.size; temp++) {
                    if (this.board[row][temp] === disc)
                        validDirection = true;
                }
                for (let rightCol = col + 1; rightCol < this.size; rightCol++) {
                    if (this.board[row][rightCol] !== disc &&
                        this.board[row][rightCol + 1] !== EMPTY &&
                        (rightCol + 1) !== this.size &&
                        validDirection) {
                        return true;
                    }
                }
            }

            // Checking for another disc going up
            if (row - 1 > 0) {
                validDirection = false;
                if (this.board[row - 1][col] !== EMPTY &&
                    (row - 1) !== 0) {
                    for (let i = row - 1; i > 0; i--) {
                        if (this.board[i][col] === disc)
                            validDirection = true;
                    }
                    for (let upRow = row - 1; upRow > 0; upRow--) {
                        if (this.board[upRow][col] !== disc &&
                            this.board[upRow - 1][col] !== EMPTY &&
                            (upRow - 1) !== 0 && validDirection) {
                            return true;
                        }
                    }
                }
            }

            // Checking for another disc going down
            if (row !== this.size - 1) {
                validDirection = false;
                if (this.board[row + 1][col] !== EMPTY &&
                    (row + 1) !== this.size) {
                    for (let upRow = row + 1; upRow < this.size - 1; upRow++) {
                        for (let i = row + 1; i < this.size; i++) {
                            if (this.board[i][col] === disc)
                                validDirection = true;
                        }
                        if (this.board[upRow][col] !== disc &&
                            this.board[(upRow + 1)][col] !== EMPTY &&
                            (upRow + 1) !== this.size && validDirection) {
                            return true;
                        }
                    }
                }
            }

            // Checking for another disc going diagonal up left
            if (row - 1 > 0 && col + 1 > 0) {
                validDirection = false;
                if (this.board[row - 1][col - 1] !== EMPTY &&
                    (col - 1) !== 0 && (row - 1) !== 0) {

                    // Checks whether row or col is smaller
                    let upDiagLeft, currentLocation = 0, count = 1;
                    if (row <= col) upDiagLeft = row;
                    else upDiagLeft = col;

                    for (let i = upDiagLeft; i > 0; i--) {
                        if (this.board[row - count][col - count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagLeft; upDiagLeft > 0; upDiagLeft--) {
                        if (this.board[row - count][col - count] !== disc &&
                            (col - count) !== 0 &&
                            (row - count) !== 0 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }
                }
            }

            // Checking for another disc going diagonal down right
            validDirection = false;
            if (this.board[row + 1][col + 1] !== EMPTY &&
                (col + 1) !== 8 && (row + 1) !== this.size) {

                // Checks whether row or col is smaller
                let downDiagRight, currentLocation = 0, count = 1;
                if (row >= col) downDiagRight = row;
                else downDiagRight = col;

                for (let i = downDiagRight; i < this.size; i++) {
                    if (this.board[row + count][col + count] === disc)
                        validDirection = true;
                    count++;
                }
                count = 1;
                for (downDiagRight; downDiagRight < this.size; downDiagRight++) {
                    if (this.board[row + count][col + count] !== disc &&
                        (col + count) !== this.size &&
                        (row + count) !== this.size && validDirection) {
                        return true;
                    }
                    currentLocation++;
                    count++;
                }
            }

            // Checking for another disc going diagonal down left
            validDirection = false;
            if (this.board[row + 1][col - 1] !== EMPTY &&
                (col - 1) !== 0 && (row + 1) !== this.size) {

                // Checks if row + col is less than 10 to
                // know where the cut off is
                let downDiagLeft, currentLocation = 0, count = 1;
                if (row + col < 10) {
                    downDiagLeft = col;
                    for (let i = downDiagLeft; i > 0; i--) {
                        if (this.board[row + count][col - count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (downDiagLeft; downDiagLeft > 0; downDiagLeft--) {
                        if (this.board[row + count][col - count] !== disc &&
                            (col - count) !== 0 &&
                            (row + count) !== this.size && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }

                } else {
                    downDiagLeft = row;
                    for (let i = downDiagLeft; i < this.size; i++) {
                        if (this.board[row + count][col - count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (downDiagLeft; downDiagLeft < this.size; downDiagLeft++) {
                        if (this.board[row + count][col - count] !== disc &&
                            (col - count) !== 0 &&
                            (row + count) !== this.size && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }
                }
            }

            // Checking for another disc going diagonal up right
            validDirection = false;
            if (this.board[row - 1][col + 1] !== EMPTY &&
                (col + 1) !== this.size && (row - 1) !== 0) {

                // Checks if row + col is less than 10 to know how far to check
                let upDiagRight, currentLocation = 0, count = 1;
                if (row + col < 10) {
                    upDiagRight = row;
                    for (let i = upDiagRight; i > 0; i--) {
                        if (this.board[row - count][col + count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight > 0; upDiagRight--) {
                        if (this.board[row - count][col + count] !== disc
                            && (col + count) !== this.size &&
                            (row - count) !== 0 && validDirection) {
                            return true;
                        }
                        currentLocation++;
                        count++;
                    }

                } else {
                    upDiagRight = col;
                    for (let i = upDiagRight; i < this.size; i++) {
                        if (this.board[row - count][col + count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight < this.size; upDiagRight++) {
                        if (this.board[row - count][col + count] !== disc &&
                            (col + count) !== this.size &&
                            (row - count) !== 0 && validDirection) {
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

    /******************************************************************
     * Function used to place the disc in the given row or col. It will
     * also check to make sure the place
     * that we are trying to place it will be allowed.
     * @param row An integer number for row.
     * @param col An integer number for column.
     * @param disc A character standing for disc color.
     *****************************************************************/
    placeDiskAt(row, col, disc) {

        //place the disc
        this.board[row][col] = disc;
        let validDirection = false;

        // Checking for flips going left
        if (this.board[row][col - 1] !== EMPTY && (col - 1) !== 0) {
            for (let temp = col - 1; temp > 0; temp--) {
                if (this.board[row][temp] === disc)
                    validDirection = true;
            }
            for (let leftCol = col - 1; leftCol > 0; leftCol--) {
                if (this.board[row][leftCol] !== disc &&
                    this.board[row][leftCol] !== EMPTY &&
                    (leftCol) !== 0 && validDirection) {
                    this.board[row][leftCol] = disc;
                } else break;
            }
        }

        validDirection = false;
        // Checking for flips going right
        if (this.board[row][col + 1] !== EMPTY &&
            (col + 1) !== this.size) {
            for (let temp = col + 1; temp < this.size; temp++) {
                if (this.board[row][temp] === disc)
                    validDirection = true;
            }
            for (let rightCol = col + 1; rightCol < this.size; rightCol++) {
                if (this.board[row][rightCol] !== disc &&
                    this.board[row][rightCol] !== EMPTY &&
                    (rightCol) !== this.size && validDirection) {
                    this.board[row][rightCol] = disc;
                } else break;
            }
        }

        validDirection = false;
        // Checking for flips going up
        if (row - 1 > 0) {
            if (this.board[row - 1][col] !== EMPTY && (row - 1) !== 0) {
                for (let i = row - 1; i > 0; i--) {
                    if (this.board[i][col] === disc)
                        validDirection = true;
                }
                for (let upRow = row - 1; upRow > 0; upRow--) {
                    if (this.board[upRow][col] !== disc &&
                        this.board[upRow - 1][col] !== EMPTY &&
                        (upRow) !== 0 && validDirection) {
                        this.board[upRow][col] = disc;
                    } else break;
                }
            }
        }


        // Checking for flips going down
        validDirection = false;
        if (this.board[row + 1][col] !== EMPTY &&
            (row + 1) !== this.size) {
            for (let i = row + 1; i < this.size; i++) {
                if (this.board[i][col] === disc)
                    validDirection = true;
            }
            for (let upRow = row + 1; upRow < this.size; upRow++) {
                if (this.board[upRow][col] !== disc &&
                    this.board[upRow + 1][col] !== EMPTY &&
                    (upRow) !== this.size && validDirection) {
                    this.board[upRow][col] = disc;
                } else break;
            }
        }

        if (this.board[row][col] !== EMPTY && (row) !== this.size) {
            for (let i = row; i < this.size - 1; i++) {
                if (this.board[i][col] === disc)
                    validDirection = true;
            }
            for (let upRow = row; upRow < this.size - 1; upRow++) {
                if (this.board[upRow][col] !== disc &&
                    this.board[upRow + 1][col] !== EMPTY &&
                    (upRow) !== this.size && validDirection) {
                    this.board[upRow][col] = disc;
                } else break;
            }
        }
        // Checking for flips going  up left
        if (row - 1 > 0 && col - 1 > 0) {
            validDirection = false;
            if (this.board[row - 1][col - 1] !== EMPTY &&
                (col - 1) !== 0 && (row - 1) !== 0) {

                // Checks whether row or col is smaller
                let upDiagLeft, currentLocation = 0, count = 1;
                if (row <= col) upDiagLeft = row;
                else upDiagLeft = col;

                for (let i = upDiagLeft; i > 0; i--) {
                    if (this.board[row - count][col - count] === disc)
                        validDirection = true;
                    count++;
                }
                count = 1;
                for (upDiagLeft; upDiagLeft > 0; upDiagLeft--) {
                    if ((this.board[row - count][col - count] === disc ||
                        this.board[row - count][col - count] !== EMPTY) &&
                        (col - count) !== 0 && (row - count) !== 0 &&
                        validDirection) {
                        this.board[row - currentLocation][col - currentLocation] = disc;
                        currentLocation++;
                        count++;
                    } else break;
                }
            }
        }

        // Checking for flips going diagonal down right
        validDirection = false;
        // if (this.board[row + 1][col + 1] !== EMPTY &&
        //     (col + 1) !== 8 && (row + 1) !== this.size) {
        //
        //     // Checks whether row or col is smaller
        //     let downDiagRight, currentLocation = 0, count = 1;
        //     if (row >= col) downDiagRight = row;
        //     else downDiagRight = col;
        //
        //     for (let i = downDiagRight; i < this.size - 1; i++) {
        //         if (this.board[row + count][col + count] === disc)
        //             validDirection = true;
        //         count++;
        //     }
        //     count = 1;
        //     for (downDiagRight; downDiagRight < this.size; downDiagRight++) {
        //         if ((this.board[row + count][col + count] === disc ||
        //             this.board[row + count][col + count] !== EMPTY) &&
        //             (col + count) !== this.size && (row + count) !== this.size &&
        //             validDirection) {
        //             this.board[row + currentLocation][col + currentLocation] = disc;
        //             currentLocation++;
        //             count++;
        //         } else break;
        //     }
        // }

        if (this.board[row][col] !== EMPTY && (col) !== 8 &&
            (row) !== this.size) {

            // Checks whether row or col is smaller
            let downDiagRight, currentLocation = 0, count = 1;
            if (row >= col) downDiagRight = row;
            else downDiagRight = col;

            for (let i = downDiagRight; i < this.size - 1; i++) {
                if (this.board[row + count][col + count] === disc)
                    validDirection = true;
                count++;
            }
            count = 1;
            for (downDiagRight; downDiagRight < this.size - 1; downDiagRight++) {
                if ((this.board[row + count][col + count] === disc ||
                    this.board[row + count][col + count] !== EMPTY) &&
                    (col + count) !== this.size &&
                    (row + count) !== this.size &&
                    validDirection) {
                    this.board[row + currentLocation][col + currentLocation] = disc;
                    currentLocation++;
                    count++;
                } else break;
            }
        }

        //Checking for flips going diagonal down left
        validDirection = false;
        // if (this.board[row + 1][col - 1] !== EMPTY &&
        //     (col - 1) !== 0 && (row + 1) !== this.size) {
        //
        //      // Checks if row + col is less than 10 to
        //     // know where the cut off is
        //      let downDiagLeft, currentLocation = 0, count = 1;
        //      if (row + col < 10) {
        //          downDiagLeft = col;
        //          for (let i = downDiagLeft; i > 1; i--) {
        //              if (this.board[row + count][col - count] === disc)
        //                  validDirection = true;
        //              count++;
        //          }
        //          count = 1;
        //          for (downDiagLeft; downDiagLeft > 0; downDiagLeft--) {
        //              if ((this.board[row + count][col - count] === disc ||
        //                  this.board[row + count][col - count] !== EMPTY) &&
        //                  (col - count) !== 0 && (row + count) !== this.size &&
        //                  validDirection) {
        //                  this.board[row + currentLocation][col - currentLocation] = disc;
        //                  currentLocation++;
        //                  count++;
        //              } else break;
        //          }
        //
        //      } else {
        //          downDiagLeft = row;
        //          for (let i = downDiagLeft; i < this.size - 1; i++) {
        //              if (this.board[row + count][col - count] === disc)
        //                  validDirection = true;
        //              count++;
        //          }
        //          count = 1;
        //          for (downDiagLeft; downDiagLeft < this.size; downDiagLeft++) {
        //              if ((this.board[row + count][col - count] === disc ||
        //                  this.board[row + count][col - count] !== EMPTY) &&
        //                  (col - count) !== 0 && (row + count) !== this.size &&
        //                  validDirection) {
        //                  this.board[row + currentLocation][col - currentLocation] = disc;
        //                  currentLocation++;
        //                  count++;
        //              } else break;
        //          }
        //      }
        //  }

        if (this.board[row - 1][col - 1] !== EMPTY &&
            (col - 1) !== 0 && (row) !== this.size) {

            // Checks if row + col is less than 10 to know where the cut off is
            let downDiagLeft, currentLocation = 0, count = 1;
            if (row + col < 10) {
                downDiagLeft = col;
                for (let i = downDiagLeft; i > 2; i--) {
                    if (this.board[row + count][col - count] === disc)
                        validDirection = true;
                    count++;
                }
                count = 1;
                for (downDiagLeft; downDiagLeft > 0; downDiagLeft--) {
                    if ((this.board[row + count][col - count] === disc ||
                        this.board[row + count][col - count] !== EMPTY) &&
                        (col - count) !== 0 && (row + count) !== this.size &&
                        validDirection) {
                        this.board[row + currentLocation][col - currentLocation] = disc;
                        currentLocation++;
                        count++;
                    } else break;
                }

            } else {
                downDiagLeft = row;
                for (let i = downDiagLeft; i < this.size - 1; i++) {
                    if (this.board[row + count][col - count] === disc)
                        validDirection = true;
                    count++;
                }
                count = 1;
                for (downDiagLeft; downDiagLeft < this.size; downDiagLeft++) {
                    if ((this.board[row + count][col - count] === disc ||
                        this.board[row + count][col - count] !== EMPTY) &&
                        (col - count) !== 0 && (row + count) !== this.size &&
                        validDirection) {
                        this.board[row + currentLocation][col - currentLocation] = disc;
                        currentLocation++;
                        count++;
                    } else break;
                }
            }
        }

        // Checking for flips going diagonal up right
        if (row - 1 > 0 && col + 1 < this.size - 1) {
            validDirection = false;
            if (this.board[row - 1][col + 1] !== EMPTY &&
                (col + 1) !== this.size && (row - 1) !== 0) {

                // Checks if row + col is less than 10 to know how far to check
                let upDiagRight, currentLocation = 0, count = 1;
                if (row + col < 10) {
                    upDiagRight = row;
                    for (let i = upDiagRight; i > 0; i--) {
                        if (this.board[row - count][col + count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight > 0; upDiagRight--) {
                        if ((this.board[row - count][col + count] === disc ||
                            this.board[row - count][col + count] !== EMPTY) &&
                            (col + count) !== this.size && (row - count) !== 0 &&
                            validDirection) {
                            this.board[row - currentLocation][col + currentLocation] = disc;
                            currentLocation++;
                            count++;
                        } else break;
                    }

                } else {
                    upDiagRight = col;
                    for (let i = upDiagRight; i < this.size; i++) {
                        if (this.board[row - count][col + count] === disc)
                            validDirection = true;
                        count++;
                    }
                    count = 1;
                    for (upDiagRight; upDiagRight < this.size; upDiagRight++) {
                        if ((this.board[row - count][col + count] === disc ||
                            this.board[row - count][col + count] !== EMPTY) &&
                            (col + count) !== this.size && (row - count) !== 0 &&
                            validDirection) {
                            this.board[row - currentLocation][col + currentLocation] = disc;
                            currentLocation++;
                            count++;
                        } else break;
                    }
                }
            }
        }
    }

    /******************************************************************
     * isValidMoveAvailable checks the entire board to see if there is
     * a move available.If there is not a valid move available for the
     * given color, then the function returns false.
     * @param disc A character pertaining to a disc color.
     * @return boolean A boolean telling the user whether there are
     *        valid moves availabe for that disc.
     *****************************************************************/
    isValidMoveAvailable(disc) {

        //Variable to count how many possible moves there are
        let possibleMoves = 0;

        // loops through each space on the board and checks if
        // current disc could be placed
        for (let row = 1; row <= this.size; row++) {
            for (let col = 1; col <= this.size; col++) {
                possibleMoves++;
            }
        }
        if (possibleMoves > 0)
            return true;
        else
            return false;
    }

    /******************************************************************
     * isBoardFull checks if the current othello board is full. If so,
     * then it will return true, otherwise it will return false.
     * @return boolean Whether or not the board is full.
     *****************************************************************/
    isBoardFull() {
        for (let row = 1; row <= this.size; row++) {
            for (let col = 1; col <= this.size; col++) {
                if (this.board[row][col] === EMPTY) {
                    return false;
                }
            }
        }
        return true;
    }

    /******************************************************************
     * isGameOver checks whether the game is over or not. It will check
     * to see if the game is over by seeing if there are no available
     * moves or if board is full.
     * @return boolean Whether or not the game is over.
     *****************************************************************/
    isGameOver() {
        if (this.isBoardFull() || !this.isValidMoveAvailable(WHITE) ||
            !this.isValidMoveAvailable(BLACK)) {
            return true;
        }
        return false;
    }

    /******************************************************************
     * checkWinner will see if there is a current winner in the game.
     * If there is a winner, this function will return which player
     * it is.
     * @return string Which player has won.  Return null if
     *        a tie exists.
     *****************************************************************/
    checkWinner() {
        let countBlack = 0;
        let countWhite = 0;

        for (let row = 1; row <= this.size; row++) {
            for (let col = 1; col <= this.size; col++) {
                if (this.board[row][col] === WHITE)
                    countWhite++;
                if (this.board[row][col] === BLACK) {
                    countBlack++;
                }
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
};

//let board = new Board(10, 10);
//board.printBoard();
