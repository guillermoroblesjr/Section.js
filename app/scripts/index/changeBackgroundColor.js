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
    return '#' + ("000000" + Math.random().toString(16).slice(2, 8).toUpperCase()).slice(-6);
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
    // changeBackgroundColor public API
    ////////////////////////////////////////////////////////////////////////

    extend.changeBackgroundColor = {};

    extend.changeBackgroundColor.random = function( options ){
      'use strict';

      var instance = options.instance;
      var fields = options.fields;

      instance.elements.section.find(fields.blocks).each(function(){
        $(this).css('background-color', _private.randomColor());
      });
    };

    return Fn;
  };

  exports = module.exports = fn;
});