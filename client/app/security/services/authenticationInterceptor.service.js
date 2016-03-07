(function () {

    'use strict';

    angular
        .module('app.security')

        .factory('AuthInterceptorService', AuthInterceptorService);

    /* @ngInject */
    function AuthInterceptorService($q, $location, $rootScope, utilityService, envService, tokenService, oauthConfig) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {

            config.headers = config.headers || {};

            var authData = tokenService.getToken();

            if (authData) {
                if (authData.access_token && tokenService.isExpiredToken()) {
                    logout();
                    utilityService.redirectTo(oauthConfig.loginPath);
                } else {
                    if (!config.url.match(oauthConfig.interceptorIgnorePattern) && isSecuredApi(config.url)) {
                        config.headers.Authorization = 'Bearer  ' + authData.access_token;
                    }
                }
            } else {
                var currentPath = $location.path();
                var currentPathName = currentPath.substring(1, currentPath.length);

                if ((currentPath.indexOf("fe/index") === 1)) {
                    utilityService.redirectTo("/fe/index");
                } else {
                    utilityService.redirectTo(oauthConfig.loginPath);
                }
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                //var authService = $injector.get('AuthenticationService');
                var authData = tokenService.getToken();

                if (authData) {
                    if (tokenService.isExpiredToken()) {
                        logout();
                        utilityService.redirectTo(oauthConfig.loginPath);
                    } else {
                        // Got to Error page
                    }
                    return $q.reject(rejection);
                } else {
                    logout();
                    utilityService.redirectTo(oauthConfig.loginPath);
                }
            }
            return $q.reject(rejection);
        }

        /*
         function request(config) {

         var token =  tokenService.getAccessToken();

         if (!config.url.match(oauthConfig.interceptorIgnorePattern) && token !== null) {
         if (isSecuredApi(config.url)) {
         config.headers.Authorization = 'Bearer ' + token;
         }
         }
         return config;
         }

         function responseError(rejection) {
         if (rejection.status === 401 ||
         (rejection.status === 400 // jshint ignore:line
         && rejection.config.data// jshint ignore:line
         && rejection.config.data.grant_type// jshint ignore:line
         && rejection.config.data.grant_type === 'refresh_token')) {// jshint ignore:line
         tokenService.reset();
         $location.path(oauthConfig.loginPath);
         }
         return $q.reject(rejection);
         }
         */

        function logout() {
            $rootScope.$broadcast('oauth:expired');
        }

        function isSecuredApi(url) {
            var isSecured = false;
            angular.forEach(envService.securedApis, function (value) {
                if (utilityService.startsWith(url.toLowerCase(), value.toLowerCase())) {
                    isSecured = true;
                }
            });
            return isSecured;
        }
    }
})();