define(function(require, exports, module){
  
  'use strict';

  ////////////////////////////////////////////////////////////////////////
  // DEPENDENCIES
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  // Private API
  ////////////////////////////////////////////////////////////////////////

  var _Private = function(){
    'use strict';
    return this;
  };

  _Private.prototype = Object.create( Object.prototype );
  
  _Private.prototype.constructor = _Private;

  _Private.prototype.randomColor = function(){
    return '#'+Math.floor(Math.random()*16777215).toString(16);
  };

  var _private = new _Private();

  ////////////////////////////////////////////////////////////////////////
  // Public API
  ////////////////////////////////////////////////////////////////////////

  var fn = function( options ){

    'use strict';

    var Fn = options.Fn;
    var extend = options.extend;

    ////////////////////////////////////////////////////////////////////////
    // spinBlocks public API
    ////////////////////////////////////////////////////////////////////////

    extend.spinBlocks = {};

    extend.spinBlocks.random = function( options ){
      'use strict';

      var instance = options.instance;
      var fields = options.fields;
      var blocks = instance.elements.section.find(fields.blocks);
      var spinningBlocks = instance.elements.section.find('.spin');

      blocks.each(function(){
        $(this).addClass('spin');
      });

      if (spinningBlocks.length === 0) {
        setTimeout(function(){
          blocks.each(function(){
            $(this).removeClass('spin');
          });
        }, 5000);
      }
    };

    return Fn;
  };

  exports = module.exports = fn;
});