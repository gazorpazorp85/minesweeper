'use strict'

var gBoard = [];
var gLevel = { size: 4, mines: 2 };
var gGame = { isOn: false, isOver: false, shownCount: 0, markedCount: 0, secsPassed: 0 };
var mineImg = '<img src="./img/mine.png" class="mine">';
var gEmpty = ' ';
var gInterval;
var gFirstClick = 0;
var gSmiley = '&#128522;';
var gLives = '&#127829;';
var gHintIcon = '💡';
var gHintOn = false;
var gHintCounter = 3;
var gLifeCount = 3;

function init() {

    gBoard = createBoard();
    renderBoard(gBoard);
    var elButton = document.querySelector('.restart');
    elButton.innerHTML = `${gSmiley}`;
    var elSpan = document.querySelector('.life');
    elSpan.innerHTML = `Lives: ${gLives}${gLives}${gLives}`;
    var elButtonHints = document.querySelector('.hints');
    elButtonHints.innerHTML = `Hints: ${gHintIcon}${gHintIcon}${gHintIcon}`;
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

function firstMove(i, j) {

    getNeighborsFirstMove(i, j);
    startTimer();
    gFirstClick++;
}

function checkGameOver(currCell, elCell) {

    if (currCell.isMine && !currCell.isMarked) {
        lostLife(currCell, elCell);
        return;
    }
    if (currCell.isShown) gGame.shownCount++;
    if (currCell.isMarked && currCell.isMine) gGame.markedCount++;
    if ((gGame.markedCount + gGame.shownCount) === (Math.pow(gBoard.length, 2))) {

        stopTimer();
        showPopUp();

    } else return;
}

function lostLife(currCell, elCell) {

    var elSpan = document.querySelector('.life');
    gLifeCount--;

    switch (gLifeCount) {
        case (gLifeCount = 2):
            elSpan.innerHTML = `Lives: ${gLives}${gLives}`;
            lostLifeCase(currCell, elCell);
            break;
        case (gLifeCount = 1):
            elSpan.innerHTML = `Lives: ${gLives}`;
            lostLifeCase(currCell, elCell);
            break;
        case (gLifeCount = 0):
            stopTimer();
            elCell.classList.add('hit');
            showAllMines();
            elSpan.innerText = `Lives:`;
            showPopUp();
            break;
    }
}

function lostLifeCase(currCell, elCell) {

    var elPopUp2 = document.querySelector('.popup2');

    elCell.classList.remove('hidden');
    elCell.classList.add('hit');
    setTimeout(function () { elCell.classList.remove('hit'); }, 1000);
    setTimeout(function () { elCell.classList.add('hidden'); }, 1000);
    elPopUp2.innerText = 'You clicked on a mine.';
    elPopUp2.style.display = 'inline-block';
    setTimeout(function () { elPopUp2.style.display = 'none'; }, 1000);
    currCell.isShown = false;
}

function showPopUp() {

    var elPopup = document.querySelector('.popup');
    var elButton = document.querySelector('.restart');

    if (gLifeCount === 0) {
        elPopup.innerText = 'You ran out of pizzas. Game Over';
        elPopup.style.display = 'inline-block';
        gGame.isOver = true;
        gSmiley = '&#128532;'
        elButton.innerHTML = `${gSmiley}`;
    } else {
        elPopup.innerText = 'Congratulations! You Have Won!';
        elPopup.style.display = 'inline-block';
        gSmiley = '&#128526;'
        elButton.innerHTML = `${gSmiley}`;
    }
}

function isHintOn() {
    if (gHintCounter > 0) {
        var elPopup = document.querySelector('.popup');
        elPopup.innerText = 'You are in hint mode';
        elPopup.style.display = 'inline-block';
        gHintOn = true;
    }
}

function hintButtonDisplay() {
    var elButtonHints = document.querySelector('.hints');
    if (gHintCounter === 2) elButtonHints.innerHTML = `Hints: ${gHintIcon}${gHintIcon}`;
    if (gHintCounter === 1) elButtonHints.innerHTML = `Hints: ${gHintIcon}`;
    if (gHintCounter === 0) elButtonHints.innerHTML = `Hints: No hints left.`;
}

function restartGame() {

    stopTimer();
    var elPopup = document.querySelector('.popup');
    elPopup.style.display = 'none';
    var elSpan = document.querySelector('.life');
    elSpan.innerText = `Lives: ${gLives}${gLives}${gLives}`;
    gSmiley = '&#128522;'
    gFirstClick = 0;
    gLifeCount = 3;
    gHintCounter = 3;
    gGame.shownCount = 0;
    gGame.markedCount = 0;
    gGame.isOn = false;
    gGame.isOver = false;
    var elClock = document.querySelector('.clock');
    elClock.innerHTML = (`00:00`);
    resetTimer();
    init();
}