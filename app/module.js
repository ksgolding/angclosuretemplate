import routes from 'routes';
import controller from 'controller';

export const module = angular.module('app', [
  'ngRoute',
]).controller('main', controller).config(routes);