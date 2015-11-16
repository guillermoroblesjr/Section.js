define(function(require, exports, module){

  'use strict';

  var _ = require('lodash');
  var amplify = require('amplify');

  ////////////////////////////////////////////////////////////////////////
  // Private API
  ////////////////////////////////////////////////////////////////////////

  var _Private = function(){
    'use strict';

    this.subscriptions = {};
    this.subscriptionStrings = {};
    this.events = {};
    this.eventsStrings = {};
    this.throwErrors = false;

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
    this.onChangeHandlers = options.onChangeHandlers || null;
    this.events = options.events || null;
    this.subscriptions = options.subscriptions || {};
    this.subscriptionData = {};
    this.inits = options.inits || {};
    this.data = options.data || {};
  };

  Fn.prototype = Object.create( Object.prototype );

  Fn.prototype.constructor = Fn;

  Fn.prototype.init = function(){
    'use strict';

    // make sure no one uses the same event functions more than once!
    // _private.events = this.events;

    // loops though all the events and applies events on the section specified
    _.each( this.events, function ( item, count, collection ){

      var self = this;
      var data = {
        instance: self,
        item: item
      };

      var fnString = item.fn.toString();

      // make sure no one uses the same event functions more than once!     
      var eventFunctionResult = _.find( _private.events, { fn: item.fn } );
      var eventFunctionStringResult = _.find( _private.eventsStrings, { fn: fnString } );

      if ( _private.throwErrors === true && _.isUndefined( eventFunctionResult ) === false || _.isUndefined( eventFunctionStringResult ) === false ) {
        var err = new Error();
        console.error( 
          'Event object: ', eventFunctionResult,
          '\n',
          'Function definition: ', item.fn,
          '\n',
          new Error(
            'You may not use the same event function more than once!'
            + '\n'
            + 'Follow the stack below, '
            + 'look for the line after "Fn.init".'
            + '\n'
            + err.stack
          )
        );
        // throw new Error();
      }

      // save the event functions so we can make sure the same functions
      // are not being used more than once!
      var eventObj = {};
      eventObj[count] = item;
      _.merge( _private.events, eventObj );

      // save the string version of the function
      _.merge( _private.eventsStrings, eventObj );
      var eventFunctionResult2 = _.find( _private.eventsStrings, { fn: item.fn } );
      eventFunctionResult2.fn = fnString;

      this.elements.section.on( item.events, item.selector, data, item.fn );
    }, this);

    
    // console.log('_private: ', _private);
    

    // Create the amplify subscriptions for each of the subscriptions passed
    // in through the options object
    _.each( this.subscriptions, function( item, count, collection ){

      var fnString = item.fn.toString();

      // make sure no one sets the same subscription function more than once!
      var subscriptionFunctionResult = _.find( _private.subscriptions, subObj );
      var subFunctionStringResult = _.find( _private.subscriptionsStrings, { fn: fnString } );

      if ( _private.throwErrors === true && _.isUndefined( subscriptionFunctionResult ) === false ) {

        var err = new Error();
        console.error( 
          'subscription: ', subscriptionFunctionResult[subscriptionFunctionResult.length - 1],
          '\n',
          new Error(
            'You may not add the same subscription more than once!'
            + '\n'
            + err.stack
          )
        );
        // throw new Error();
      }

      // save the subscription functions so we can make sure the same functions
      // are not being used more than once!
      var subObj = {};
      subObj[count] = item;
      _.merge( _private.subscriptions, subObj );

      // save the string version of the function
      _.merge( _private.subscriptionStrings, subObj );
      var subscriptionFunctionResult2 = _.find( _private.subscriptionStrings, { fn: item.fn } );
      subscriptionFunctionResult2.fn = fnString;

      amplify.subscribe( item.topic, this, item.fn );
    }, this);

    // loops through all inits and runs them
    _.each( this.inits, function( item, count, collection ){
      item.fn.apply( this, item.args );
    }, this);
  };

  return Fn;
});