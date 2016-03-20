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
        //TODO implement
        var mockNotAlreadyVerified = true;

        var service = {};
        service.notAlreadyVerified = notAlreadyVerified;

        return service;

        //TODO
        function notAlreadyVerified() {
            return mockNotAlreadyVerified;
        }
    }
})();



