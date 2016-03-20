/**
 * Created by Jiahao.Li on 3/20/2016.
 */


(function () {
    'use strict';

    angular.module('app.security')
        .factory('emailTokenService', EmailTokenService);

    /* @ngInject */
    function EmailTokenService($sessionStorage) {
        //TODO implement
        var mockEmailTokenExpiration = 1558308959468;

        var service = {};

        service.getEmailToken = getEmailToken;
        service.setEmailToken = setEmailToken;
        service.isValidEmailToken = isValidEmailToken;
        service.notExpiredEmailToken = notExpiredEmailToken;
        service.removeEmailToken = removeEmailToken;

        return service;

        function getEmailToken() {
            return $sessionStorage.emailToken;
        }

        function setEmailToken(emailToken) {
            $sessionStorage.emailToken = emailToken;
        }

        //TODO
        function getEmailTokenExpiration() {
            return mockEmailTokenExpiration;
        }

        //TODO
        function isValidEmailToken() {
            return true;
        }

        function notExpiredEmailToken() {
            return getEmailTokenExpiration().valueOf() >= new Date().valueOf();
        }

        function removeEmailToken() {
            delete $sessionStorage.emailToken;
        }
    }
})();