/**
 * Created by Jiahao.Li on 3/20/2016.
 */


(function () {
    'use strict';

    angular.module('app.security')
        .factory('emailTokenService', emailTokenService);

    /* @ngInject */
    function emailTokenService($sessionStorage) {
        //TODO implement
        var mockEmailToken = true;

        var service = {};

        service.getEmailToken = getEmailToken;
        service.setEmailToken = setEmailToken;
        service.isValidEmailToken = isValidEmailToken;
        service.removeEmailToken = removeEmailToken;

        return service;

        function getEmailToken() {
            return $sessionStorage.emailToken;
        }

        function setEmailToken(emailToken) {
            $sessionStorage.emailToken = emailToken;
        }

        //TODO
        function isValidEmailToken() {
            return mockEmailToken;
        }

        function removeEmailToken() {
            delete $sessionStorage.emailToken;
        }
    }
})();