// // jshint ignore: start
// (function(window, undefined){

//   'use strict';

//   // Object.create() Pollyfills (these run automatically if needed)
//   // Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
//   (function(window, undefined){

//     'use strict';
    
//     // Sexy polyfill
//     if (typeof Object.create !== 'function') {
//       Object.create = (function() {
//         var Class = function() {};
        
//         return function (prototype) {
//           if (arguments.length > 1) {
//             throw Error('Second argument not supported');
//           }
//           if (typeof prototype != 'object') {
//             throw TypeError('Argument must be an object');
//           }
//           Class.prototype = prototype;
//           var result = new Class();
//           Class.prototype = null;
//           return result;
//         };

//       })();
//     }

//     // Simple polyfill
//     // var createObject = function(proto) {
//     //     var Class = function Class(){};
//     //     Class.prototype = proto;
//     //     return new Class();
//     // };
//   })(window);

//   var Class = function Class(){
//     Object.call(this);
//     return this;
//   };
//   Class.prototype = Object.create(Object.prototype);
//   Class.prototype.constructor = Class;
//   Class.prototype.make = function make(fn, parent){
//     parent = parent || Object;
//     var insFn = new fn();
//     // everything will come from Class.prototype
//     if (parent.name === 'Object') {
//       var newParent = (function(Class, fn){

//         var ClassY = new Class();
//         var ClassX = ClassY.make(fn, Class);
//         parent = ClassX;

//         var child = function(){
//           parent.call(this);
//           return this;
//         };
//         child.prototype = Object.create(Object.prototype);
//         child.prototype.constructor = child;

//         return child;
//       })(Class, fn);
       
//       newParent.prototype = Object.create(Class.prototype);
//       newParent.prototype.constructor = fn;

//       for (var x in insFn) {
//           newParent.prototype[x] = insFn[x];
//       }

//       return newParent;
//     };


//     // since the user isn't using <parent-fn>.call(this);
//     // to inherit the parent properties we'll have to add
//     // them to the prototype manually
//     var child = function(){
//       parent.call(this);
//       return this;
//     };
//     child.prototype = Object.create(parent.prototype);
//     child.prototype.constructor = fn;
    
//     for (var x in insFn) {
//         child.prototype[x] = insFn[x];
//     }
//     // Add the current properties
//     // var keys = Object.keys(insFn);
//     // var currentKey;
//     // for (var i = 0, len = keys.length; i < len; i++) {
//     //   currentKey = keys[i];
//     //   child[currentKey] = insFn[currentKey];
//     //   console.log('currentKey: ', currentKey);
//     // };
//     // fn.prototype = Object.create(parent.prototype);
//     // fn.prototype.constructor = fn;
    

//     return child;
//   };
//   // Useful methods
//   Class.prototype.getAllKeys = function getAllKeys(){
//     var keys = [];
//     for (var key in this) {
//         keys.push(key);
//     }
//     return keys;
//   };
//   Class.prototype.getAllProperties = function getAllProperties(){
//     var properties = {};
//     var keys = this.getAllKeys();
//     for (var i = 0, len = keys.length; i < len; i++) {
//       var key = keys[i];
//       var keyType = typeof this[key];
//       if (keyType !== 'function') {
//         properties[key] = this[key];
//       };
//     };;
//     return properties;
//   };
//   Class.prototype.getAllMethods = function getAllMethods(){
//     var properties = {};
//     var keys = this.getAllKeys();
//     for (var i = 0, len = keys.length; i < len; i++) {
//       var key = keys[i];
//       var keyType = typeof this[key];
//       if (keyType === 'function') {
//         properties[key] = this[key];
//       };
//     };;
//     return properties;
//   };
//   Class.prototype.temp = function temp(){
//     return 'I am a temp function.';
//   };
//   // Class.prototype.getPropertiesFrom = function getPropertiesFrom(class, instance){
//   //   var properties = this.getAllProperties();
//   //   for (var key in properties) {
//   //     if (class.prototype.isPrototypeOf(instance)) {
        
//   //     };
//   //   }

//   //   //AnimalClass.prototype.isPrototypeOf(dog);
//   // };
//   // Attach to the window
//   window.Class = Object.create(Class.prototype);
// })(window);