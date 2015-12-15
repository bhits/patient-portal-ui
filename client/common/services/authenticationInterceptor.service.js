(function () {

    'use strict';

    /**
     *
     * @param $q
     * @param $location
     * @param $rootScope
     * @param utilityService
     * @param ENVService
     * @param AccessToken
     * @returns {{request: Function, responseError: Function}}
     * @constructor
     */
    function AuthInterceptorService($q, $location, $rootScope, utilityService, ENVService, AccessToken){
        /*
         *   Log out the user
         */
        var logout = function () {
            $rootScope.$broadcast('oauth:expired');
        };

        function isSecuredApi(url){
            var isSecured = false;
            angular.forEach(ENVService.securedApis, function(value){
                if(utilityService.startsWith(url.toLowerCase(), value.toLowerCase())){
                    isSecured = true;
                }
            });
            return isSecured;
        }

        return {
            /*
             *   Success interceptor handler
             */
            request: function (config) {

                config.headers = config.headers || {};

                var authData = AccessToken.get();

                if (authData) {
                    if (authData.access_token && AccessToken.expired()) {
                        logout();
                        utilityService.redirectTo("/fe/login");
                    } else {
                        if(isSecuredApi(config.url)){
                            config.headers.Authorization = 'Bearer  ' + authData.access_token;
                        }
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
                    //var authService = $injector.get('AuthenticationService');
                    var authData = AccessToken.get();

                    if (authData) {
                        if (AccessToken.expired()) {
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
            'app.servicesModule'
        ])

        .factory('AuthInterceptorService', AuthInterceptorService);

})();