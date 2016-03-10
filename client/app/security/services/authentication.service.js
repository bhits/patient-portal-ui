(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', AuthenticationService);

    /* @ngInject */
    function AuthenticationService($http, tokenService, oauthConfig) {

        var service = {};

        service.login = login;
        service.refresh = refresh;

        return service;

        function setTokenValues(response) {
            tokenService.setToken(response);
        }

        function login(username, password) {
            return $http({
                method: 'POST',
                url: oauthConfig.getAccessTokenUrl,
                headers: {'Authorization': 'Basic ' + oauthConfig.base64BasicKey},
                params: {
                    'grant_type': 'password',
                    'password': password,
                    'username': username
                }
            })
                .success(function (response) {
                    setTokenValues(response);
                })
                .error(function () {
                    tokenService.removeToken();
                });
        }

        //TODO
        function refresh() {
            return $http({
                method: 'POST',
                url: oauthConfig.getAccessTokenUrl,
                headers: {'Authorization': 'Basic ' + oauthConfig.base64BasicKey},
                params: {
                    'refresh_token': tokenService.getRefreshToken(),
                    'grant_type': 'refresh_token'
                }
            })
                .success(function (response) {
                    setTokenValues(response);
                });
        }
    }
})();