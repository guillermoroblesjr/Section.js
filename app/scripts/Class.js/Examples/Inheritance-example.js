/**
 * JavaScript Inheritance Example
 *
 * NOTE: I've tied everything to the window so you can easily play
 * around using the developer tools and the console.
 *
 * New objects will be instantiated using Object.create() instead of 'new Fn()'.
 * A polyfill is included if the browser does not support Object.create().
 */
// jshint ignore: start
// Object.create() Pollyfills (these run automatically if needed)
// Ref. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
(function(window, undefined){

  'use strict';
  
  // Sexy polyfill
  if (typeof Object.create !== 'function') {
    Object.create = (function() {
      var Class = function() {};
      
      return function (prototype) {
        if (arguments.length > 1) {
          throw Error('Second argument not supported');
        }
        if (typeof prototype != 'object') {
          throw TypeError('Argument must be an object');
        }
        Class.prototype = prototype;
        var result = new Class();
        Class.prototype = null;
        return result;
      };

    })();
  }

  // Simple polyfill
  // var createObject = function(proto) {
  //     var Class = function Class(){};
  //     Class.prototype = proto;
  //     return new Class();
  // };
})(window);

// Classes
(function(window, undefined){
  
  'use strict';

  // ---- [ ANIMAL CLASS ] ----

  // -- [ 1. Declaring our Animal object ] --
  // I'm using 'Named Function Expressions' on Classes, which is using BOTH
  // 'Function Expressions' and 'Function Declarations'. I admit, it looks funny, 
  // but it will be a lot easier to debug. Use one or the other, your preference.
  // This is where the 'Animal' variable is assigned the 'Animal' function. 
  // Ref. https://javascriptweblog.wordpress.com/2010/07/06/function-declarations-vs-function-expressions/
  // Ref. http://kangax.github.io/nfe/
  window.Animal = function Animal(){
    // Typically, properties are included in your constructor function
    // using 'this', and your methods are tacked on via 'prototype'.
    // If think it's easier to debug if you always use 'prototype' when printing
    // off the object in the console. In Chrome, the inherited properties will
    // be grouped nicely under it's '__proto__: window.Animal'. If you want your instantiated
    // object to have all it's inherited properties listed directly underneath it when
    // printing to the console you can extend the object using something like jQuery.extend(),
    // or jQuery.each() 
    // e.g. 
    // $.extend(Dog.prototype, Animal.prototype);
    // jQuery.each(obj, function(key, value) { });

    // this.name = 'Animal name';
    
    // -- [ 2. Allows Animal to inherit from Object ] --
    Object.call(this); // not needed here, but sticks with the pattern
    return this;
  };

  // *** Everything between here is not needed, but it sticks with the pattern
      //-- [ 3. Animal extends Object ] --
      Animal.prototype = Object.create( Object.prototype ); 

      // -- [ 4. Override parent constructor ] --
      // Override the Object constructor, changing it back to Animal
      Animal.prototype.constructor = Animal;
  // *************************************************************************

  // -- [ 5. Add properties and methods to the prototype ] --
  Animal.prototype.name = 'Animal name';
  
    // ---- [ DOG CLASS ] ----
    // === Dog extends Animal ===

    // -- [ 1. Declaring our Dog object ] --
    window.Dog = function Dog() {
      // -- [ 2. Allows Dog to inherit from Animal ] --
      Animal.call(this);
      return this;
    };

    //-- [ 3. Dog extends Animal ] --
    Dog.prototype = Object.create( Animal.prototype );

    // -- [ 4. Override parent constructor ] --
    // Override the Dog constructor, changing it back to Dog
    Dog.prototype.constructor = Dog;

    // -- [ 5. Add properties and methods to the prototype ] --
    Dog.prototype.bark = function(){
      return console.log('Woof!');
    };
})(window);

// Using the classes
(function(window, undefined){
  
  'use strict';

  // Example creating a dog
  console.info('Example creating a dog');
  
  var dog0 = window.dog0 = Object.create(Dog.prototype);
  // if you wanted to, you could also just use the 'new' keyword here,
  // e.g. var dog0 = window.dog0 = new Dog();
  // I suggest using the Object.create() for consistency
  console.log('dog0 is: ', dog0);

  // Example inheriting modifications
  console.info('Example inheriting modifications');
  
  var dog1 = window.dog1 = Object.create(Dog.prototype);
  console.log('dog1 is: ', dog1);
  window.Animal.prototype.hasTail = function(){
    return true;
  };
  var tailCheck = dog1.hasTail();
  console.log('dog1 is: ', dog1);
  console.log('dog1 has a tail: ', tailCheck);

  // Example overriding properties
  console.info('Example overriding properties');
  
  var dog2 = window.dog2 = Object.create(Dog.prototype);
  console.log('dog2 is: ', dog2);
  console.log('dog2 name: ', dog2.name);
  dog2.name = 'Pepper';
  console.log('dog2 is: ', dog2);
  console.log('dog2 name: ', dog2.name);
})(window);