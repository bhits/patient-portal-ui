/**
 * Created by Jiahao.Li on 3/20/2016.
 */


(function () {
    'use strict';

    angular.module('app.security')
        .factory('emailTokenService', emailTokenService);

    /* @ngInject */
    function emailTokenService($sessionStorage, utilityService, accountConfig) {
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
            if (mockEmailToken) {
                return true;
            } else {
                utilityService.redirectTo(accountConfig.activationErrorPath);
                return false;
            }
        }

        function removeEmailToken() {
            delete $sessionStorage.emailToken;
        }
    }
})();