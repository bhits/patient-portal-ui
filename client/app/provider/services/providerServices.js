/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ProviderService($resource, ENVService) {
        var providers = $resource(ENVService.pcmApiBaseUrl + "/providers/:npi", {npi: '@npi'});

        return {

            getProviders: function () {
                return providers;
            },
            /**
             * Deletes provider by npi
             */
            deleteProvider: function (npi, success, error) {
                providers.delete({npi: npi}, success, error);

            },

            /**
             * Adds a single provider to a patient's provider list
             * @param npi npi of the provider to be added
             * @param success success callback
             * @param error error callback
             */
            addProvider: function (npi, success, error) {
                providers.save({npi: npi}, success, error);
            },

            /**
             * Gets the Provider Lookup Service resource object
             * @param plsQueryParameters
             * @param page
             * @param success
             * @param error
             */
            lookupProviders: function (plsQueryParameters, page, success, error) {
                var queryParameters = "";
                queryParameters = plsQueryParameters.usstate ? queryParameters + "/usstate/" + plsQueryParameters.usstate : queryParameters;
                queryParameters = plsQueryParameters.city ? queryParameters + "/city/" + plsQueryParameters.city : queryParameters;
                queryParameters = plsQueryParameters.zipcode ? queryParameters + "/zipcode/" + plsQueryParameters.zipcode : queryParameters;
                queryParameters = plsQueryParameters.gender ? queryParameters + "/gender/" + plsQueryParameters.gender : queryParameters;
                queryParameters = plsQueryParameters.specialty ? queryParameters + "/specialty/" + plsQueryParameters.specialty : queryParameters;
                queryParameters = plsQueryParameters.phone ? queryParameters + "/phone/" + plsQueryParameters.phone.replace(/-/g, '') : queryParameters;
                queryParameters = plsQueryParameters.firstname ? queryParameters + "/firstname/" + plsQueryParameters.firstname : queryParameters;
                queryParameters = plsQueryParameters.lastname ? queryParameters + "/lastname/" + plsQueryParameters.lastname : queryParameters;
                queryParameters = plsQueryParameters.facilityname ? queryParameters + "/facilityname/" + plsQueryParameters.facilityname : queryParameters;

                var providerResource = $resource(ENVService.plsApiBaseUrl + "/pageNumber/:pageNumber" + queryParameters, {pageNumber: page});
                providerResource.get({pageNumber: page}, success, error);
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

            /**
             * Checks if the given npi is already in the providersData
             * @param providersData
             * @param npi
             * @returns {boolean}
             */
            hasNpi: function (providersData, npi) {
                var isAlreadyAdded = false;
                if (angular.isDefined(providersData) && angular.isArray(providersData) && providersData.length > 0) {
                    for (var i = 0; i < providersData.length; i++) {
                        if (npi === providersData[i].npi) {
                            isAlreadyAdded = true;
                            break;
                        }
                    }
                }
                return isAlreadyAdded;
            }
        };
    }

    /**
     * The provider service
     *
     */
    angular.module("app.providerService", ['ngResource', 'app.config'])
        .factory('ProviderService', ProviderService);
})();



