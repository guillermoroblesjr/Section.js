# Section.js

A simple way to modularize your javascript components for the Browser. Dependencies are:
<ol>
  <li>require.js</li>
  <li>lodash.js</li>
  <li>amplify.js</li>
  <li>jquery.js</li>
</ol>

In your file, do something like this:

```js
var $ = require('jquery');
var _ = require('lodash');
var amplify = require('amplify');
var Section = require('js/components/Section');

var feature = new Section({
  section: $('body'),
  events: {
    'onClick_div': {
      events: 'click',
      selector: 'div',
      fn: function(e){
        console.log(
          '$(this) is: ', $(this), '\n',
          'e is: ', e, '\n',
          'e.data is: ', e.data
        );
        
        _.each( $(this), function(item, count, collection){
          console.log('item is: ', item);
        });
        
        amplify.publish('a-div-was-clicked!', { event: e, element: $(this), instance: e.data.instance });
      }
    }
  },
  subscriptions: {
    sub1: {
      'topic': 'another-app-publishes-to-this',
      fn: function(data){
        // "this" is the "feature" instance
      }
    }
  },
  inits: {
    'this runs when instantiated': {
      fn: function(item){
        console.log(
          'this is: ', this, '\n',
          'item is: ', item
        );
      },
      args: ['stuff']
    },
  },
});

feature.init();
```
