(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', AuthenticationService);

    /* @ngInject */
    function AuthenticationService($resource, envService, tokenService) {

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
        service.refresh = refresh;

        return service;

        function setTokenValues(response) {
            tokenService.setToken(response);
        }

        function login(userName, password) {
            var getLoginResource = loginResource(userName, password);

            getLoginResource.save({},
                function (response) {
                    setTokenValues(response);
                },
                function () {
                    tokenService.removeToken();
                });
            return getLoginResource;
        }

        //TODO
        function refresh() {
            /*return $http({
             method: 'POST',
             url: envService.tokenUrl,
             headers: {'Authorization': 'Basic ' + envService.base64BasicKey},
             params: {
             'refresh_token': tokenService.getRefreshToken(),
             'grant_type': 'refresh_token'
             }
             })
             .success(function (response) {
             setTokenValues(response);
             });*/
        }
    }
})();