
(function () {

    'use strict';

    angular
        .module("app.security")
            .factory('authenticationService', AuthenticationService);

            /* @ngInject */
            function AuthenticationService($sessionStorage, utilityService) {

                var service = {};

                service.getState = getState;
                service.isValidState = isValidState;

                return service;

                function getState() {
                    if (typeof $sessionStorage.oauthState === 'undefined') {
                        $sessionStorage.oauthState = utilityService.randomAlphanumeric(10);
                    }
                    return $sessionStorage.oauthState;
                }

                function isValidState(stateToCheck) {
                    return $sessionStorage.oauthState === stateToCheck;
                }
            }
})();