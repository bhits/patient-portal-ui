/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentService($resource, ENVService) {
        var consentResource = $resource(ENVService.pcmApiBaseUrl + "/providers/:npi", {npi: '@npi'});

        return {

            createConsent: function(consent, success, error) {

            },

            deleteConsent: function(id, success, error) {

            },

            updateConsent: function(consent, success, error) {
            }
        };
    }

    /**
     * The provider service
     *
     */
    angular.module("app.consentServices", ['ngResource', 'app.config'])
        .factory('ConsentService', ConsentService);
})();



