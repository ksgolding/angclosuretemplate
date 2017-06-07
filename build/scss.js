/**
 * node-scss compile step of the build.
 * The following is a very minimal script utilizing the
 * the node-scss compiler (https://github.com/sass/node-sass)
 */

var sass = require('node-sass');
var globals = require('./globals.js');
const fs = require('fs');
var path = require('path');
var OUTPUT_PATH = path.join(globals.BUILD_PATH, globals.COMPILED_CSS_NAME);
var OUTPUT_MAP_PATH = path.join(globals.BUILD_PATH, globals.COMPILED_CSS_NAME + '.map');

var result = sass.renderSync({
  // Where the compiled css file is written.
  file: globals.MAIN_SCSS_PATH,
  // OutFile is used to help create the source map.
  outFile: OUTPUT_PATH,
  // Supported output styles: nested, expanded, compact, compressed
  outputStyle: 'nested',
  sourceMap: true  
});

fs.writeFileSync(OUTPUT_PATH, result.css);
fs.writeFileSync(OUTPUT_MAP_PATH, result.map);
