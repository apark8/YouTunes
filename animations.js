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
            translateX: (window.innerWidth - document.getElementsByClassName('sidenav')[0].offsetWidth) / 2,
            scaleX: window.innerWidth / document.getElementsByClassName('sidenav')[0].offsetWidth,
            duration: 750
        })

    //once completed, go back to original size and fade in words
    animation.finished.then(() => {
        document.getElementsByClassName('page')[0].src = destination
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