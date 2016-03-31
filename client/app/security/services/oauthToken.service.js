(function () {
    'use strict';

    angular.module('app.security')
        .factory('oauthTokenService', oauthTokenService);

    /* @ngInject */
    function oauthTokenService($sessionStorage) {

        var service = {};

        service.getToken = getToken;
        service.setToken = setToken;
        service.getAccessToken = getAccessToken;
        service.getRefreshToken = getRefreshToken;
        service.getExpiresIn = getExpiresIn;
        service.isValidToken = isValidToken;
        service.isExpiredToken = isExpiredToken;
        service.isValidAndExpiredToken = isValidAndExpiredToken;
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

        function getExpiresIn() {
            if (angular.isDefined(getToken())) {
                return (new Date(new Date().valueOf() + ((getToken().expires_in) * 1000)));
            } else {
                return null;
            }
        }

        /*function setExpiresIn(seconds) {
         $sessionStorage.expiresIn = new Date(new Date().valueOf() + (seconds * 1000));
         }*/

        function isValidToken() {
            //TODO
            if (getAccessToken() === null || getExpiresIn() === null || getExpiresIn().valueOf() < new Date().valueOf()) {
                return false;
            }
            return true;
        }

        function isExpiredToken() {
            //TODO
            if (getExpiresIn().valueOf() < new Date().valueOf()) {
                return true;
            }
        }

        function isValidAndExpiredToken() {
            //TODO
            if (getAccessToken() !== null && getRefreshToken() !== null &&
                getExpiresIn() !== null && new Date().valueOf() < getExpiresIn().valueOf()) {
                return true;
            }
            return false;
        }

        function removeToken() {
            delete $sessionStorage.token;
            delete $sessionStorage.profile;
        }
    }
})();