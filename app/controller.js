goog.provide('app.controller');

/**
 * @ngInject
 */
app.controller = function($scope) {
  this.scope = $scope;;
  this.scope.$root['application'] = {
    'name': 'App Name (aka title)'
  };
}