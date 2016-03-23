/**
 * Created by Jiahao.Li on 3/20/2016.
 */


(function () {
    'use strict';

    angular.module('app.security')
        .factory('emailTokenService', emailTokenService);

    /* @ngInject */
    function emailTokenService($resource, $sessionStorage, envService) {
        var emailTokenResource = $resource(envService.unsecuredApis.verificationUrl);
        var service = {};

        service.loadEmailToken = loadEmailToken;
        service.getEmailToken = getEmailToken;
        service.setEmailToken = setEmailToken;
        service.isValidEmailToken = isValidEmailToken;
        service.removeEmailToken = removeEmailToken;

        return service;

        function loadEmailToken(emailTokenString) {
            var emailToken = emailTokenString.split("emailToken=");
            return emailToken[1];
        }

        function getEmailToken() {
            return $sessionStorage.emailToken;
        }

        function setEmailToken(emailToken) {
            $sessionStorage.emailToken = emailToken;
        }

        function isValidEmailToken(emailToken, success, error) {
            return emailTokenResource.get({emailToken: emailToken}, success, error);
        }

        function removeEmailToken() {
            delete $sessionStorage.emailToken;
        }
    }
})();