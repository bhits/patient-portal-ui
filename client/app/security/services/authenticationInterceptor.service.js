(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', authInterceptorService);

    /* @ngInject */
    function authInterceptorService($q, $location, utilityService, tokenService, emailTokenService,
                                    urlAuthorizationConfigurerService, oauthConfig, accountConfig) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {
            var currentPath = $location.path();
            config.headers = config.headers || {};

            var accessToken = tokenService.getAccessToken();

            if (accessToken) {
                if (accessToken && tokenService.isExpiredToken()) {
                    //authenticationService.logout();
                } else if (utilityService.isSecuredApi(config.url)) {
                    config.headers.Authorization = 'Bearer  ' + accessToken;
                }
            } else {
                if (urlAuthorizationConfigurerService.isAllowAccess(currentPath)) {
                    if (emailTokenService.isValidEmailToken()) {
                        utilityService.redirectTo(currentPath);
                    } else {
                        utilityService.redirectTo(accountConfig.activationErrorPath);
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