'use strict'

function getNeighbors(posI, posJ) {

    var counter = 0;

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            if (i === posI && j === posJ) continue;
            var currCell = gBoard[i][j];
            if (currCell.isMine) {
                counter++;
            }
        }
    }
    return counter;
}

function getNeighborsFirstMove(posI, posJ) {

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var currCell = gBoard[i][j];
            if (!currCell.isMine && !currCell.isShown) {
                currCell.isShown = true;
                checkGameOver(currCell);
                showCells(i, j);
                if (currCell.minesAroundCount === 0) checkLengths(i, j);
            } else continue;
        }
    }
}

function checkLengths(i, j) {

    if (i < 0 && (j >= 0 && j <= gBoard.length)) return getNeighborsFirstMove(i + 1, j);
    if (i >= gBoard.length && (j >= 0 && j <= gBoard.length)) return getNeighborsFirstMove(i - 1, j);
    if (j < 0 && (i >= 0 && i <= gBoard.length)) return getNeighborsFirstMove(i, j + 1);
    if (j >= gBoard.length && (i >= 0 && i <= gBoard.length)) return getNeighborsFirstMove(i, j - 1);
    if (i < 0 && j < 0) return getNeighborsFirstMove(i + 1, j + 1);
    if (i >= gBoard.length && j >= gBoard.length) return getNeighborsFirstMove(i - 1, j - 1);
    if ((i >= 0 && i <= gBoard.length) && (j >= 0 && j <= gBoard.length)) return getNeighborsFirstMove(i, j);
}

function getNeighborsEmptyCellClicked(posI, posJ) {

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var currCell = gBoard[i][j];
            if (currCell.isMine && currCell.isShown) continue;
            if (!currCell.isShown) {
                currCell.isShown = true;
                checkGameOver(currCell);
                showCells(i, j);
            }
        }
    }
}

function setRandomMines(posI, posJ, counter) {
    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var currCell = gBoard[i][j];
            if (currCell.isMine) {
                currCell.isMine = false;
                counter--;
            }
        }
    }
    return counter;
}


function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            currCell.minesAroundCount = getNeighbors(i, j);
        }
    }
}

function getNeighborsHint(posI, posJ) {

    var clonedBoard = cloneBoard();
    renderClonedBoard(clonedBoard);

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= clonedBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= clonedBoard[0].length) continue;
            var currCell = clonedBoard[i][j];
            if (currCell.isShown) continue;
            if (!currCell.isShown) {
                currCell.isShown = true;
                showClonedCells(i, j);
            }
        }
    }
    setTimeout(function () {
        renderBoard(gBoard);
    }, 1000);
    gHintOn = false;
    var elPopup = document.querySelector('.popup');
    elPopup.style.display = 'none';
    gHintCounter--;
    hintButtonDisplay();
    return gHintCounter;
}
