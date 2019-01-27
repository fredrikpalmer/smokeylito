const Nightwatch = require('nightwatch');
const settings = require('./nightwatch.conf');

Nightwatch.runTests('./tests', settings).then(function() {
    // Tests finished
  }).catch(function(error: any) {
    // An error occurred
  });