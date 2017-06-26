
/**
 * Defines the application routes.
 */
export default class routes {
    /**
     * @param {angular.$routeProvider} $routeProvider
     * @ngInject
     */
    constructor($routeProvider) {
        $routeProvider.otherwise({
        template: '<main></main>',
        });
    }
}
