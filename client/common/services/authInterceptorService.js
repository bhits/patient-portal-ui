(function () {

    'use strict';
    /**
     *
     * @param $q
     * @param $location
     * @param localStorageService
     * @param $injector
     * @param jwtHelper
     * @param utilityService
     * @returns {{request: Function, responseError: Function}}
     * @constructor
     */
    function AuthInterceptorService($q, $location, localStorageService, $injector, jwtHelper, utilityService){
        /*
         *   Log out the user
         */
        var logout = function () {
            var authService = $injector.get('AuthenticationService');
            authService.logOut();
        };

        return {
            /*
             *   Success interceptor handler
             */
            request: function (config) {

                config.headers = config.headers || {};

                var authData = localStorageService.get('session');

                if (authData) {
                    if (authData.token && jwtHelper.isTokenExpired(authData.token)) {
                        logout();
                        utilityService.redirectTo("/fe/login");
                    } else {
                        config.headers.Authorization = 'Bearer  ' + authData.token;
                    }
                } else {
                    var currentPath = $location.path();
                    var currentPathName = currentPath.substring(1, currentPath.length);

                    if ((currentPath.indexOf("fe/index") === 1)) {
                        utilityService.redirectTo("/fe/index");
                    } else {
                        utilityService.redirectTo("/fe/login");
                    }
                }
                return config;
            },
            /*
             *   Failure interceptor handler
             */
            responseError: function (rejection) {
                if (rejection.status === 401) {
                    var authService = $injector.get('AuthenticationService');
                    var authData = localStorageService.get('session');

                    if (authData) {
                        if (jwtHelper.isTokenExpired(authData.token)) {
                            logout();
                            utilityService.redirectTo("/fe/login");
                        } else {
                            // Got to Error page
                        }
                        return $q.reject(rejection);
                    } else {
                        logout();
                        utilityService.redirectTo("/fe/login");
                    }
                }
                return $q.reject(rejection);
            }
        };
    }

    /*
    *   Intercepts all the http calls
    */
    angular.module('app.authInterceptorModule',
        [
          'LocalStorageModule',
          'angular-jwt',
          'app.servicesModule'
        ])

    .factory('AuthInterceptorService', AuthInterceptorService);

})();