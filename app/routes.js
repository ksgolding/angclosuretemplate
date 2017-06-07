goog.provide('app.routes');

/**
 * @ngInject
 */
app.routes = function($routeProvider) {
    $routeProvider.otherwise({
        template:"<main></main>"
    });
};