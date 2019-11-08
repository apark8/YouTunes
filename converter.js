const ytdl = parent.require('ytdl-core');
const fs = parent.require('fs');
const { scaleButton } = parent.require('./animations.js');

function convert(url) {
    const PATH = './playlist/';
    var promise = ytdl.getBasicInfo(url);
    promise.then((info) => {
        //remove option to add another song until download completes
        var convertButton = document.getElementById('convert');
        scaleButton(0, convertButton, 0);

        var filename = PATH + info.title + '.mp3';
        ytdl(url, filter = 'audioonly')
            .on('finish', () => {
                scaleButton(1, convertButton, 0);
            })
            .pipe(fs.createWriteStream(filename));
    });
}