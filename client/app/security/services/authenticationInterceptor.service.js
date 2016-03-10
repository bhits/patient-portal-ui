(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', AuthInterceptorService);

    /* @ngInject */
    function AuthInterceptorService($q, $location, utilityService, envService, tokenService, oauthConfig) {
        var service = {};
        service.request = request;
        service.responseError = responseError;
        service.logout = logout;

        return service;

        function request(config) {

            config.headers = config.headers || {};

            var accessToken = tokenService.getAccessToken();

            if (accessToken) {
                if (accessToken && tokenService.isExpiredToken()) {
                    logout();
                } else {
                    if (isSecuredApi(config.url)) {
                        config.headers.Authorization = 'Bearer  ' + accessToken;
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
                    } else {
                        // Got to Error page
                    }
                    return $q.reject(rejection);
                } else {
                    logout();
                }
            }
            return $q.reject(rejection);
        }

        function logout() {
            tokenService.removeToken();
            utilityService.redirectTo(oauthConfig.loginPath);
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