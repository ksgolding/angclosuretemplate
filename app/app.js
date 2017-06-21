/**
 * Root application namespace, app bootstrap.
 * This starts the app.
 * export default == static class.
 */
export default class app {
};

$(document).ready(function() {
    angular.bootstrap(document, ['app']);
});
