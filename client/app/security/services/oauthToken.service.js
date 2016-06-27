(function () {
    'use strict';

    angular.module('app.security')
        .factory('oauthTokenService', oauthTokenService);

    /* @ngInject */
    function oauthTokenService($sessionStorage, jwtHelper) {

        var service = {};

        service.getToken = getToken;
        service.setToken = setToken;
        service.getAccessToken = getAccessToken;
        service.getRefreshToken = getRefreshToken;
        service.getTokenExpirationDate = getTokenExpirationDate;
        service.getOauthScope = getOauthScope;
        service.isExpiredToken = isExpiredToken;
        service.removeToken = removeToken;

        return service;

        function getToken() {
            return $sessionStorage.token;
        }

        function setToken(token) {
            $sessionStorage.token = token;
        }

        function getAccessToken() {
            if (angular.isDefined(getToken())) {
                return getToken().access_token;
            } else {
                return null;
            }
        }

        function getRefreshToken() {
            if (angular.isDefined(getToken())) {
                return getToken().refresh_token;
            } else {
                return null;
            }
        }

        function getTokenExpirationDate() {
            if (angular.isDefined(getAccessToken())) {
                return jwtHelper.getTokenExpirationDate(getAccessToken());
            }
        }

        function getOauthScope() {
            if (angular.isDefined(getAccessToken())) {
                var tokenPayload = jwtHelper.decodeToken(getAccessToken());
                return tokenPayload.scope;
            }
        }

        function isExpiredToken() {
            if (angular.isDefined(getAccessToken())) {
                return jwtHelper.isTokenExpired(getAccessToken());
            }
        }

        function removeToken() {
            delete $sessionStorage.token;
            delete $sessionStorage.profile;
        }
    }
})();