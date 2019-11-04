function changePage(destination) {
    //fade out words and then stretch sidenav to fullscreen
    var animation = anime.timeline({
        easing: 'easeOutExpo',
        duration: 1500
    });
    animation
        .add({
            targets: 'div.sidenav a',
            opacity: 0,
            duration: 500
        })
        .add({
            targets: 'div.sidenav',
            translateX: (window.innerWidth - document.getElementsByClassName('sidenav')[0].offsetWidth) / 2,
            scaleX: window.innerWidth / document.getElementsByClassName('sidenav')[0].offsetWidth,
            duration: 1000
        })

    //once completed, go back to original size and fade in words
    animation.finished.then(() => {
        document.getElementsByClassName('page')[0].src = destination
        var animation = anime.timeline({
            easing: 'easeOutExpo',
            duration: 1500
        });
        animation
            .add({
                targets: 'div.sidenav',
                translateX: 0,
                scaleX: 1,
                duration: 1000
            })
            .add({
                targets: 'div.sidenav a',
                opacity: 1,
                duration: 500
            })
    });
}