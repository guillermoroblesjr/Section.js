/* global describe, it */
// jshint ignore: start

(function () {

  'use strict';
  
  describe("Section.js", function() {

    it('should be a global function', function(){
      expect(Section).to.be.a('function');
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
    });

    describe('doing something', function(){
      it('should x', function(){

        var feature = new Section({
          section: $('div'),
          data: {},
          events: [
            {
              events: 'click',
              selector: 'div',
              fn: function(e){
                console.log('event: ', e);
              }
            }
          ],
          subscriptions: [],
          inits: [],
        }).init();

        var awesome = feature.init();

        expect(awesome).to.be.undefined;
      });
    });

  });

})();
