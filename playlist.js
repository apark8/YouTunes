const anime = parent.require('animejs');
const fs = parent.require('fs');

function movePlayButton() {
    const SPEED = 300;
    playButtons = document.getElementsByClassName('playbtn');
    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: playButtons.length * SPEED
    })
    for (var i = 0; i < playButtons.length; i++) {
        animation.add({
            targets: playButtons[i],
            scale: 0,
            duration: SPEED
        }, i * SPEED);
    }
}

function play(path) {
    var audio = new Audio(path);
    movePlayButton();
    audio.play();
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
    playbtn.innerHTML = '<button class="playbtn" onclick="play(\'' + PATH + files[i] + '\')"></button>';
    song.innerHTML = files[i];
}