/**
 * Defines the main application controller.
 */
export default class controller {
    /**
     * @param {!angular.Scope} $scope
     * @ngInject
     */
    constructor($scope) {
        $scope.$root['application'] = {
            'name': 'App Name (aka title)',
        };
    }
}
