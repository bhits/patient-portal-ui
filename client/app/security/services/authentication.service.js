(function () {
    'use strict';

    angular
        .module('app.security')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($resource, configService, oauthTokenService, utilityService, securityConstants) {
        function loginResource() {
            return $resource(configService.getTokenUrl(), {},
                {
                    save: {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + configService.getOauthBasicKey(),
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        /* convert to url encoded string */
                        transformRequest: function (data) {
                            var str = [];
                            for (var p in data) {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                            }
                            return str.join("&");
                        }
                    }
                });
        }

        function forgotPasswordResource() {
            return $resource(configService.getForgotPasswordUrl(), {},
                {
                    save: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        /* convert to url encoded string */
                        transformRequest: function (data) {
                            var str = [];
                            for (var p in data) {
                                str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                            }
                            return str.join("&");
                        }
                    }
                });
        }

        var service = {};
        service.login = login;
        service.logout = logout;
        service.forgotPassword = forgotPassword;

        return service;

        function login(loginInfo, success, error) {
            var requiredParameters = {
                grant_type: 'password',
                response_type: 'token'
            };
            var oauthParameters = angular.extend(requiredParameters, loginInfo);
            return loginResource().save(oauthParameters, success, error);
        }

        function logout() {
            oauthTokenService.removeToken();
            utilityService.redirectTo(securityConstants.loginPath);
        }

        function forgotPassword(forgotPasswordInfo, success, error) {
            var requiredParameters = {
                client_id: 'patient-portal-ui'
            };
            var parameters = angular.extend(requiredParameters, forgotPasswordInfo);
            return forgotPasswordResource().save(parameters, success, error);
        }
    }
})();