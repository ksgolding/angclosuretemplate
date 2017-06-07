# Build Scripts #

Build scripts go in this folder.

* global.js
  * This is an npm module that contains settings and other helpers useful for each of the other scripts. The main intent for this file is to consolidate things that might change.
* compile.js
  * npm script that builds up the parameters required to run the google closure compiler that creates the compiled application script.
* bundle.js 
  * The bundle process bundles all external/vendor libs into a single file, that is separate from the complied script.
* copy-app.js
  * Copies all non-js related files to the build folder required for the application to run.
