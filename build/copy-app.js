/**
 * Copy all content/view type files to the build directory.
 */
const fs = require('fs-extra');
const globals = require('./globals');
var colors = require('colors');
var includeFilesRx = /(gif|jpeg|ico|html)$/g;
var scssRx = /scss/g;

var options = {
    overwrite: true,
    filter: function(path) {
        if(fs.statSync(path).isFile()) {
           return includeFilesRx.test(path);
        }
        // scss fils get compiled, so filter those.
        return !scssRx.test(path); 
    }
}
console.log('Copying files from ' + globals.APP_PATH + ' to  ' + globals.BUILD_PATH);
try {
    fs.copySync(globals.APP_PATH,  globals.BUILD_PATH, options);
    console.log('Content/view file(s) copy success'.green);
} catch(err) {
    console.log('Content/view file(s) copy failed:'.red, err);
}
process.exit();