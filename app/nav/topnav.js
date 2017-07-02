import module from '../module';

let topnav = module.directive('topnav', function() {
    return {
        'templateUrl': 'nav/topnav.html',
        'controller': TopNavController,
        'controllerAs': 'vm',
    };
});

/**
 * @unrestricted
 */
export class TopNavController {
    /**
     * @param {!angular.Scope} $scope
     * @ngInject
     */
    constructor($scope) {
        this.scope = $scope;
       
        /**
         * @export
         */
        this.menu = [{
            'link': '#',
            'title': 'link 1',
            },
            {
            'link': '#',
            'title': 'link 2',
            },
            {
            'link': '#',
            'title': 'link 3',
            }];
    }
}

