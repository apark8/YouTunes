const anime = require('animejs');

const SPEED = 200;

function changePage(destination) {
    //fade out words and then stretch sidenav to fullscreen
    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1000
    });
    animation
        .add({
            targets: 'div.sidenav a',
            opacity: 0,
            duration: 250
        })
        .add({
            targets: 'div.sidenav',
            translateY: -((window.innerHeight - document.getElementById('mainnav').offsetHeight) / 2),
            scaleY: window.innerHeight / document.getElementById('mainnav').offsetHeight,
            duration: 750
        })

    //once completed, go back to original size and fade in words
    animation.finished.then(() => {
        document.getElementById('mainpage').src = destination
        var animation = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1000
        });
        animation
            .add({
                targets: 'div.sidenav',
                translateY: 0,
                scaleY: 1,
                duration: 750
            })
            .add({
                targets: 'div.sidenav a',
                opacity: 1,
                duration: 250
            })
    });
}

function scaleButton(scale, button, delay) {
    anime({
        targets: button,
        scale: scale,
        delay: delay,
        duration: SPEED
    });
}

function slideSong(translation, opacity, song, delay) {
    anime({
        targets: song,
        translateX: translation,
        opacity: opacity,
        delay: delay,
        duration: SPEED
    });
}

function rippleSongs(scale, buttons, translation, opacity, indexTranslation, indexOpacity, index, songs) {
    //start from index and ripple from both sides
    scaleButton(scale, buttons[index], 0);
    slideSong(indexTranslation, indexOpacity, songs[index], 0);
    //top side ripple
    for (var i = index - 1; i >= 0; i--) {
        scaleButton(scale, buttons[i], (index - i) * SPEED);
        slideSong(translation, opacity, songs[i], (index - i) * SPEED);
    }
    //bottom side ripple
    for (var i = index + 1; i < songs.length; i++) {
        scaleButton(scale, buttons[i], (i - index) * SPEED);
        slideSong(translation, opacity, songs[i], (i - index) * SPEED);
    }
}

module.exports = { scaleButton, slideSong, rippleSongs };