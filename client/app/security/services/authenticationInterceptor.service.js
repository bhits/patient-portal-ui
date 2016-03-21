(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', authInterceptorService);

    /* @ngInject */
    function authInterceptorService($q, utilityService, tokenService, emailTokenService, oauthConfig, accountConfig) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {

            config.headers = config.headers || {};

            var accessToken = tokenService.getAccessToken();

            if (accessToken) {
                if (accessToken && tokenService.isExpiredToken()) {
                    //authenticationService.logout();
                } else if (utilityService.isSecuredApi(config.url)) {
                    config.headers.Authorization = 'Bearer  ' + accessToken;
                }
            } else {
                if (utilityService.urlMatcher("fe/index")) {
                    utilityService.redirectTo("/fe/index");
                } else if (utilityService.urlMatcher("fe/account/activationError")) {
                    utilityService.redirectTo(accountConfig.activationErrorPath);
                } else if (utilityService.urlMatcher("fe/account/verification")) {
                    if (emailTokenService.isValidEmailToken()) {
                        utilityService.redirectTo(accountConfig.verificationPath);
                    }
                } else if (utilityService.urlMatcher("fe/account/createPassword")) {
                    if (emailTokenService.isValidEmailToken()) {
                        utilityService.redirectTo(accountConfig.createPasswordPath);
                    }
                } else if (utilityService.urlMatcher("fe/account/activationSuccess")) {
                    if (emailTokenService.isValidEmailToken()) {
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
                        //authenticationService.logout();
                    } else {
                        // Got to Error page
                    }
                    return $q.reject(rejection);
                } else {
                    //authenticationService.logout();
                }
            }
            return $q.reject(rejection);
        }
    }
})();