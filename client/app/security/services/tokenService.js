(function () {
    'use strict';

    angular.module('app.security')
        .factory('tokenService', TokenService);

    /* @ngInject */
    function TokenService(storageService) {

        var service = {};

        service.getToken = getToken;
        service.setToken = setToken;
        service.setExpiresIn = setExpiresIn;
        service.isValidToken = isValidToken;
        service.isValidAndExpiredToken = isValidAndExpiredToken;
        service.setRefreshToken = setRefreshToken;
        service.getRefreshToken = getRefreshToken;
        service.reset = reset;

        return service;

        function getToken() {
            return storageService.getStorage().token;
        }

        function setToken(token) {
            storageService.getStorage().token = token;
        }

        function setExpiresIn(seconds) {
            storageService.getStorage().expiresIn = new Date(new Date().valueOf() + (seconds * 1000));
        }

        function isValidToken() {
            //TODO
            if (service.getToken() === null || storageService.getStorage().expiresIn === null ||
                storageService.getStorage().expiresIn.valueOf() < new Date().valueOf()) {
                return false;
            }
            return true;
        }

        function isValidAndExpiredToken() {
            //TODO
            if (service.getToken() !== null && service.getRefreshToken() !== null &&
                storageService.getStorage().expiresIn !== null && new Date().valueOf() < storageService.getStorage().expiresIn.valueOf()) {
                return true;
            }
            return false;
        }

        function setRefreshToken(refreshToken) {
            storageService.getStorage().refreshToken = refreshToken;
        }

        function getRefreshToken() {
            return storageService.getStorage().refreshToken;
        }

        function reset() {
            //TODO
            service.setToken(null);
            service.setRefreshToken(null);
            storageService.getStorage().expiresIn = null;
        }
    }
})();