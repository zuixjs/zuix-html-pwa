'use strict';
zuix.controller(function(cp){

    cp.create = function() {
        cp.view().hide().on('click', function() {
            hideMenu();
        });
        cp.expose('show', showMenu);
        cp.expose('hide', hideMenu);
    };

    function showMenu() {
        cp.view('.menu')
            .one('webkitAnimationEnd', function() {
                this.removeClass('animated fadeInUp');
                //this.css('webkitAnimationPlayState', 'paused');
            })
            .addClass('animated fadeInUp');
        cp.view().show();
    }

    function hideMenu() {
        cp.view('.menu')
            .one('webkitAnimationEnd', function() {
                this.removeClass('animated fadeOutDown');
                //this.css('webkitAnimationPlayState', 'paused');
                cp.view().hide();
            })
            .addClass('animated fadeOutDown');
    }

});
