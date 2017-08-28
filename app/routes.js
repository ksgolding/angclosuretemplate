/**
 * Defines the application routes.
 */
var routes = (function () {
    /**
     * @param {angular.$routeProvider} $routeProvider
     * @ngInject
     */
    function routes($routeProvider) {
        $routeProvider.otherwise({
            template: '<main></main>'
        });
    }
    return routes;
}());
export default routes;
