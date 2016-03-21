(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($resource, envService, tokenService, utilityService, oauthConfig) {
        var loginResource = function (userName, password) {
            return $resource(envService.unsecuredApis.tokenUrl, {},
                {
                    save: {
                        method: 'POST',
                        headers: {'Authorization': 'Basic ' + envService.base64BasicKey},
                        params: {
                            'grant_type': 'password',
                            'password': password,
                            'username': userName
                        }
                    }
                });
        };

        var service = {};
        service.login = login;
        service.logout = logout;

        return service;

        function login(userName, password) {
            var getLoginResource = loginResource(userName, password);
            return getLoginResource.save().$promise;
        }

        function logout() {
            tokenService.removeToken();
            utilityService.redirectTo(oauthConfig.loginPath);
        }
    }
})();