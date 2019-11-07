const anime = require('animejs');

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

function scaleButtons(scale, buttons) {
    const SPEED = 200;
    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: buttons.length * SPEED
    })
    for (var i = 0; i < buttons.length; i++) {
        animation.add({
            targets: buttons[i],
            scale: scale,
            duration: SPEED
        }, i * SPEED);
    }
}

module.exports = { scaleButtons };