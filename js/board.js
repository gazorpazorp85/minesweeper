'use strict'

function createBoard() {

    var board = [];
    for (var i = 0; i < gLevel.size; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.size; j++) {
            var cell = {
                minesAroundCount: 0,
                isShown: false,
                isMine: false,
                isMarked: false,
            };
            board[i][j] = cell;
        }
    }
    return board;
}

function renderBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHTML += '<tr>\n'
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j];
            var className = (cell.isMine) ? 'mine' : 'empty';
            var cellHtml = '';
            (cell.isMine) ? cellHtml = mineImg : cellHtml = cell.minesAroundCount;
            if (cellHtml === 0) cellHtml = ' ';
            strHTML += `\t<td class="cell-${i}-${j} ${className} hidden" oncontextmenu="return false;" 
                        onmousedown="cellClicked(this, event, ${i}, ${j}), event">${cellHtml}</td>\n`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}

function cellClicked(elCell, event, i, j) {

    if (gGame.isOver) return;

    var currCell = gBoard[i][j];
    var click = event.button;

    if (click === 2 && gFirstClick === 0) return;

    if (gFirstClick === 0 && click === 0) {
        gGame.isOn = true;
        createRandomMines(i, j);
        setMinesNegsCount(gBoard);
        renderBoard(gBoard);
        firstMove(i, j);
        return;
    }

    if (currCell.minesAroundCount === 0 && !currCell.isShown && !currCell.isMine) getNeighborsEmptyCellClicked(i, j);

    if (click === 2) {
        cellMarked(currCell, elCell);
        return;
    }

    if (gHintOn) getNeighborsHint(i, j);

    if (!currCell.isShown) {
        currCell.isShown = true;
        elCell.classList.remove('hidden');
        checkGameOver(currCell, elCell);
    }
}

function cellMarked(currCell, elCell) {

    if (currCell.isShown) return;
    if (currCell.isMarked) {
        currCell.isMarked = false;
        elCell.classList.remove('marked');
        elCell.classList.add('hidden');
    } else {
        currCell.isMarked = true;
        elCell.classList.remove('hidden');
        elCell.classList.add('marked');
        checkGameOver(currCell, elCell);
    }
}

function createRandomMines(posI, posJ) {

    var max = gLevel.size - 1;
    var counter = 0;

    while (counter < gLevel.mines) {
        var i = createRandomNum(0, max);
        var j = createRandomNum(0, max);
        var currCell = gBoard[i][j];
        if (currCell.isMine || currCell === gBoard[posI][posJ]) continue;
        currCell.isMine = true;
        counter++;
        counter = setRandomMines(posI, posJ, counter);
    }
}

function showCells(posI, posJ) {

    var elCell = document.querySelector(`.cell-${posI}-${posJ}`);
    elCell.classList.remove('hidden');
}

function hideCells(posI, posJ) {
    var elCell = document.querySelector(`.cell-${posI}-${posJ}`);
    elCell.classList.add('hidden');
}

function showAllMines() {

    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isMine && !currCell.isShown) {
                showCells(i, j);
            }
        }
    }
}