/**
 * "Complies" / minifies the app files using the Google closure compiler.
 */ 
var globals = require('./globals.js');
var path = require('path');
const fs = require('fs');
var colors = require('colors');
var OUTPUT_PATH = path.join(globals.BUILD_PATH, globals.COMPILED_JS_NAME);
var gcc_params = [];

/**
 * This need for this sucks, as the GC team assumes we can include the
 * source map in the header, and does not seem to have an option to add 
 * the sourceMappingURL to the file.
 * If there is one, please let me know!
 * I think adding the sourceMappingURL is better, so this will do that.
 */
function appendSourceMapReference() {
  fs.appendFileSync(OUTPUT_PATH, '//# sourceMappingURL=../' + globals.SOURCE_MAP_NAME) 
}

/**
 * Adds google extern parameters to the
 * params array.
 */
function addExterns (params) {
  var gcc_externs = globals.GCC_EXTERNS;
  gcc_externs.forEach(function(gcc_extern) {
      params.push('--externs ' +  path.join('node_modules', 'google-closure-compiler', 'contrib', 'externs', gcc_extern));
  });
  // TODO: Add externs folder.
}

/**
 * Add a --flag [value] for each value in the param array.
 */
function addParamArray(params, flag, paramArray) {
  paramArray.forEach(function(param){
    params.push('--' + flag +'=' + param);
  });
}

function addDebugParams (params) {
  // params.push('--debug');
  params.push('--source_map_format=V3')
  params.push('--create_source_map ' +  globals.SOURCE_MAP_NAME);
};

// Add common parameters
// Set GCC build target environment to browser
gcc_params.push('--env BROWSER');
// Add the angular pass to the build process
gcc_params.push('--angular_pass');
// Add debug parameters
// TODO: Optional
addDebugParams(gcc_params);

// ADD linting params
addParamArray(gcc_params, 'jscomp_error', globals.GCC_ERROR_FLAGS);
addParamArray(gcc_params, 'jscomp_warning', globals.GCC_WARNING_FLAGS);

// Include closure js libs
gcc_params.push("--process_closure_primitives true");

// Add Externs
addExterns(gcc_params);
// Add complication level
// TODO Should be configurable.
gcc_params.push("--compilation_level SIMPLE");

// Add the main application js files, unfortunately order matters here.
gcc_params.push(" --js " + path.join(globals.APP_PATH, 'controller.js'));
gcc_params.push(" --js " + path.join(globals.APP_PATH, 'routes.js'));
gcc_params.push(" --js " + path.join(globals.APP_PATH, 'module.js'));
gcc_params.push(" --js " + path.join(globals.APP_PATH, 'app.js'));

// Add all the rest of the files.
gcc_params.push(" --js " + path.join(globals.APP_PATH, '**/**.js'));

// Add the compiled output path.
gcc_params.push("--js_output_file " + OUTPUT_PATH);

// Create build command
var buildCommand = globals.CLOSURE_COMPILER + '  ' + gcc_params.join(' ');

// console.log(buildCommand);

// Run the build command
globals.run(buildCommand).then(data => {
  //console.log('cmd data', data);
  // TODO: If debug
  appendSourceMapReference();
  console.log('Closure compile completed successfully'.green)
}).catch(err => {
  console.log('Closure compile failed'.red);
  var messages = err.message.split('\n');
  messages.forEach(function(msg, idx){
    if(idx === 0) {
      console.log(msg.gray);
    } else {
      console.log(msg.red);
    }
  });
  
});
