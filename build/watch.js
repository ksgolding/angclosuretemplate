/**
 * Script to watch for file changes and automatically rebuild.
 */
const globals = require("./globals");
const watch = require("node-watch");
const fs = require("fs-extra");
const path = require("path");
var colors = require("colors");

/**
 * If a content file changes, re-copy/delete.
 */
const rxContent = /(gif|jpeg|ico|html)$/g;

/**
 * If an scss file changes, rebuild scss.
 */
const rxScss = /(scss)$/g;

/**
 * If a js file changes, re-compile the js app.
 */
const rxjs = /(js)$/g;

var watcher = watch("app/", { recursive: true }, function(evt, name) {
  console.log(evt.blue, name.green);
  if (rxContent.test(name)) {
    if (evt == "remove") {
      var delPath = name.replace(
        globals.APP_PATH + path.sep,
        globals.BUILD_PATH + path.sep
      );
      console.log("Watcher Deleting File: ".blue + delPath.yellow);
      fs.unlinkSync(delPath);
    } else {
      var copyPath = name.replace(
        globals.APP_PATH + path.sep,
        globals.BUILD_PATH + path.sep
      );
      try {
        fs.copy(name, copyPath, err => {
          if (err) {
            console.error(err.red);
          }
        });
      } catch(err) {
        console.log(err.red);
      }
    }
    rxContent.lastIndex = 0;
    return;
  }
  
  if (rxScss.test(name)) {
    globals.run("npm run scss").then();
    rxScss.lastIndex = 0;
    return;
  }

  if (rxjs.test(name)) {
    globals.run("npm run compile").then();
    rxjs.lastIndex = 0;
    return;
  }
  // something else happened.
  if (evt == "remove") {
      var delPath = name.replace(
        globals.APP_PATH,
        globals.BUILD_PATH
      );
    if(fs.statSync(delPath).isDirectory()){
      console.log("Watcher Deleting Path: ".blue, delPath.yellow);
      fs.remove(delPath);
      return;
    }
  }
  console.log('Unhandled watcher event:'.yellow, evt.red, ':', name.red);
});

watcher.on('error', function(err) {
  console.log('Watcher Error'.red, err);
});


console.log("File Change Watcher started.".blue);
process.on("exit", function () {
  if(!watcher.isClosed()) {
    watcher.close();
  }
  console.log("File Change Watcher stopped.".blue);
});
process.on("SIGINT", function() {
  process.exit();
});
process.on("uncaughtException", function(options, err) {
  console.log(err);
  process.exit();
});
