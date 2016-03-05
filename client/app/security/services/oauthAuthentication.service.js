(function () {
    'use strict';

    angular.module('app.security')
        .factory('oauthAuthenticationService', OauthAuthenticationService);

    /* @ngInject */
    function OauthAuthenticationService($http, tokenService, oauthConfig) {

        var service = {};

        //service.allowAnonymous = allowAnonymous;
        service.login = login;
        service.refresh = refresh;
        service.logout = logout;

        return service;

        function setTokenValues(response) {
            tokenService.setToken(response);
        }

        /*function allowAnonymous(targetPath) {
         if (targetPath.split('/').length > 2) {
         targetPath = '/' + targetPath.split('/')[1];
         } else if (targetPath.split('?').length > 1) {
         targetPath = targetPath.split('?')[0];
         }

         return oauthConfig.forgotPasswordURL === targetPath || oauthConfig.unsecuredPaths.indexOf(targetPath) > -1;
         }*/

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
                    tokenService.reset();
                });
        }

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

        function logout() {
            return $http({
                method: 'DELETE',
                url: oauthConfig.revokeTokenUrl,
                headers: {'Authorization': 'Bearer ' + tokenService.getAccessToken()}
            })
                .success(function () {
                    tokenService.reset();
                });
        }
    }
})();