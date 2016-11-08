(function () {
    'use strict';
    var bootstrapApp = angular.module('bootstrapApp', ['app']);

    function getAppConfig() {
        var initInjector = angular.injector(['ng']);
        var _http = initInjector.get('$http');

        return _http.get('http://localhost:9999/config').then(function (response) {
            bootstrapApp.constant('configConstants', response.data);
        }, function (errorResponse) {
            angular.element(document.body).addClass('load-config-error');
        });
    }

    getAppConfig().then(function () {
        // manually initializing Angular
        angular.element(document).ready(function () {
            angular.bootstrap(document, ['bootstrapApp']);
        });
    });
})();