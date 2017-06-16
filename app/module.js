goog.provide('app.module');

goog.require('app.controller');
goog.require('app.routes');

// Define the `app` module
app.module = angular.module('app', [
  'ngRoute',
]).controller('main', app.controller).config(app.routes);


