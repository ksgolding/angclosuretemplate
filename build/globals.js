// Global variables or other utilities that can be reused by other build scripts.
var Promise = require('bluebird');
var cmd = require('node-cmd');
var path = require('path');

 module.exports = {
     /**
      * Run command line script using promise pattern
      */
    run: Promise.promisify(cmd.get, { multiArgs: true, context: cmd }),
    /**
     * Closure compiler path.
     */
    CLOSURE_COMPILER: 'java -jar ' + path.join('node_modules', 'google-closure-compiler', 'compiler.jar'),
    /**
     * Build output path
     */
    BUILD_PATH: 'dist',
    /**
     * jsdocs path
     */
    DOCS_PATH: 'docs',
    /**
     * Source path
     */
    APP_PATH: 'app',
    /**
     * The root scss file
     * This file should include all other required
     * scss files needed for the application.
     */
    MAIN_SCSS_PATH: path.join('app', 'scss', 'main.scss'),
    /**
     * Output file names
     */
    COMPILED_JS_NAME: 'app.min.js',
    SOURCE_MAP_NAME: 'app.min.map.js',
    COMPILED_CSS_NAME: 'app.css',
    CSS_SOURCE_MAP_NAME: 'app.map.css',
    VENDOR_JS_NAME: 'vendor.js',
    /**
     * External dependency to include in the vendor.js file.
     */
    VENDOR_INCLUDES: {
        js:[path.join('node_modules', 'js-polyfills', 'polyfill.min.js'),
            path.join('node_modules', 'jquery', 'dist', 'jquery.js'),
            path.join('node_modules', 'angular', 'angular.js'),
            path.join('node_modules', 'angular-route', 'angular-route.js')],
        css:[path.join('node_modules', 'angular', 'angular-csp.css')]
    },
    // Include the following externs from
    // the google closure contrib/externs 
    // folder
    GCC_EXTERNS: ['angular-1.6.js',
                'angular-1.6-http-promise_templated.js',
                'angular-1.6-mocks.js',
                'angular-1.6-q_templated.js',
                'angular-1.6-resource.js',
                'angular-1.6-test.js',
                'jquery-3.2.js'],
  // Error Flags:
  GCC_ERROR_FLAGS: [ 'accessControls','ambiguousFunctionDecl','checkDebuggerStatement','checkEventfulObjectDisposal',
    'checkRegExp','checkTypes','checkVars','const','constantProperty','duplicate','duplicateMessage','es5Strict','es3',
    'externsValidation','fileoverviewTags','globalThis','internetExplorerChecks','invalidCasts','missingProperties',
    'nonStandardJsDocs','strictModuleDepCheck','undefinedNames','undefinedVars','unknownDefines','uselessCode','visibility'],
  // Warning flags  
  GCC_WARNING_FLAGS: ['deprecated', 'unknownDefines']
};
