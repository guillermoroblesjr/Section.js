define(function(require, exports, module){

  'use strict';

  ////////////////////////////////////////////////////////////////////////
  // DEPENDENCIES
  ////////////////////////////////////////////////////////////////////////

  var WidgetSection = require('scripts/index/WidgetSection');
  var changeBackgroundColor = require('scripts/index/changeBackgroundColor');
  var spinBlocks = require('scripts/index/spinBlocks');

  ////////////////////////////////////////////////////////////////////////
  // Private API
  ////////////////////////////////////////////////////////////////////////

  var _Private = function(){
    'use strict';
    return this;
  };

  _Private.prototype = Object.create( Object.prototype );
  
  _Private.prototype.constructor = _Private;

  var _private = new _Private();

  ////////////////////////////////////////////////////////////////////////
  // Public API
  ////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////
  // Widget Section 'Change Background Color' Feature
  ////////////////////////////////////////////////////////////////////////

  // Extend the WidgetSection prototype 'fieldMethods' property.
  // The logic contained in 'changeBackgroundColor' will be available to
  // you within your 'WidgetSection' instance. This allows you to call the
  // same logic within your instance under 'events', 'subscriptions', and
  // 'inits' without duplicating code.

  // Inherited Business Rules
  WidgetSection = changeBackgroundColor({
    Fn: WidgetSection,
    extend: WidgetSection.prototype.fieldMethods
  });

  // Feature Section Instance
  var changeBackgroundColor1 = new WidgetSection({
    section: $('#widget-section'),
    data: {},

    // Business Rules
    events: [
      // when one block is clicked on change all block colors in section
      {
        events: 'click',
        selector: '[change-colors]',
        fn: function(e){
          var instance = e.data.instance;
          var data = instance.data;
          instance.fieldMethods.changeBackgroundColor.random({
            instance: instance,
            fields: { 'blocks': '.blocks[change-colors]' },
          });
        }
      }
    ],
    subscriptions: [
      // 'change all block colors'
      {
        topic: 'change-all-block-colors',
        fn: function(){
          var instance = this;
          instance.fieldMethods.changeBackgroundColor.random({
            instance: instance,
            fields: { 'blocks': '.blocks[change-colors]' },
          });
        },
      },
      // 'spin all blocks'
      {
        topic: 'spin-all-blocks',
        fn: function(){
          var instance = this;
          instance.fieldMethods.spinBlocks.random({
            instance: this,
            fields: { 'blocks': '.blocks[spin-blocks]' },
          });
        },
      }
    ],
    inits: [
      // change block colors on load
      {
        fn: function(){
          var instance = this;
          instance.fieldMethods.changeBackgroundColor.random({
            instance: this,
            fields: { 'blocks': '.blocks[random-color]' },
          });
        },
        args: []
      }
    ]
  });

  // Export Feature Section Instance
  exports.changeBackgroundColor1 = changeBackgroundColor1;

  ////////////////////////////////////////////////////////////////////////
  // Widget Section2 'Spin Blocks' Feature
  ////////////////////////////////////////////////////////////////////////

  WidgetSection = spinBlocks({
    Fn: WidgetSection,
    extend: WidgetSection.prototype.fieldMethods
  });

  var spinBlocks1 = new WidgetSection({
    section: $('#widget-section2'),
    data: {},
    events: [
      // when one block is clicked on spin all blocks in section
      {
        events: 'click',
        selector: '[spin-blocks]',
        fn: function(e){
          var instance = e.data.instance;
          var data = instance.data;
          instance.fieldMethods.spinBlocks.random({
            instance: instance,
            fields: { 'blocks': '.blocks[spin-blocks]' },
          });
        }
      }
    ],
    subscriptions: [
      // 'change all block colors'
      {
        topic: 'change-all-block-colors',
        fn: function(){
          var instance = this;
          instance.fieldMethods.changeBackgroundColor.random({
            instance: this,
            fields: { 'blocks': '.blocks[change-colors]' },
          });
        },
      },
      // 'spin all blocks'
      {
        topic: 'spin-all-blocks',
        fn: function(){
          var instance = this;
          instance.fieldMethods.spinBlocks.random({
            instance: this,
            fields: { 'blocks': '.blocks[spin-blocks]' },
          });
        },
      }
    ],
    inits: [
      // change block colors on load
      {
        fn: function(){
          var instance = this;
          this.fieldMethods.changeBackgroundColor.random({
            instance: this,
            fields: { 'blocks': '.blocks[random-color]' },
          });
        },
        args: []
      },
      // spin the blocks on load
      {
        fn: function(){
          var instance = this;
          instance.fieldMethods.spinBlocks.random({
            instance: this,
            fields: { 'blocks': '.blocks[spin-blocks]' },
          });
        },
        args: []
      }
    ]
  });

  exports.spinBlocks1 = spinBlocks1;

  ////////////////////////////////////////////////////////////////////////
  // Widget Section3 'Button Publishes' Feature
  ////////////////////////////////////////////////////////////////////////

  var buttonPublishes1 = new WidgetSection({
    section: $('#second-half'),
    data: {},
    events: [
      // publish change all block colors
      {
        events: 'click',
        selector: '[change-all-block-colors]',
        fn: function(e){
          var instance = e.data.instance;
          var data = instance.data;
          instance.publish('change-all-block-colors', {
            data: {
              instance: instance,
              data: data,
              event: e,
              el: $(this)
            }
          });
        }
      },
      // publish spin all blocks
      {
        events: 'click',
        selector: '[spin-all-blocks]',
        fn: function(e){
          var instance = e.data.instance;
          var data = instance.data;
          instance.publish('spin-all-blocks', {
            data: {
              instance: instance,
              data: data,
              event: e,
              el: $(this)
            }
          });
        }
      }
    ],
    subscriptions: [],
    inits: []
  });

  exports.buttonPublishes1 = buttonPublishes1;
});