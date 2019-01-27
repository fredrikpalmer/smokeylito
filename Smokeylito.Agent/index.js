const Nightwatch = require('nightwatch');

// read the CLI arguments
Nightwatch.cli(function(argv) {
    argv._source = argv['_'].slice(0);

    // create the Nightwatch CLI runner
    const runner = Nightwatch.CliRunner(argv);

    // setup and run tests
    runner
        .setup()
        .startWebDriver()
        .then(_ => runner.runTests())
        .then(_ => runner.stopWebDriver())
        .catch(err => console.error(err));
});