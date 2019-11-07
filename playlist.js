const anime = parent.require('animejs');
const fs = parent.require('fs');

let currentSong = null;

function scalePlayButtons(scale) {
    const SPEED = 200;
    playButtons = document.getElementsByClassName('btn play');
    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: playButtons.length * SPEED
    })
    for (var i = 0; i < playButtons.length; i++) {
        animation.add({
            targets: playButtons[i],
            scale: scale,
            duration: SPEED
        }, i * SPEED);
    }
}

function play(path) {
    var audio = new Audio(path);
    audio.play();
    scalePlayButtons(0);

    currentSong = {
        audio: audio,
        path: path
    }
}

function pause() {
    currentSong.audio.pause();
    scalePlayButtons(1);
}

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