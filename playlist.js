const anime = parent.require('animejs');
const fs = parent.require('fs');
const { scaleButtons } = parent.require('./animations.js');

let currentSong = null;

function play(path) {
    var audio = new Audio(path);
    audio.play();

    var playButtons = document.getElementsByClassName('btn play');
    var pauseButton = document.getElementsByClassName('btn pause');
    scaleButtons(0, playButtons);
    scaleButtons(1, pauseButtons);

    currentSong = {
        audio: audio,
        path: path
    }
}

function pause() {
    currentSong.audio.pause();

    var playButtons = document.getElementsByClassName('btn play');
    var pauseButtons = document.getElementsByClassName('btn pause');
    scaleButtons(1, playButtons);
    scaleButtons(0, pauseButtons);
}

//remove pause button
var pauseButtons = document.getElementsByClassName('btn pause');
scaleButtons(0, pauseButtons);

//get files in playlist
const PATH = './playlist/';
var files = fs.readdirSync(PATH);

//create playlist
var table = document.getElementById('playlist');
for (var i = 0; i < files.length; i++) {
    var row = table.insertRow(i);
    var playbtn = row.insertCell(0);
    var song = row.insertCell(1);
    playbtn.innerHTML = '<button class="btn play" onclick="play(\'' + PATH + files[i] + '\')"></button>';
    song.innerHTML = files[i];
}