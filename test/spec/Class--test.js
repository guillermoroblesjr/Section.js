/* global describe, it */
// jshint ignore: start

(function () {

  'use strict';
  
  describe("Creating classes with Class.js", function() {

    describe('creating a class with make()', function(){

      it('should return a function', function(){
        var SomeClass = Class.make(function SomeClass(){
        });
        expect(SomeClass).to.be.a('function');
      });
    });

    describe('creating an instance of your new class', function(){
      
      describe('-- creating an instance with the "new" operator', function(){
        it('should be an instance of the class made', function(){
          var SomeClass = Class.make(function SomeClass(){
          });
          var classInstance = new SomeClass();
          expect(classInstance).to.be.instanceof(SomeClass);
        });
      });

      describe('-- creating an instance with Object.create()', function(){
        it('should be an instance of the class made', function(){
          var SomeClass = Class.make(function SomeClass(){
          });
          var classInstance = Object.create(SomeClass.prototype);
          expect(classInstance).to.be.instanceof(SomeClass);
        });
      });

      describe('-- instantiating with "new"', function(){

        it('should inherit all properties from it\'s constructor', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.property1 = true;
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance.property1).to.not.be.a('function');
        });

        it('should inherit all methods from it\'s constructor', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.method1 = function(){};
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance.method1).to.be.a('function');
        });

        it('inherits properties which is not it\'s own', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.property1 = true;
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('inherits methods which is not it\'s own', function(){
          var SomeClass = Class.make(function SomeClass(){
            this.method1 = function(){};
            return this;
          });
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });

        it('can inherit properties via prototype', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          SomeClass.prototype.property1 = true;
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('can inherit methods via prototype', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          SomeClass.prototype.method1 = function(){};
          var someInstance = new SomeClass();
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });

        it('can inherit properties via prototype after instantiated', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          var someInstance = new SomeClass();
          SomeClass.prototype.property1 = true;
          expect(someInstance).to.have.property('property1');
          expect(someInstance).to.not.have.ownProperty('property1');
        });

        it('can inherit methods via prototype after instantiated', function(){
          var SomeClass = Class.make(function SomeClass(){
            return this;
          });
          var someInstance = new SomeClass();
          SomeClass.prototype.method1 = function(){};
          expect(someInstance).to.have.property('method1');
          expect(someInstance).to.not.have.ownProperty('method1');
        });
      });
    });

  });

  describe('Inheriting multiple levels', function(){

    describe('3 levels deep', function(){

      it('should inherit a property', function(){
        var SomeClass1 = Class.make(function SomeClass1(){
          this.propertyFrom_SomeClass1 = true;
          // console.log('running SomeClass function', this);
          return this;
        });
        
        var classInstance1 = new SomeClass1();
        
        var SomeClass2 = Class.make(function SomeClass2(){
          // console.log('running SomeClass2 function', this);
          return this;
        }, SomeClass1);

        var classInstance2 = new SomeClass2();

        var SomeClass3 = Class.make(function SomeClass3(){
          // console.log('running SomeClass3 function', this);
          return this;
        }, SomeClass2);

        var classInstance3 = new SomeClass3();

        var SomeClass4 = Class.make(function SomeClass4(){
          this.property_1_From_SomeClass4 = true;
          // console.log('running SomeClass4 function', this);
          return this;
        }), SomeClass3;

        expect(classInstance3).to.have.property('propertyFrom_SomeClass1');
      });
    
    });

    describe('4 levels deep', function(){

      it('should inherit all properties and methods', function(){

        var animalFunctionToBeInherited = function(){
          console.log('I am added to the AnimalClass prototype!');
        };

        var AnimalClass = Class.make(function AnimalClass(){
          this.animalThing = 4;
          this.numberOfEyes = 2;
          this.animalFunctionToBeInherited = animalFunctionToBeInherited;
          return this;
        });
        
        var DogClass = Class.make(function DogClass(){
          return this;
        }, AnimalClass);

        var AwesomeDoggieClass = Class.make(function AwesomeDoggieClass(){
          this.awesomeDoggieThing = 2000;
          return this;
        }, DogClass);

        var SuperDoggieClass = Class.make(function SuperDoggieClass(){
          this.superDoggieThing = 9500;
          return this;
        }, AwesomeDoggieClass);

        var superDoggie = new SuperDoggieClass();

        DogClass.prototype.doggieThing = 503;

        var expectedProperties = [
          'animalThing',
          'numberOfEyes',
          'animalFunctionToBeInherited',
          'doggieThing',
          'awesomeDoggieThing',
          'superDoggieThing'
        ];

        var expectedPropertiesValues = {
          'animalThing': 4,
          'numberOfEyes': 2,
          'animalFunctionToBeInherited': animalFunctionToBeInherited,
          'doggieThing': 503,
          'awesomeDoggieThing': 2000,
          'superDoggieThing': 9500
        };

        for (var i = 0, len = expectedProperties.length; i < len; i++) {
          (function(i){
            expect(superDoggie).to.have.property( expectedProperties[i] );
            expect(superDoggie[ expectedProperties[i] ])
              .to.equal( expectedPropertiesValues[ expectedProperties[i] ] );
          })(i);
        };

        // console.log('superDoggie instance:', superDoggie);
      });
    
    });

  });

    ///////////////////////////////////////////////////////////

    // describe('', function(){

    //   it('', function(){
    //     var SomeClass = Class.make(function SomeClass(){
    //       return this;
    //     });
    //     var classInstance = new SomeClass();
        
    //     expect(properties).to.be.a('array');
    //   });

    // });

    // it('x', function(){
    //   expect({ a: 'b', c: 'd' }).to.have.keys('a', 'c');
    // });

    // it('y', function(){
    //   expect({ a: 'b', c: 'd' }).to.contain.any.keys(['a', 'c']);
    // });
    // it('z', function(){
    //   expect({ a: 'b', c: 'd' }).to.contain.all.key(['a']);
    // });
    // 
        // // Asserts that the object or class target will respond to a method.
        // expect(SomeClass).to.respondTo('make');
        // expect(classInstance).itself.to.respondTo('method1');

        // expect(classInstance).to.have.all.keys(properties);

        //expect(classInstance).to.contain.any.keys(properties);
        //
    // expect(foo).to.be.an.instanceof(Foo);
    // expect('test').to.have.ownProperty('length');

})();
