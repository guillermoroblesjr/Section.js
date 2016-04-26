# Section.js

A simple way to modularize your javascript components for the Browser. Section.js expects jQuery on
the global window but you do not need to use jQuery. You can just use it to split you logic into
organizable chunks.

In your file, do something like this:

```js
var Section = require('js/components/Section');

var feature = new Section({
  section: $('body'),
  events: [
    // fire this event handler when a div is clicked
    {
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
  ],
  subscriptions: [
    // fire this function when you hear the publish to your `topic`
    {
      'topic': 'another-app-publishes-to-this',
      fn: function(data){
        // "this" is the "feature" instance
      }
    }
  ],
  inits: [
    // this runs when the feature is ran with init
    {
      fn: function(item){
        console.log(
          'this is: ', this, '\n',
          'item is: ', item
        );
      },
      args: ['stuff']
    }
  ],
});

feature.init();
```
