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
            translateX: (window.innerWidth - document.getElementById('mainnav').offsetWidth) / 2,
            scaleX: window.innerWidth / document.getElementById('mainnav').offsetWidth,
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
                translateX: 0,
                scaleX: 1,
                duration: 750
            })
            .add({
                targets: 'div.sidenav a',
                opacity: 1,
                duration: 250
            })
    });
}