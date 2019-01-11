
// disable stacktrace limit so we do not loose any error information
Error.stackTraceLimit = Infinity;

// load and run tests:
const testModuleContexts = loadTestModules();
runTests(testModuleContexts);

function loadTestModules() {
  const srcContext = require.context(
    // directory:
    '../client',
    // recursive:
    true,
    /\.test\.[t]s$/im
  );

  return [srcContext];
}


console.info(JSON.stringify(testModuleContexts));

function runTests(contexts) {
  contexts.forEach(requireAllInContext);
}

function requireAllInContext(requireContext) {
  return requireContext.keys().map(requireContext);
}
