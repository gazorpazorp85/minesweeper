'use strict'

var gMins = 0;
var gSecs = 0;
var gEasyBest = localStorage.getItem('easybesttime');
var gEasyBestMins = localStorage.getItem('easybestmins');
var gEasyBestSecs = localStorage.getItem('easybestsecs');
var gMediumBest = localStorage.getItem('mediumbesttime');
var gMediumBestMins = localStorage.getItem('mediumbestmins');
var gMediumBestSecs = localStorage.getItem('mediumbestsecs');
var gHardBest = localStorage.getItem('hardbesttime');
var gHardBestMins = localStorage.getItem('hardbestmins');
var gHardBestSecs = localStorage.getItem('hardbestsecs');
var gInterval;
var gStartingTime = 0;
var gCurrentTime = 0;

function createRandomNum(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function copyValuesObj(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function runTimer() {
    gSecs++;
    gCurrentTime++;
    if (gSecs == 60) {
        gMins++;
        gSecs = 0;
    }

    showTimer();
}

function showTimer() {

    var showClock = document.querySelector('.clock');
    if (gSecs < 10) {
        showClock.innerHTML = (`Time: 0${gMins}:0${gSecs}`);
    } else if (gMins < 10) {
        showClock.innerHTML = (`Time: 0${gMins}:${gSecs}`);
    } else {
        showClock.innerHTML = (`Time: ${gMins}:${gSecs}`);
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

function checkBestTime() {

    switch (gLevel.size) {
        case (gLevel.size = 4):
            if (gEasyBest === null) {
                setBestTime();
                showBestTime();
            } else if (gCurrentTime < parseInt(gEasyBest)) {
                setBestTime();
                showBestTime();
                break;
            }
        case (gLevel.size = 8):
            if (gMediumBest === null) {
                setBestTime();
                showBestTime();
            } else if (gCurrentTime < parseInt(gMediumBest)) {
                setBestTime();
                showBestTime();
                break;
            }
        case (gLevel.size = 12):
            if (gHardBest === null) {
                setBestTime();
                showBestTime();
            } else if (gCurrentTime < parseInt(gHardBest)) {
                setBestTime();
                showBestTime();
                break;
            }
    }
}

function setBestTime() {

    switch (gLevel.size) {
        case (gLevel.size = 4):
            gEasyBest = gCurrentTime;
            gEasyBestSecs = gSecs;
            gEasyBestMins = gMins;
            localStorage.setItem('easybesttime', gEasyBest);
            localStorage.setItem('easybestsecs', gEasyBestSecs);
            localStorage.setItem('easybestmins', gEasyBestMins);
            break;
        case (gLevel.size = 8):
            gMediumBest = gCurrentTime;
            gMediumBestSecs = gSecs;
            gMediumBestMins = gMins;
            localStorage.setItem('mediumbesttime', gMediumBest);
            localStorage.setItem('mediumbestsecs', gMediumBestSecs);
            localStorage.setItem('mediumbestmins', gMediumBestMins);
            break;
        case (gLevel.size = 12):
            gHardBest = gCurrentTime;
            gHardBestSecs = gSecs;
            gHardBestMins = gMins;
            localStorage.setItem('hardbesttime', gHardBest);
            localStorage.setItem('hardbestsecs', gHardBestSecs);
            localStorage.setItem('hardbestmins', gHardBestMins);
            break;
    }
}

function showBestTime() {

    var elBest = document.querySelector('.best');

    switch (gLevel.size) {
        case (gLevel.size = 4):
            if (gEasyBest === null) {
                elBest.innerHTML = (`Best Time: 00:00`);
            } else if (gEasyBest !== null) {
                if (gEasyBestSecs < 10) {
                    elBest.innerHTML = (`Best Time: 0${gEasyBestMins}:0${gEasyBestSecs}`);
                } else if (gEasyBestMins < 10) {
                    elBest.innerHTML = (`Best Time: 0${gEasyBestMins}:${gEasyBestSecs}`);
                } else {
                    elBest.innerHTML = (`Best Time: ${gEasyBestMins}:${gEasyBestSecs}`);
                }
            }
            break;
        case (gLevel.size = 8):
            if (gMediumBest === null) {
                elBest.innerHTML = (`Best Time: 00:00`);
            } else if (gMediumBest !== null) {
                if (gMediumBestSecs < 10) {
                    elBest.innerHTML = (`Best Time: 0${gMediumBestMins}:0${gMediumBestSecs}`);
                } else if (gEasyBestMins < 10) {
                    elBest.innerHTML = (`Best Time: 0${gMediumBestMins}:${gMediumBestSecs}`);
                } else {
                    elBest.innerHTML = (`Best Time: ${gMediumBestMins}:${gMediumBestSecs}`);
                }
            }
            break;
        case (gLevel.size = 12):
            if (gHardBest === null) {
                elBest.innerHTML = (`Best Time: 00:00`);
            } else if (gHardBest !== null) {
                if (gHardBestSecs < 10) {
                    elBest.innerHTML = (`Best Time: 0${gHardBestMins}:0${gHardBestSecs}`);
                } else if (gHardBestMins < 10) {
                    elBest.innerHTML = (`Best Time: 0${gHardBestMins}:${gHardBestSecs}`);
                } else {
                    elBest.innerHTML = (`Best Time: ${gHardBestMins}:${gHardBestSecs}`);
                }
            }
            break;
    }
}