/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    angular
        .module("app.provider")
        .factory('providerService', providerService);

    /* @ngInject */
    function providerService($resource, configService) {
        var providers = $resource(configService.getPcmApiBaseUrl() + "/providers/:npi", {npi: '@npi'});

        var service = {};

        service.getProvidersResource = getProvidersResource;
        service.deleteProvider = deleteProvider;
        service.addProvider = addProvider;
        service.lookupProviders = lookupProviders;
        service.isEmptyLookupResult = isEmptyLookupResult;
        service.hasNpi = hasNpi;

        return service;

        function getProvidersResource() {
            return providers;
        }

        function deleteProvider(npi, success, error) {
            providers.delete({npi: npi}, success, error);

        }

        function addProvider(npi, success, error) {
            providers.save({npi: npi}, success, error);
        }

        function lookupProviders(plsQueryParameters, page, success, error) {
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

            var providerResource = $resource(configService.getPlsApiBaseUrl() + "/pageNumber/:pageNumber" + queryParameters, {pageNumber: page});
            providerResource.get({pageNumber: page - 1}, adjustPageOnSuccessResponse, error);

            function adjustPageOnSuccessResponse(response) {
                if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                    response.currentPage += 1;
                }
                (success || angular.identity)(response);
            }
        }

        function isEmptyLookupResult(providerLookupResult) {
            var empty = false;
            if (!providerLookupResult || !providerLookupResult.providers || providerLookupResult.providers.length === 0) {
                empty = true;
            }
            return empty;
        }

        function hasNpi(providersData, npi) {
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

    }
})();