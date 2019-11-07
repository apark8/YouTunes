const ytdl = parent.require('ytdl-core');
const fs = parent.require('fs');
const { scaleButtons } = parent.require('./animations.js');

function convert(url) {
    const PATH = './playlist/';
    var promise = ytdl.getBasicInfo(url);
    promise.then((info) => {
        //remove option to add another song until download completes
        var convertButtons = document.getElementsByClassName('btn convert');
        scaleButtons(0, convertButtons);

        var filename = PATH + info.title + '.mp3';
        ytdl(url, filter = 'audioonly')
            .on('finish', () => {
                scaleButtons(1, convertButtons);
            })
            .pipe(fs.createWriteStream(filename));
    });
}