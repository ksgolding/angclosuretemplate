import module from '../module';

module.directive('topnav', function() {
    return {
        'templateUrl': 'nav/topnav.html',
        'controller': topnav,
        'controllerAs': 'vm',
    };
});

export class topnav {
    /**
     * @param {!angular.Scope} $scope
     * @ngInject
     */
    constructor($scope) {
        this.scope = $scope;

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