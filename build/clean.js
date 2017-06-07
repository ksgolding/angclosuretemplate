/**
 * Removes all files form the  globals.BUILD_PATH
 */
const fs = require('fs-extra');
var globals = require('./globals.js');
var colors = require('colors');
console.log('Clearing directory:', globals.BUILD_PATH);
fs.emptyDirSync(globals.BUILD_PATH);
console.log('Clean Success'.green);