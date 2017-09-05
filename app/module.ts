import routes from './routes';
import controller from './controller';
import angular from "angular";

/**
 * Creates the main angular application.
 */
let module = angular.module('app', [
  'ngRoute',
]).controller('main', controller).config(routes);

export default module;
