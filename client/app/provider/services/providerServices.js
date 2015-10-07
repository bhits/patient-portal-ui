/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function(){
    'use strict';

    function ProviderService($resource, ENVService, $log){
        return {

            getProviders: function () {
                var providers = $resource(ENVService.pcmApiBaseUrl + "/connectionMain/");
                return providers;
            },
            /**
             * Deletes provider by npi
             */
            deleteProvider: function (npi, success, error) {
                $log.info("Deleting provider with npi: " + npi);
            },
            /**
             * Adds provider
             *
             */
            /**
             *  Adds provider
             * @param provider - the provider to be added
             */
            addProviders: function (provider) {
                $log.info("Adding provider");
            },
            /**
             * Gets the Provider Lookup Service resource object
             * @returns {Object} providerResource - The provider resource object
             */

            lookupProviders: function (plsQueryParameters, page, onSuccess, onError) {
                var queryParameters = "";
                queryParameters = plsQueryParameters.usstate ? queryParameters + "/usstate/" + plsQueryParameters.usstate : queryParameters;
                queryParameters = plsQueryParameters.city ? queryParameters + "/city/" + plsQueryParameters.city : queryParameters;
                queryParameters = plsQueryParameters.zipcode ? queryParameters + "/zipcode/" + plsQueryParameters.zipcode : queryParameters;
                queryParameters = plsQueryParameters.gender ? queryParameters + "/gender/" + plsQueryParameters.gender : queryParameters;
                queryParameters = plsQueryParameters.specialty ? queryParameters + "/specialty/" + plsQueryParameters.specialty : queryParameters;
                queryParameters = plsQueryParameters.phone ? queryParameters + "/phone/" + plsQueryParameters.phone : queryParameters;
                queryParameters = plsQueryParameters.firstname ? queryParameters + "/firstname/" + plsQueryParameters.firstname : queryParameters;
                queryParameters = plsQueryParameters.lastname ? queryParameters + "/lastname/" + plsQueryParameters.lastname : queryParameters;
                queryParameters = plsQueryParameters.facilityname ? queryParameters + "/facilityname/" + plsQueryParameters.facilityname : queryParameters;

                var providerResource = $resource(ENVService.plsApiBaseUrl + "/pageNumber/:pageNumber" + queryParameters, {pageNumber: page});
                var providerLookupResponse = providerResource.get({pageNumber: page}, onSuccess, onError);
                return providerLookupResponse;
            },

            /**
             * Checks if the providerLookupResult object contains no providers.
             * @param providerLookupResult
             * @returns {boolean}
             */
            isEmptyLookupResult: function (providerLookupResult) {
                var empty = false;
                if (!providerLookupResult || !providerLookupResult.providers || providerLookupResult.providers.length === 0) {
                    empty = true;
                }
                return empty;
            },
        };
    }
    /**
     * The provider service
     *
     */
    angular.module("app.providerService", ['ngResource', 'app.config'])
        .factory('ProviderService', ProviderService);
})();



