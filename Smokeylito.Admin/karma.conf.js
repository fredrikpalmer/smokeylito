var webpack = require('webpack');
var webpackConfig = require('./webpack.config');

module.exports = function(config) {
  config.set({

    files: [
      // all files ending in "test"
      { pattern: 'test/karma-bundle.js', watched: false }
      // each file acts as entry point for the webpack configuration
    ],

    // frameworks to use
    frameworks: ['mocha'],

    preprocessors: {
      // only specify one entry point
      // and require all tests in there
      'test/karma-bundle.js': [ 'webpack' ]
    },

    reporters: ['spec'],

    webpack: { 
      ...webpackConfig(process.env, { mode: 'development' }), 
      optimization: undefined
    },
      
     // Webpack please don't spam the console when running in karma!
     webpackServer: { noInfo: true },

    logLevel: config.LOG_INFO,

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter')
    ],

    browsers: ['Chrome'],

    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox']
      }
    },
  });
};