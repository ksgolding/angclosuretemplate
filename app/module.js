import routes from './routes';
import controller from './controller';
/**
 * Creates the main angular application.
 */
var module = angular.module('app', [
    'ngRoute',
]).controller('main', controller).config(routes);
export default module;
