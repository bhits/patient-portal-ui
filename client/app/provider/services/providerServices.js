/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerService", ['ngResource', 'app.config'])

    .factory('ProviderService', ['$resource', 'ENVService', function($resource, ENVService){

        //var providerResource = $resource(ENVService.apiBaseUrl + "/ccda/getccdajson", {emrn:'@emrn'});

        return {
            /**
             * Gets the Health Information resource object
             * @returns {Object} patientResource - The patient resource object
             */
            getProviders: function(){
                return null;
            },

            lookupProviders: function(){
                return null;
            }
        };
    }]);



