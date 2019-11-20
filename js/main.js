'use strict'

var gBoard = [];
var gLevel = { size: 4, mines: 2 };
var gGame = { isOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var mineImg = '<img src="./img/mine.png" class="mine">';
var gEmpty = ' ';
var gInterval;
var gFirstClick = 0;


function init() {

    gBoard = createBoard();
    renderBoard(gBoard);
}

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
    console.table(board);
}

function createRandomMines(posI, posJ) {

    var max = gLevel.size - 1;
    var counter = 0;

    while (counter < gLevel.mines) {
        var i = createRandomNum(0, max);
        var j = createRandomNum(0, max);
        var currCell = gBoard[i][j];
        if (!currCell.isMine && (currCell !== gBoard[posI][posJ])) {
            currCell.isMine = true;
            counter++;
        } else continue;
    }
}

function setMinesNegsCount(board) {

    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            var currCell = board[i][j];
            currCell.minesAroundCount = getNeighbors(i, j);
        }
    }
}

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

function cellClicked(elCell, event, i, j) {

    var currCell = gBoard[i][j];
    var click = event.button;

    if (gFirstClick === 0 && click === 0) {
        gGame.isOn = true;
        createRandomMines(i, j);
        setMinesNegsCount(gBoard);
        renderBoard(gBoard);
        firstMove(i, j);
        return;
    }

    if (click === 2) {
        cellMarked(elCell, i, j);
        return;
    }
    if (currCell.isMine) {
        lostGame(elCell);
    } else {
        currCell.isShown = true;
        elCell.classList.remove('hidden');
        checkGameOver(currCell);
    }
}

function firstMove(i, j) {

    getNeighborsFirstMove(i, j);
    startTimer();
    gFirstClick++;
}

function getNeighborsFirstMove(posI, posJ) {

    for (var i = posI - 1; i <= posI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = posJ - 1; j <= posJ + 1; j++) {
            if (j < 0 || j >= gBoard[0].length) continue;
            var currCell = gBoard[i][j];
            if (!currCell.isMine) {
                currCell.isShown = true;
                checkGameOver(currCell);
                showCells(i, j);
            }
        }
    }
}

function cellMarked(elCell, i, j) {

    var currCell = gBoard[i][j];
    if (currCell.isMarked) {
        currCell.isMarked = false;
        elCell.classList.remove('marked');
        elCell.classList.add('hidden');
    } else {
        currCell.isMarked = true;
        elCell.classList.remove('hidden');
        elCell.classList.add('marked');
        checkGameOver(currCell);
    }
}

function checkGameOver(currCell) {

    if (currCell.isShown) gGame.shownCount++;
    if (currCell.isMarked && currCell.isMine) gGame.markedCount++;
    if ((gGame.markedCount + gGame.shownCount) === (Math.pow(gBoard.length, 2))) {
        alert('victory');
        stopTimer();
    } else return;
}

function lostGame(elCell) {

    alert('Game Over!');
    stopTimer();
    elCell.classList.add('hit');
    showAllMines();
}

function restartGame() {

    stopTimer();
    gFirstClick = 0;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.isOn = false;
    var elClock = document.querySelector('.clock');
    elClock.innerHTML = (`00:00`);
    init();
}

function showCells(posI, posJ) {

    var elCell = document.querySelector(`.cell-${posI}-${posJ}`);
    elCell.classList.remove('hidden');
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

function startTimer() {
    gInterval = setInterval(runTimer, 1000);
}

function stopTimer() {
    clearInterval(gInterval);
}

function selectLevel(elButton) {

    if (gGame.isOn) return;
    switch (elButton.className) {
        case ('easy'):
            gLevel.size = 4;
            gLevel.mines = 2;
            break;
        case ('medium'):
            gLevel.size = 8;
            gLevel.mines = 12;
            break;
        case ('hard'):
            gLevel.size = 12;
            gLevel.mines = 30;
    }

    gBoard = createBoard();
    renderBoard(gBoard);
    return gLevel;
}