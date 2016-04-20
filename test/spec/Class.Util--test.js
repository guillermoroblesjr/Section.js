// /* global describe, it */

// (function () {

//   'use strict';
  
//   describe("Creating classes with Class.js", function() {

//     describe('creating a class with make()', function(){

//       it('should return a function', function(){
//         var SomeClass = Class.make(function SomeClass(){
//         });
//         expect(SomeClass).to.be.a('function');
//       });
//     });

//     describe('creating an instance of your new class', function(){
      
//       describe('-- creating an instance with the "new" operator', function(){
//         it('should be an instance of the class made', function(){
//           var SomeClass = Class.make(function SomeClass(){
//           });
//           var classInstance = new SomeClass();
//           expect(classInstance).to.be.instanceof(SomeClass);
//         });
//       });

//       describe('-- creating an instance with Object.create()', function(){
//         it('should be an instance of the class made', function(){
//           var SomeClass = Class.make(function SomeClass(){
//           });
//           var classInstance = Object.create(SomeClass.prototype);
//           expect(classInstance).to.be.instanceof(SomeClass);
//         });
//       });

//       describe('-- instantiating with "new"', function(){

//         it('should inherit all properties from it\'s constructor', function(){
//           var SomeClass = Class.make(function SomeClass(){
//             this.property1 = true;
//             return this;
//           });
//           var someInstance = new SomeClass();
//           expect(someInstance).to.have.property('property1');
//           expect(someInstance.property1).to.not.be.a('function');
//         });

//         it('should inherit all methods from it\'s constructor', function(){
//           var SomeClass = Class.make(function SomeClass(){
//             this.method1 = function(){};
//             return this;
//           });
//           var someInstance = new SomeClass();
//           expect(someInstance).to.have.property('method1');
//           expect(someInstance.method1).to.be.a('function');
//         });

//         it('inherits properties via prototype', function(){
//           var SomeClass = Class.make(function SomeClass(){
//             this.property1 = true;
//             return this;
//           });
//           var someInstance = new SomeClass();
//           expect(someInstance).to.have.property('property1');
//           expect(someInstance).to.not.have.ownProperty('property1');
//         });

//         it('inherits methods via prototype', function(){
//           var SomeClass = Class.make(function SomeClass(){
//             this.method1 = function(){};
//             return this;
//           });
//           var someInstance = new SomeClass();
//           expect(someInstance).to.have.property('method1');
//           expect(someInstance).to.not.have.ownProperty('method1');
//         });
//       });
//     });

//   });

//   describe('Class.js inherited utility functions', function(){
    
//     describe('getAllKeys()', function(){

//       it('should return an array', function(){
//         var SomeClass = Class.make(function SomeClass(){
//           return this;
//         });
//         var classInstance = new SomeClass();
//         var properties = classInstance.getAllKeys();
//         expect(properties).to.be.a('array');
//       });

//       it("should contain it's own inherited properties/methods set in the constructor", function(){
//         var SomeClass = Class.make(function SomeClass(){
//           this.property1 = 1;
//           this.method1 = function(){
//             return 'I am added to the prototype!';
//           };
//           return this;
//         });
//         var classInstance = new SomeClass();
//         // get all the keys using the function.
//         // returns an array
//         var properties = classInstance.getAllKeys();
//         // put the keys into an object
//         var propObj = {};
//         for (var i = 0, len = properties.length; i < len; i++) {
//           (function(i){
//             var key = properties[i];
//             propObj[key] = true;
//           })(i);
//         };
//         expect(propObj).to.contain.all.keys(['property1', 'method1']);
//       });

//       it("should contain all inherited properties", function(){
//         var SomeClass = Class.make(function SomeClass(){
//           this.property1 = 1;
//           this.method1 = function(){
//             return 'I am added to the prototype!';
//           };
//           return this;
//         });
//         var classInstance = new SomeClass();
//         var allKeys = classInstance.getAllKeys();
//         var properties = [];

