(function (root, factory) {
  if(typeof define === "function" && define.amd) {
    // Now we're wrapping the factory and assigning the return
    // value to the AMD loader.
    // You can assign it to root (window) as well but it will
    // pollute the global scope.
    define(["Section"], function(Section){
      // return (root.Section = factory(Section));
      return factory(Section);
    });
  } else if(typeof module === "object" && module.exports) {
    // I've not encountered a need for this yet, since I haven't
    // run into a scenario where plain modules depend on CommonJS
    // *and* I happen to be loading in a CJS browser environment
    // but I'm including it for the sake of being thorough
    module.exports = (root.Section = factory(require("Section")));
  } else {
    root.Section = factory(root.Section);
  }
}(this, function(Section) {

  'use strict';

  ////////////////////////////////////////////////////////////////////////
  // Private API
  ////////////////////////////////////////////////////////////////////////

  var _Private = function(){
    'use strict';

    this.VERSION = '0.0.6-alpha';
    this.cache = {};

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

    options = options || {};
    this.elements = {
      section: options.section || null
    };
    this.events = options.events || [];
    this.subscriptions = options.subscriptions || [];
    this.inits = options.inits || [];
    this.data = options.data || {};
  };

  Fn.prototype = Object.create( Object.prototype );

  Fn.prototype.constructor = Fn;

  Fn.prototype.init = function(){
    'use strict';

    // loops though all the events and applies events on the section specified
    for (var i = 0, len = this.events.length; i < len; i++) {
      (function(i, instance){
        if (instance.elements.section === null) { return; }
        var item = instance.events[i];
        var data = {
          instance: instance,
          item: item
        };
        instance.elements.section.on( item.events, item.selector, data, item.fn );
      })(i, this);
    }

    // Create the subscriptions for each of the subscriptions passed
    // in through the options object
    for (var i = 0, len = this.subscriptions.length; i < len; i++) {
      (function(i, instance){
        var item = instance.subscriptions[i];
        var data = {
          instance: instance,
          item: item
        };
        Fn.subscribe( item.topic, instance, item.fn );
      })(i, this);
    }

    // loops through all inits and runs them
    for (var i = 0, len = this.inits.length; i < len; i++) {
      (function(i, instance){
        var item = instance.inits[i];
        item.fn.apply( instance, item.args );
      })(i, this);
    }
  };

  Fn.publish = Fn.prototype.publish = function(/* String */topic, /* Array? */data){
    'use strict';
    try{
      for (var prop in _private.cache[topic]) {
        _private.cache[topic][prop](data);
      }
    } catch (err) {
      // handle this error
      console.log(err);
    }
  };

  Fn.subscribe = Fn.prototype.subscribe = function(/* String */topic, /* Object */bindee, /* Function */callback){
    'use strict';
    if(!_private.cache[topic]){
      _private.cache[topic] = [];
    }
    var boundedCb = callback.bind(bindee);
    _private.cache[topic].push(boundedCb);
    return [topic, boundedCb]; // Array
  };

  Fn.unsubscribe = Fn.prototype.unsubscribe = function(/* Array */handle){
    'use strict';
    var t = handle[0];
    _private.cache[t] && _private.cache[t].forEach(function(item, idx, collection){
      if(item === handle[1]){
        _private.cache[t].splice(idx, 1);
      }
    });
  };

  Fn.getSubscriptions = Fn.prototype.getSubscriptions = function(){
    'use strict';
    return _private.cache;
  };

  Fn.version = Fn.prototype.version = function(){
    'use strict';
    return _private.VERSION;
  };

  // Section = Fn;

  return Fn;
}));