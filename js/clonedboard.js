'use strict'

function cloneBoard() {
    var clonedBoard = [];
    for (var i = 0; i < gBoard.length; i++) {
        clonedBoard[i] = [];
        for (var j = 0; j < gBoard[0].length; j++) {
            var item = gBoard[i][j];
            clonedBoard[i][j] = copyValuesObj(item);
        }
    }
    return clonedBoard;
}

function renderClonedBoard(board) {

    var strHTML = '';
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHTML += '<tr>\n'
        for (var j = 0; j < row.length; j++) {
            var cell = board[i][j];
            var className = (cell.isMine) ? 'mine' : 'empty';
            var className2 = (!cell.isShown) ? 'hidden' : '';
            var className3 = (cell.isMarked) ? 'marked' : '';
            var cellHtml = '';
            (cell.isMine) ? cellHtml = mineImg : cellHtml = cell.minesAroundCount;
            if (cell.isMarked) cellHtml = gMarkedIcon;
            if (cellHtml === 0) cellHtml = ' ';
            strHTML += `\t<td class="cloned cell-${i}-${j} ${className} ${className2} ${className3}" oncontextmenu="return false;" 
                        onmousedown="cellClicked(this, event, ${i}, ${j}), event">${cellHtml}</td>\n`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board-container');
    elBoard.innerHTML = strHTML;
}

function showClonedCells(posI, posJ) {

    var elCell = document.querySelector(`.cloned.cell-${posI}-${posJ}`);
    elCell.classList.remove('hidden');
}

function hideClonedCells(posI, posJ) {
    var elCell = document.querySelector(`.cloned.cell-${posI}-${posJ}`);
    elCell.classList.add('hidden');
}