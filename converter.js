const ytdl = parent.require('ytdl-core');
const fs = parent.require('fs');

function convert(url) {
    const PATH = './playlist/';
    var promise = ytdl.getBasicInfo(url);
    promise.then((info) => {
        var filename = PATH + info.title + '.mp3';
        ytdl(url, filter = 'audioonly').pipe(fs.createWriteStream(filename));
    });
}