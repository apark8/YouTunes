const fs = parent.require('fs');

function play(path) {
    var audio = new Audio(path);
    audio.play();
}

//get files in playlist
const PATH = './playlist/';
var files = fs.readdirSync(PATH);

//create playlist
var table = document.getElementById('playlist');
for (var i = 0; i < files.length; i++) {
    var row = table.insertRow(i);
    var cell = row.insertCell(0);
    cell.innerHTML = '<button onclick="play(\'' + PATH + files[i] + '\')">' + files[i] + '</button>';
}