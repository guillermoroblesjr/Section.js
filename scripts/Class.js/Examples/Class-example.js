// Example Usage
// jshint ignore: start
(function(window, undefined){
  
  'use strict';
  
  var example1 = function(){
    // Create a class
    var AnimalClass = window.AnimalClass = Class.make(function AnimalClass(){
      this.animalThing = 2;
      this.animalFunctionToBeInherited = function(){
        console.log('I am added to the prototype!');
      };
      return this;
    });
    
    // Manually adding things to the AnimalClass prototype
    AnimalClass.prototype.numberOfEyes = 2;

    // Create a class
    var DogClass = window.DogClass = Class.make(function DogClass(){
      this.dogThing = 4;
      return this;
    }, AnimalClass);

    // Create the instances
    var dog1 = new DogClass();
    var dog2 = Object.create(DogClass.prototype);
    //console.log(new AnimalClass(), Object.create(AnimalClass.prototype));
    console.log(dog1, dog2);

    // Add things to the instance
    dog1.addedDogThing = true;
    dog1.animalThing = -5;

    dog2.addedDogThing = 'stuff goes here';
    dog2.animalThing = -69;

    console.log(dog1, dog2);
    console.log(new DogClass(), Object.create(DogClass.prototype));
    // console.log(dog.animalNonProtoFunction());
    // AnimalClass.prototype.isPrototypeOf(dog);
    // Object.getPrototypeOf(dog)
    // Object.keys(dog)
  };

  var example2 = function(){
    // Create a class
    var AnimalClass = window.AnimalClass = Class.make(function AnimalClass(){
      this.animalThing = 2;
      this.animalFunctionToBeInherited = function(){
        console.log('I am added to the prototype!');
      };
      return this;
    });
    
    // Manually adding things to the AnimalClass prototype
    AnimalClass.prototype.numberOfEyes = 2;

    var animal = new AnimalClass();
    
    var DogClass = animal.make(function DogClass(){
      this.doggieThing = 503;
      return this;
    }, AnimalClass);

    // var doggie = new DogClass();
    var doggie = Object.create(DogClass.prototype);

    var AwesomeDoggieClass = doggie.make(function AwesomeDoggieClass(){
      this.awesomeDoggieThing = 2000;
      return this;
    }, DogClass);

    // var awesomeDoggie = new AwesomeDoggieClass();
    var awesomeDoggie = Object.create(AwesomeDoggieClass.prototype);

    var SuperDoggieClass = awesomeDoggie.make(function SuperDoggieClass(){
      this.superDoggieThing = 9500;
      return this;
    }, AwesomeDoggieClass);

    // var superDoggie = new SuperDoggieClass();
    var superDoggie = window.superDoggie = Object.create(SuperDoggieClass.prototype);

    console.log(doggie, awesomeDoggie, superDoggie);

    // // Create a class
    // var DogClass = window.DogClass = Class.make(function DogClass(){
    //   this.dogThing = 4;
    //   return this;
    // }, AnimalClass);

    // // Create the instances
    // var dog1 = new DogClass();
    // var dog2 = Object.create(DogClass.prototype);
    // //console.log(new AnimalClass(), Object.create(AnimalClass.prototype));
    // console.log(dog1, dog2);

    // // Add things to the instance
    // dog1.addedDogThing = true;
    // dog1.animalThing = -5;

    // dog2.addedDogThing = 'stuff goes here';
    // dog2.animalThing = -69;

    // console.log(dog1, dog2);
    // console.log(new DogClass(), Object.create(DogClass.prototype));
    // console.log(dog.animalNonProtoFunction());
    // AnimalClass.prototype.isPrototypeOf(dog);
    // Object.getPrototypeOf(dog)
    // Object.keys(dog)
  };

  example2();

})(window);



