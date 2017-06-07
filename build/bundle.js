/**
 * Script does a simple concatenation of the "VENDOR" files, 
 * defined in the globals.VENDOR_INCLUDES.
 * NOTE: The idea behind this is the vendor has already minimized their 
 * files and our application is utilizing those libs. So, instead of loading
 * n?vendor files, this creates a new file will all the vendor files as a 
 * single file output as the VENDOR_JS_NAME.
 */
var concat = require('concat-files');
var globals = require('./globals.js');
var path = require('path');
var colors = require('colors');

var bundleFiles = globals.VENDOR_INCLUDES.js;
// TODO: Add local vendor folder?

// Build path for vendor js files.
var bundleOutputPath = path.join(globals.BUILD_PATH, globals.VENDOR_JS_NAME);
concat(bundleFiles, bundleOutputPath, function(err){
    if(err) {
        console.log(err.red);
    }
    console.log('Vender file ' + bundleOutputPath + ' complete'.green);
});

