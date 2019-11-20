'use strict'

// creates a random number (includes min and max)

function createRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// timer function

var mins = 0;
var secs = 0;
var mili = 0;
var gInterval;

function runTimer() {

/*    if (mili >= 999) {
        secs++;
        mili = 0;
    } else {
        mili+= 9;
    }
*/
secs++;
    if (secs == 60) {
        mins++;
        secs = 0;
    }
    var showClock = document.querySelector('.clock');
    if (secs < 10) {
        showClock.innerHTML = (`0${mins}:0${secs}`);/*.${mili}`);*/
    } else if (mins < 10) {
        showClock.innerHTML = (`0${mins}:${secs}`);/*.${mili}`);*/
    } else {
        showClock.innerHTML = (`${mins}:${secs}`);/*.${mili}`);*/
    }
}