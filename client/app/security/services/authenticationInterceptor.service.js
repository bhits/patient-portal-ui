(function () {

    'use strict';

    angular
        .module('app.security')
        .factory('authInterceptorService', authInterceptorService);

    /* @ngInject */
    function authInterceptorService($q, $location, utilityService, oauthTokenService,
                                    urlAuthorizationConfigurerService, oauthConfig) {
        var service = {};
        service.request = request;
        service.responseError = responseError;

        return service;

        function request(config) {
            var currentPath = $location.path();
            config.headers = config.headers || {};

            var accessToken = oauthTokenService.getAccessToken();

            if (accessToken) {
                if (accessToken && oauthTokenService.isExpiredToken()) {
                    //authenticationService.logout();
                } else if (utilityService.isSecuredApi(config.url)) {
                    config.headers.Authorization = 'Bearer  ' + accessToken;
                }
            } else {
                if (urlAuthorizationConfigurerService.isAllowAccess(currentPath)) {
                    utilityService.redirectTo(currentPath);
                } else {
                    utilityService.redirectTo(oauthConfig.loginPath);
                }
            }
            return config;
        }

        function responseError(rejection) {
            if (rejection.status === 401) {
                //var authService = $injector.get('AuthenticationService');
                var authData = oauthTokenService.getToken();

                if (authData) {
                    if (oauthTokenService.isExpiredToken()) {
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