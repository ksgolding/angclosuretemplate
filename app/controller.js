goog.provide('app.controller');

/**
 * @param {!angular.Scope} $scope
 * @constructor
 * @ngInject
 */
app.controller = function($scope) {
  $scope.$root['application'] = {
    'name': 'App Name (aka title)',
  };
};
