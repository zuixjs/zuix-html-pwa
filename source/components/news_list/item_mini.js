/* global zuix */
'use strict';
zuix.controller(function(cp){

    cp.create = function() {
        cp.field('container')
            .css('background-image', 'url('+cp.model().cover+')')
            .on('click', function() {
                window.open(cp.model().link);
            });
        cp.view('.summary')
            .on('click', function() {
                window.open(cp.model().link);
            });
        cp.field('more').on('click', function() {
            // show context menu
            zuix.context('news-options-menu').show();
        });
    };

});
