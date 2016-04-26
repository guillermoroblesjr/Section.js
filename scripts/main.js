/*
 * Every screen (complete *.html files) will use this file. This file pulls in the
 * required apps for a screen.
*/

require(["require-config"], function () {
  // index.html
  if ( true ) {
    require(['scripts/index-app'], function () {
      console.log("index-app started");
    });
  }
});