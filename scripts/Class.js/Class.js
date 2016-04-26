/**
 *  TODO
 *
 *  The production version should include 100% test code coverage.
 *  Decide to include polyfill in tests.
 */

(function(options, scope, undefined){

  'use strict';

  var Class = function Class(){
    Object.call(this);
    return this;
  };
  Class.prototype = Object.create(Object.prototype);
  Class.prototype.constructor = Class;
  Class.prototype.createChild = function createChild(parent){
    var Child = function(){
      parent.call(this);
      return this;
    };
    return Child;
  };
  Class.prototype.addParentKeysToChildPrototype = function addParentKeysToChildPrototype(Fn, child){
    var insFn = new Fn();
    for (var x in insFn) {
        child.prototype[x] = insFn[x];
    }
  };
  Class.prototype.inheritFromParent = function inheritFromParent(child, childConstructor, parent){
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = childConstructor;
  };
  Class.prototype.buildChild = function buildChild(fn, parent){
    // since the user isn't using <parent-fn>.call(this);
    // to inherit the parent properties we'll have to add
    // them to the prototype manually
    var child = this.createChild(parent);

    // inherit from parent prototype
    this.inheritFromParent(child, fn, parent);
    
    // add the parents keys to the child prototype
    this.addParentKeysToChildPrototype(fn, child);
    
    // return the child so it can be instantiated
    return child;
  };
  Class.prototype.make = function make(fn, parent){
    // if the parent is undefined, the parent will then be Class
    // everything will come from Class.prototype
    parent = parent || Class;

    var child = this.buildChild(fn, parent);

    return child;
  };

  // Keep from erroring out if there's no window
  if (!scope.window) {
    if (options.noGlobal === true) {
      return Object.create(Class.prototype);
    }
    else {
      scope.Class = Object.create(Class.prototype);
    }
  } else {
    // Attach to the window
    window.Class = Object.create(Class.prototype);  
  }
})(this.options || {}, this || window);