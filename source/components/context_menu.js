'use strict';
zuix.controller(function(cp){
    let menuView;

    cp.create = function() {
        menuView = cp.view('.menu');
        menuView
            .css('bottom', -(menuView.position().rect.height)+'px')
            .find('div').on('click', function(e) {
                // TODO: option clicked
                e.cancelBubble = true;
            });
        cp.view()
            .css('opacity', 0)
            .hide()
            .on('click', function() {
                hideMenu();
            });
        zuix.load('@lib/controllers/gesture_helper', {
            view: cp.view(),
            on: {
                'gesture:pan': function(e, tp) {
                    if (!menuView.hasClass('no-transition')) {
                        menuView.addClass('no-transition');
                    }
                    if (tp.shiftY > 0) {
                        menuView.css('bottom', -tp.shiftY + 'px');
                    }
                },
                'gesture:release': function(e, tp) {
                    menuView.removeClass('no-transition');
                    if (tp.velocity <= 0) {
                        menuView.css('bottom', 0);
                    } else hideMenu();
                }
            }
        });
        cp.expose('show', showMenu);
        cp.expose('hide', hideMenu);
    };

    function showMenu() {
        cp.view().show();
        // animation will not work without this delay =/
        setTimeout(()=>{
            cp.view().css('opacity', 1);
            menuView.css('bottom', 0);
        }, 100);
    }

    function hideMenu() {
        cp.view()
            .one('transitionend', function() {
                this.hide();
            })
            .css('opacity', 0);
        menuView
            .css('bottom', -(menuView.position().rect.height)+'px');
    }
});
