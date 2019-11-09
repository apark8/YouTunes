const anime = parent.require('animejs');
const fs = parent.require('fs');
const { scaleButton, slideSong, rippleSongs } = parent.require('./animations.js');

//initialize globals
const PATH = './playlist/';
let files = fs.readdirSync(PATH);
let currentSong = {};

function next() {
    //stop current song
    var songs = document.getElementsByClassName('song');
    currentSong.audio.pause();
    slideSong(-30, 0.25, songs[currentSong.index], 0);

    //if no song next, start from first song in playlist
    if (currentSong.index == files.length - 1)
        currentSong.index = 0;
    else
        currentSong.index++;

    //change to next song and play
    var audio = new Audio(PATH + files[currentSong.index]);
    audio.play();
    currentSong.audio = audio;
    slideSong(0, 1, songs[currentSong.index], 0);
}

function previous() {
    //stop current song
    var songs = document.getElementsByClassName('song');
    currentSong.audio.pause();
    slideSong(-30, 0.25, songs[currentSong.index], 0);

    //if no song previous, start from last song in playlist
    if (currentSong.index == 0)
        currentSong.index = files.length - 1;
    else
        currentSong.index--;

    //change to previous song and play
    var audio = new Audio(PATH + files[currentSong.index]);
    audio.play();
    currentSong.audio = audio;
    slideSong(0, 1, songs[currentSong.index], 0);
}

function play(index) {
    //if new song, play from beginning
    if (!currentSong || index != currentSong.index) {
        var path = PATH + files[index];
        var audio = new Audio(path);
    }
    //otherwise, continue from before
    else 
        var audio = currentSong.audio;

    audio.play();

    //store data about current song
    currentSong.audio = audio;
    currentSong.index = index;

    //animations
    var playButtons = document.getElementsByClassName('btn play');
    var pauseButton = document.getElementById('pause');
    var nextButton = document.getElementById('next');
    var prevButton = document.getElementById('previous');
    var songs = document.getElementsByClassName('song');
    scaleButton(1, pauseButton, 0);
    scaleButton(1, nextButton, 0);
    scaleButton(1, prevButton, 0);
    rippleSongs(0, playButtons, -30, 0.25, 0, 1, index, songs);

    //when song ends, go to next
    audio.onended = () => {
        next();
    }
}

function pause() {
    currentSong.audio.pause();

    //animations
    var playButtons = document.getElementsByClassName('btn play');
    var pauseButton = document.getElementById('pause');
    var nextButton = document.getElementById('next');
    var prevButton = document.getElementById('previous');
    var songs = document.getElementsByClassName('song');
    scaleButton(0, pauseButton, 0);
    scaleButton(0, nextButton, 0);
    scaleButton(0, prevButton, 0);
    rippleSongs(1, playButtons, 0, 1, 0, 1, currentSong.index, songs);
}

//remove pause/next buttons until music is played
var pauseButton = document.getElementById('pause');
var nextButton = document.getElementById('next');
var prevButton = document.getElementById('previous');
scaleButton(0, pauseButton, 0);
scaleButton(0, nextButton, 0);
scaleButton(0, prevButton, 0);

//create playlist
var table = document.getElementById('playlist');
for (var i = 0; i < files.length; i++) {
    var row = table.insertRow(i);
    var playbtn = row.insertCell(0);
    var song = row.insertCell(1);
    playbtn.innerHTML = '<button class="btn play" onclick="play(' + i + ')"></button>';
    song.innerHTML = '<div class="song">' + files[i] + '</div>';
}