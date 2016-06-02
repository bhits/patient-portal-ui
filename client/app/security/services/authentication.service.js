(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($resource, envService, oauthTokenService, utilityService, oauthConfig) {
        var loginResource = function () {
            return $resource(envService.unsecuredApis.tokenUrl, {},
                {
                    save: {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + envService.base64BasicKey,
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
        };

        var service = {};
        service.login = login;
        service.logout = logout;

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
            utilityService.redirectTo(oauthConfig.loginPath);
        }
    }
})();