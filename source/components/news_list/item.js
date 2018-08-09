/* global zuix */
'use strict';
zuix.controller(function(cp){
  cp.create = function() {
    cp.field('container').css({
      'background-image': 'url('+cp.model().cover+')',
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      'background-position': 'center center'
    });
    cp.view().on('click', function() {
      window.open(cp.model().link);
    });

  };
});
