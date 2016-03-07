(function () {
    'use strict';

    angular.module('app.security')
        .factory('tokenService', TokenService);

    /* @ngInject */
    function TokenService(storageService) {

        var service = {};

        service.getToken = getToken;
        service.setToken = setToken;
        service.getAccessToken = getAccessToken;
        service.getRefreshToken = getRefreshToken;
        service.getExpiresIn = getExpiresIn;
        service.isValidToken = isValidToken;
        service.isExpiredToken = isExpiredToken;
        service.isValidAndExpiredToken = isValidAndExpiredToken;
        service.reset = reset;

        return service;

        function getToken() {
            var storage = storageService.getStorage();
            return storage.token;
        }

        function setToken(token) {
            var storage = storageService.getStorage();
            storage.token = token;
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
         storageService.getStorage().expiresIn = new Date(new Date().valueOf() + (seconds * 1000));
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

        function reset() {
            //TODO
            setToken(null);
        }
    }
})();