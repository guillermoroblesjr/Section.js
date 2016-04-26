/* global describe, it */
// jshint ignore: start

(function () {

  'use strict';
  
  describe("Section.js", function() {

    it('should be a global function in a non-AMD environment', function(){
      expect(Section).to.be.a('function');
    });

    it('should return the version', function(){
      expect(Section.version()).to.be.a('string');
    });

    describe('inherit properties', function(){
      it('should have elements as an array', function(){
        var feature = new Section();
        feature.init();
        expect(feature.elements).to.be.a.array;
      });

      it('should have inits as an array', function(){
        var feature = new Section();
        feature.init();
        expect(feature.inits).to.be.a.array;
      });

      it('should have events as an array', function(){
        var feature = new Section();
        feature.init();
        expect(feature.events).to.be.a.array;
      });

      it('should have subscriptions as an array', function(){
        var feature = new Section();
        feature.init();
        expect(feature.subscriptions).to.be.a.array;
      });

      it('should have data as an object', function(){
        var feature = new Section();
        feature.init();
        expect(feature.data).to.be.a.object;
      });
    });

    describe('passing options', function(){
      it('should add the event to the events array', function(){

        var event = {
          events: 'click',
          selector: 'div',
          fn: function(e){
            console.log('event: ', e);
          }
        };

        var feature = new Section({
          section: $('div'),
          data: {},
          events: [ event ],
          subscriptions: [],
          inits: [],
        });

        feature.init();

        expect(feature.events[0]).to.equal(event);
      });

      it('should add the subscription to the subscriptions array', function(){

        var subscription = {
          topic: 'topic1',
          fn: function( data ){}
        };
        
        var feature = new Section({
          section: $('div'),
          data: {},
          events: [],
          subscriptions: [ subscription ],
          inits: [],
        });

        feature.init();

        expect(feature.subscriptions[0]).to.equal(subscription);
      });

      it('should add the init to the inits array', function(){

        var init1 = {
          fn: function( data ){},
          args: []
        };
        
        var feature = new Section({
          section: null,
          data: {},
          events: [],
          subscriptions: [],
          inits: [ init1 ],
        });

        feature.init();

        expect(feature.inits[0]).to.equal(init1);
      });

      it('should add the data object to the data object', function(){

        var data = {
          awesome: true
        };
        
        var feature = new Section({
          section: null,
          data: {
            awesome: true
          },
          events: [],
          subscriptions: [],
          inits: [],
        });

        feature.init();

        expect(feature.data.awesome).to.equal(true);
      });
    });

    describe('calling init', function(){
      it('should loop through all inits and run them', function(){

        var count = 0;

        var init1 = {
          fn: function( data ){
            count++;
          },
          args: [count]
        };

        var init2 = {
          fn: function( data ){
            count++;
          },
          args: [count]
        };

        var init3 = {
          fn: function( data ){
            count++;
          },
          args: [count]
        };
        
        var feature = new Section({
          section: null,
          data: {},
          events: [],
          subscriptions: [],
          inits: [ init1, init2, init3 ],
        });

        feature.init();

        expect(count).to.equal(3);
      });
    });

    describe('publish/subscribe', function(){
      it('should return the subscription handle', function(){

        var topic = 'a';
        var bindee = {};
        var fn = function(){ return 'red'; };
        var subscription = Section.subscribe(topic, bindee, fn);

        expect(subscription[0]).to.equal(topic);
        expect(subscription[1]()).to.equal(fn.bind(bindee)());
      });

      it('should recieve the publish', function(){

        var topic = 'b';
        var bindee = {};
        var fn = function(data){
          expect(data).to.equal(4);
        };
        var subscription = Section.subscribe(topic, bindee, fn);
        Section.publish('b', 4);
      });

      it('should unsubscribe the subscription', function(){

        var topic = 'c';
        var bindee = {};
        var fn = function(data){
          expect(true).to.equal(false);
        };
        var subscription = Section.subscribe(topic, bindee, fn);

        Section.unsubscribe(subscription);

        Section.publish('c', 9);
      });

      it('should return the subscriptions', function(){

        var subscriptions = Section.getSubscriptions();
        expect(subscriptions).to.be.a.object;
      });
    });

  });

})();
