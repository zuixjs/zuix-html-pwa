/* global zuix */
'use strict';
zuix.controller(function(cp){
  cp.create = function() {

    cp.view().on('click', function() {
      window.open(cp.model().link);
    });

  };
});
