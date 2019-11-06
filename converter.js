const ytdl = parent.require('ytdl-core');
const fs = parent.require('fs');

function convert(url) {
    console.log(url);
    let stream = ytdl(url, filter = 'audioonly').pipe(fs.createWriteStream('./test/test.mp3'));

    stream
        .on('progress', (chunkLength, downloaded, total) => {
            let percent = Math.floor((downloaded / total) * 100);
            console.log("Progress:", percent);
        });
}