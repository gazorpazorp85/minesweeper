'use strict'

var gBest = localStorage.getItem('btime');
var gStartingTime = 0;
var gMins = 0;
var gSecs = 0;
var gInterval;
var gCurrentTime = 0;
var gBestTime = 0;

// creates a random number (includes min and max)

function createRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// timer function

function runTimer() {

    gSecs++;
    gCurrentTime = gSecs;
    if (gSecs == 60) {
        gMins++;
        gSecs = 0;
    }
    var showClock = document.querySelector('.clock');
    if (gSecs < 10) {
        showClock.innerHTML = (`0${gMins}:0${gSecs}`);
    } else if (gMins < 10) {
        showClock.innerHTML = (`0${gMins}:${gSecs}`);
    } else {
        showClock.innerHTML = (`${gMins}:${gSecs}`);
    }
}

function startTimer() {
    gInterval = setInterval(runTimer, 1000);
}

function stopTimer() {
    clearInterval(gInterval);
}

function resetTimer() {
    gMins = 0;
    gSecs = 0;
}