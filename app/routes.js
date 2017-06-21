
/**
 * @param {angular.$routeProvider} $routeProvider
 * @ngInject
 */
export default class routes {
    constructor($routeProvider) {
        $routeProvider.otherwise({
        template: '<main></main>',
        });
    }
};
