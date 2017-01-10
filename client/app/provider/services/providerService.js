/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    angular
        .module("app.provider")
        .factory('providerService', providerService);

    /* @ngInject */
    function providerService($resource, configService, utilityService) {
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
            var params = {
                state: '@state',
                city: '@city',
                zipcode: '@zipcode',
                gender: '@gender',
                phone: '@phone',
                firstname: '@firstname',
                lastname: '@lastname',
                orgname: '@orgname'
            };

            var patientListResource = $resource(configService.getPlsApiBaseUrl() + "/search/query",
                params,
                {
                    'query': {
                        method: 'GET',
                        params: params
                    }
                }
            );

            var queryParams = prepareQueryParams(plsQueryParameters, page) ;

            function adjustPageOnSuccessResponse(response) {
                if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                    response.currentPage += 1;
                }
                (success || angular.identity)(response);
            }

            patientListResource.query(queryParams,adjustPageOnSuccessResponse, error);
        }

        function prepareQueryParams(plsQueryParameters, page){
            var queryParams = {};

            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.usstate)){
                queryParams.state = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.usstate);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.city)){
                queryParams.city = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.city);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.zipcode)){
                queryParams.zipcode = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.zipcode);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.gender) ){
                queryParams.gender = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.gender);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.phone)){
                queryParams.phone = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.phone);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.firstname) ){
                queryParams.firstname = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.firstname);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.lastname) ){
                queryParams.lastname = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.lastname);
            }
            if(utilityService.isDefinedAndLengthNotZero(plsQueryParameters.orgname) ){
                queryParams.orgname = utilityService.addQueryParameterPrefixAndSuffix(plsQueryParameters.orgname);
            }

            if(utilityService.isDefinedAndLengthNotZero(page) && !isNaN(page) ){
                queryParams.page = page - 1;
            }

            return queryParams;
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