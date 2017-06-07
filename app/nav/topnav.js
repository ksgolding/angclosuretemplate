goog.provide('app.TopNavCtrl');
goog.provide('app.topNavDirective');

goog.require('app.module');

app.topNavDirective = function() {
    return {
        'templateUrl': 'nav/topnav.html',
        'controller': app.TopNavCtrl,
        'controllerAs': 'vm'
    }
};

app.module.directive('topnav', app.topNavDirective);

/**
 * @param {angular.scope}
 * @ngInject
 */
app.TopNavCtrl = function($scope) {
    this.scope = $scope;

    this['menu'] = [ {
        'link':'#',
        'title': 'link 1'
    },
    {
      'link':'#',
      'title': 'link 2'
    },
     {
      'link':'#',
      'title': 'link 3'
    }];
};