/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {
    'use strict';

    /**
     * The Account Service
     *
     */
    angular
        .module("app.account")
        .factory('accountService', AccountService);

    /* @ngInject */
    function AccountService($sessionStorage) {
        //TODO implement
        var mockEmailTokenExpiration = 1558308959468;
        var mockAlreadyVerified = false;

        var service = {};

        service.getEmailToken = getEmailToken;
        service.setEmailToken = setEmailToken;
        service.isValidEmailToken = isValidEmailToken;
        service.isAlreadyVerified = isAlreadyVerified;
        service.isExpiredEmailToken = isExpiredEmailToken;

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

        //TODO
        function isAlreadyVerified() {
            return mockAlreadyVerified;
        }

        function isExpiredEmailToken() {
            return getEmailTokenExpiration().valueOf() < new Date().valueOf();
        }
    }
})();



