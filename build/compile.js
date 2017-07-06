/**
 * "Complies" / minifies the app files using the Google closure compiler.
 */ 
var globals = require('./globals.js');
var path = require('path');
const fs = require('fs');
var colors = require('colors');
const klawSync = require('klaw-sync')
var argv = require('minimist')(process.argv.slice(2));

var OUTPUT_PATH = path.join(globals.BUILD_PATH, globals.COMPILED_JS_NAME);
var gcc_params = [];

/**
 * I am surprised that the following is needed but it seems that the
 * GC team assumes we can include the source map in the header, and 
 * does not seem to have an option to add the sourceMappingURL to the file.
 * If there is one, please let me know, as I think adding the 
 * sourceMappingURL to the map file is better than the header option.
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

/**
 * Adds debug parameters to params.
 * @param {Array<string>} params 
 */
function addDebugParams (params) {
  if(argv.debug) {
    params.push('--source_map_format=V3')
    params.push('--create_source_map ' +  globals.SOURCE_MAP_NAME);
  }
}

/**
 * Adds js file params.
 * NOTE: This is here to address some cross compatibility
 * issues between windows and unix.
 * @param {Array<string>} params 
 */
function addJsFiles(params) {
 gcc_params.push(" --js " + path.join(globals.APP_PATH, '*.js'));
 var dirFilter = function(item) {
   return !/scss|config/g.test(item);
 }
 // var result = [];
 var rootPath = __dirname.replace(path.sep + 'build', '');
 var dirs = klawSync(globals.APP_PATH, {nofile:true, filter:dirFilter});
 dirs.forEach(function(dir){
   var relPath = path.relative(rootPath, dir.path);
   gcc_params.push(" --js " + relPath + path.sep + '*.js');
 });
}

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

// Angular flags.
gcc_params.push("--process_closure_primitives true");
gcc_params.push('--generate_exports');
gcc_params.push('--export_local_property_definitions');

// Add Externs
addExterns(gcc_params);
// Add complication level
// TODO Should be configurable.
if(argv.debug) {
  gcc_params.push("--compilation_level SIMPLE");
} else {
  gcc_params.push("--compilation_level ADVANCED");
}

gcc_params.push("--module_resolution=NODE");

// gcc_params.push("-W  VERBOSE");
gcc_params.push(' --language_in ECMASCRIPT6');
gcc_params.push(' --language_out ECMASCRIPT5_STRICT');
gcc_params.push("--dependency_mode=STRICT");

// Unix vs Windows.. The **.js glob pattern does not recurse in windows, but
// does in Unix.
addJsFiles(gcc_params);
gcc_params.push("--entry_point=" +  path.join(globals.APP_PATH, 'app.js'));

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
