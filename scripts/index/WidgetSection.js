define(function(require, exports, module){

  'use strict';

  ////////////////////////////////////////////////////////////////////////
  // DEPENDENCIES
  ////////////////////////////////////////////////////////////////////////

  var Section = require('Section');

  ////////////////////////////////////////////////////////////////////////
  // Private API
  ////////////////////////////////////////////////////////////////////////

  var _Private = function(){
    'use strict';
    return this;
  };

  _Private.prototype = Object.create( Object.prototype );
  
  _Private.prototype.constructor = _Private;

  var _private = new _Private();

  ////////////////////////////////////////////////////////////////////////
  // Public API
  ////////////////////////////////////////////////////////////////////////

  var Fn = function( options ){
    'use strict';

    Section.call( this, options );

    return this;
  };

  Fn.prototype = Object.create( Section.prototype );

  Fn.prototype.constructor = Fn;

  // add methods for specific fields here
  Fn.prototype.fieldMethods = {};

  exports = module.exports = Fn;
});