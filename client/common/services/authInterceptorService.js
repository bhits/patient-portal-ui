(function () {

    'use strict';

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
                        utilityService.redirectTo("/login");
                    } else {
                        config.headers.Authorization = 'Bearer  ' + authData.token;
                    }
                } else {
                    var currentPath = $location.path();
                    var currentPathName = currentPath.substring(1, currentPath.length);

                    if ((currentPath.indexOf("index") === 1)) {
                        utilityService.redirectTo("/index");
                    } else {
                        utilityService.redirectTo("/login");
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
                            utilityService.redirectTo("/login");
                        } else {
                            // Got to Error page
                        }
                        return $q.reject(rejection);
                    } else {
                        logout();
                        utilityService.redirectTo("/login");
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