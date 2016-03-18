(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', AuthInterceptorService);

    /* @ngInject */
    function AuthInterceptorService($q, $location, utilityService, envService, tokenService, accountService, oauthConfig, accountConfig) {
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
                if (urlMatcher("fe/index")) {
                    utilityService.redirectTo("/fe/index");
                } else if (urlMatcher("fe/account/activationError")) {
                    utilityService.redirectTo(accountConfig.activationErrorPath);
                } else if (urlMatcher("fe/account/verification")) {
                    if (allowAccessActivation()) {
                        utilityService.redirectTo(accountConfig.verificationPath);
                    }
                } else if (urlMatcher("fe/account/createPassword")) {
                    if (allowAccessActivation()) {
                        utilityService.redirectTo(accountConfig.createPasswordPath);
                    }
                } else if (urlMatcher("fe/account/activationSuccess")) {
                    if (allowAccessActivation()) {
                        utilityService.redirectTo(accountConfig.activationSuccessPath);
                    }
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

        //TODO naming
        function urlMatcher(url) {
            var isMatched = false;
            var currentPath = $location.path();

            if ((currentPath.indexOf(url) === 1)) {
                isMatched = true;
            }
            return isMatched;
        }

        function allowAccessActivation() {
            if (!accountService.isExpiredEmailToken() && !accountService.isAlreadyVerified()) {
                return true;
            } else {
                utilityService.redirectTo(accountConfig.activationErrorPath);
                return false;
            }
        }
    }
})();