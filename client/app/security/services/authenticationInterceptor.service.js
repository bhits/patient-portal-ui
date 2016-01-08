
(function () {



    'use strict';

    angular
        .module('app.security')

            .factory('AuthInterceptorService', AuthInterceptorService);

            /* @ngInject */
            function AuthInterceptorService($q, $location, $rootScope, utilityService, envService, AccessToken){
               var service = {};
                service.request = request;
                service.responseError = responseError;

                return service;

                function request(config) {

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
                }

                function responseError(rejection) {
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


                function logout() {
                    $rootScope.$broadcast('oauth:expired');
                }

                function isSecuredApi(url){
                    var isSecured = false;
                    angular.forEach(envService.securedApis, function(value){
                        if(utilityService.startsWith(url.toLowerCase(), value.toLowerCase())){
                            isSecured = true;
                        }
                    });
                    return isSecured;
                }
            }
})();