(function () {

    'use strict';

    /**
     *
     * @param $sessionStorage
     * @param utilityService
     * @returns {{getState: Function, isValidState: Function}}
     * @constructor
     */
    function AuthenticationService($sessionStorage, utilityService) {
        return {
            getState: function () {
                if (typeof $sessionStorage.oauthState === 'undefined') {
                    $sessionStorage.oauthState = utilityService.randomAlphanumeric(10);
                }
                return $sessionStorage.oauthState;
            },

            isValidState: function (stateToCheck) {
                return $sessionStorage.oauthState === stateToCheck;
            }
        };
    }

    angular.module('app.authenticationModule',
        [
            'ngStorage',
            'app.servicesModule'
        ])
        .factory('AuthenticationService', AuthenticationService);

})();