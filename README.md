# Angular 1.x, Angular 2.x / Google Closure Project Templates #

## Overview 
The overall goal of this project is to create a Angular 1.x and Angular 2.x / Google Closure boiler-plate projects that anyone can use to get started with these tech stacks. Another goal of this project is to minimize external dependencies, at least to some degree to help aid in understanding what each part is for.

## Why Google Closure
There are a number of very good frameworks to choose from, include Webpack, Babel, MeteorJS, plus others. So why would one choose to adopt the closure compiler. Well, hopefully you already know the answer to that question and that's why you are here. If not, there are a number of comparison's between closure and other minifier(s). In most cases Googles Closure compiled code runs faster and is smaller then other tools. I think one of the main challenge with using Google closure is the lack of good boiler-plat projects.

## Why this project
If you ever end up working on a larger scale project that uses Google Closure and find yourself just mind-boggled, this is the project for you. One of the main goals is to de-mystify the abstractions in the form of custom build scripts, build jobs or other magic that seems to be occurring to make closure projects work. This project might not shed much light on any given project, but the goal is to provide an understanding of the various parts needed.

## Closure Project Debug Approaches 
There are a few approaches to creating debug compatible Closure projects.

### Index Template Pattern
The index template pattern has a special index-template.html file that allows injecting the js/css dependencies using a script to create a default index.html file. The advantage to this pattern for debugging is that no compile step is required unless a new file is added or removed.

### Watch/Minimal Compile Build Pattern
Script files are minimally complied with source maps allowing for debug support, and built files are automatically updated as changes occur. The main disadvantage to this approach is large projects might take some time to compile, which in turn hampers productivity. However, one big advantage of this approach, the code being tested is closer to the final compiled output and files are updated in near-ish real time.

Initially, this project is adopting the Watch/Minimal Build pattern.

## Project Requirements

* Utilize the Google Closure Compiler 
* Angular 
..* 1.x - In Work
..* 1.x - ES6 (future)
..* 2.x  - ES6 (future)
* Cross platform - In Work
* SCSS Support - In Work
* Lint Support (future)
* Unit Testing Examples (future)

## Project Goals
To further the goal of this project to make using the closure compiler more approachable, we are also aiming to create file/templates to help improve developer productivity. 

* Provide templates for:
** Sublime
** Visual Studio Code
** ??


## HTTP Server
Any http server can be used with this project. For convenience, this project has a pre-configured run task to start the" http-server", as it appears to be a quick and easy to use.

* http-server:  npm install http-server -g

https://www.npmjs.com/package/http-server

## NPM Script's
* npm run compile
** Complies the js files to the path defined by BUILD_PATH in ./build/globals.js
* npm run bundle
** Creates the vendor.js file that includes all files defined by VENDOR_INCLUDES in ./build/globals.js
* npm run copy
** Copies all non-compiled files to the build folder.
* npm run server
** Starts the "http-server"
* npm run watch
** Watches for file changes and runs the appropriate build script, e.g compile or copy.

## What this project is not
This project does not aim to be a definitive guide on project structure, design patterns or even best practices. That said, we are aiming to follow best practices and good design patterns and we will do our best to update the project to address issues and deficiencies. This project does not aim to reproduce the great work others have done creating very complete and great angular seed projects, but a framework to adapt/use those projects with Google Closure.
