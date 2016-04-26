(function(){

  'use strict';

  var bc = 'bower_components/';

  require.config({
    waitSeconds: 0,
    baseUrl: '',
    paths: {
      Section:     'scripts/Section/Section'

      // Bower Components

    },
    shim: {
      jquery: { exports: 'jQuery' },
    },
  });

})();