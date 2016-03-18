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
    function AccountService() {

        var service = {};

        service.isAlreadyVerified = isAlreadyVerified;
        service.isValidEmailToken = isValidEmailToken;
        service.isExpiredEmailToken = isExpiredEmailToken;

        return service;

        function isAlreadyVerified() {
            return false;
        }

        function isValidEmailToken(emailToken) {
            return emailToken === 'mhc';
        }

        function isExpiredEmailToken(emailToken) {
            return false;
        }
    }
})();



