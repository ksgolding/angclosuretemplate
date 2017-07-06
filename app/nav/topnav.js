import module from '../module';

let topnav = module.directive('topnav', function() {
    return {
        'templateUrl': 'nav/topnav.html',
        'controller': TopNavController,
        'controllerAs': 'vm',
    };
});

/**
 * Controller for the application nav bar.
 * For the purposes of this example, this class is here to demonstrate
 * some requirements/conventions of an ES6 controller class and Google Closure.
 * The unrestricted annotation will be needed for most if not all
 * angular controller classes. ES6 classes are structs by default in closure,
 * hence the need for the unrestricted annotation.
 * @see https://github.com/google/closure-compiler/wiki/@struct-and-@dict-Annotations
 * @see https://github.com/google/closure-compiler/wiki/Annotating-JavaScript-for-the-Closure-Compiler
 * @unrestricted
 */
export class TopNavController {
    /**
     * The ngInject parameter is required for all angular controller classes. 
     * @param {!angular.Scope} $scope
     * @ngInject
     */
    constructor($scope) {
        this.scope = $scope;
       
        /**
         * Any property (or method) that will be used in an angular
         * template needs to be either annotated with export, or be declared with 
         * bracket notation,  e.g. this['menu']
         * @see https://google.github.io/styleguide/angularjs-google-style.html
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