//         // store all the keys
//         for (var i = 0, len = allKeys.length; i < len; i++) {
//           (function(i,classInstance,properties){
//             var key = allKeys[i];
//             var keyType = typeof classInstance[key];
//             if (keyType !== 'function') {
//               properties.push(key);
//             };
//           })(i,classInstance,properties);
//         };

//         // put the keys into an object (the only way to test it)
//         var propObj = {};
//         for (var i = 0, len = properties.length; i < len; i++) {
//           (function(i){
//             var key = properties[i];
//             propObj[key] = classInstance[key];
//           })(i);
//         };

//         expect(propObj).to.contain.all.keys(properties);

//         // only works for methods
//         for (var i = 0, len = properties.length; i < len; i++) {
//           (function(i, classInstance, properties){
//             //expect(classInstance).to.respondTo(properties[i]);
//           })(i, classInstance, properties);
//         };
//       });

//       it("should contain all inherited methods", function(){
//         var SomeClass = Class.make(function SomeClass(){
//           this.property1 = 1;
//           this.method1 = function(){
//             return 'I am added to the prototype!';
//           };
//           return this;
//         });
//         var classInstance = new SomeClass();
//         var allKeys = classInstance.getAllKeys();
//         var methods = [];

//         // store all the keys
//         for (var i = 0, len = allKeys.length; i < len; i++) {
//           (function(i,classInstance,methods){
//             var key = allKeys[i];
//             var keyType = typeof classInstance[key];
//             if (keyType === 'function') {
//               methods.push(key);
//             };
//           })(i,classInstance,methods);
//         };

//         // only works for methods
//         for (var i = 0, len = methods.length; i < len; i++) {
//           (function(i, classInstance, methods){
//             // Asserts that the object or class target will respond to a method.
//             expect(classInstance).to.respondTo(methods[i]);
//           })(i, classInstance, methods);
//         };
//       });

//     });
//   });

//   describe('Inheriting multiple levels', function(){

//     describe('3 levels deep', function(){

//       it('should inherit a property', function(){
//         var SomeClass1 = Class.make(function SomeClass1(){
//           this.propertyFrom_SomeClass1 = true;
//           return this;
//         });
//         var classInstance1 = new SomeClass1();
        
//         var SomeClass2 = Class.make(function SomeClass2(){
//           return this;
//         }, SomeClass1);
//         var classInstance2 = new SomeClass2();

//         var SomeClass3 = Class.make(function SomeClass3(){
//           return this;
//         }, SomeClass2);
//         var classInstance3 = new SomeClass3();

//         expect(classInstance3).to.have.property('propertyFrom_SomeClass1');
//       });
    
//     });

//   });

//     ///////////////////////////////////////////////////////////

//     // describe('', function(){

//     //   it('', function(){
//     //     var SomeClass = Class.make(function SomeClass(){
//     //       return this;
//     //     });
//     //     var classInstance = new SomeClass();
        
//     //     expect(properties).to.be.a('array');
//     //   });

//     // });

//     // it('x', function(){
//     //   expect({ a: 'b', c: 'd' }).to.have.keys('a', 'c');
//     // });

//     // it('y', function(){
//     //   expect({ a: 'b', c: 'd' }).to.contain.any.keys(['a', 'c']);
//     // });
//     // it('z', function(){
//     //   expect({ a: 'b', c: 'd' }).to.contain.all.key(['a']);
//     // });
//     // 
//         // // Asserts that the object or class target will respond to a method.
//         // expect(SomeClass).to.respondTo('make');
//         // expect(classInstance).itself.to.respondTo('method1');

//         // expect(classInstance).to.have.all.keys(properties);

//         //expect(classInstance).to.contain.any.keys(properties);
//         //
//     // expect(foo).to.be.an.instanceof(Foo);
//     // expect('test').to.have.ownProperty('length');

// })();
