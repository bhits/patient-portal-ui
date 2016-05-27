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
            return loginResource().save(loginInfo, success, error);
        }

        function logout() {
            oauthTokenService.removeToken();
            utilityService.redirectTo(oauthConfig.loginPath);
        }
    }
})();