(function () {
    'use strict';

    angular
        .module('app.data')
        .factory('providerSharedService', providerSharedService);

    /* @ngInject */
    function providerSharedService($resource, ENVService) {

        var providers = $resource(ENVService.securedApis.pcmApiBaseUrl + "/providers/:npi", {npi: '@npi'});

        var service = {};
        service.getProvidersResource = getProvidersResource;
        service.isIndividualProvider = isIndividualProvider;
        service.isOrganizationProvider = isOrganizationProvider;
        service.getProviderByNPI = getProviderByNPI;
        service.getProviderByNpis = getProviderByNpis;
        service.getIndividualProvidersNpi = getIndividualProvidersNpi;
        service.getOrganizationalProvidersNpi = getOrganizationalProvidersNpi;

        return service;


        function getProvidersResource () {
            return providers;
        }

        function isIndividualProvider (provider){
            return angular.isDefined(provider) && angular.equals(provider.entityType, 'Individual');
        }
        function isOrganizationProvider (provider){
            return angular.isDefined(provider) && angular.equals(provider.entityType, 'Organization');
        }
        function getProviderByNPI (providerList, npi){
            if(angular.isDefined(providerList)){
                for(var i = 0; i < providerList.length; i++){
                    if(providerList[i].npi === npi){
                        return providerList[i];
                    }
                }
            }
            return {};
        }

        function findProviderByNpi ( providers, npi){
            for(var i = 0; i < providers.length; i++){
                if(providers[i].npi === npi){
                    return providers[i];
                }
            }
        }

        function getProviderByNpis (providers, listOfNpi1,listOfNpi2 ){
            var result = [];
            var listOfNpi = listOfNpi1.concat(listOfNpi2);

            if(angular.isDefined(providers)){
                for(var i = 0; i < listOfNpi.length; i++){
                    var provider = findProviderByNpi(providers, listOfNpi[i]);
                    if(provider.npi){
                        result.push(provider);
                    }
                }
            }
            return result;
        }
        function getIndividualProvidersNpi (providers){
            var result = [];
            for(var i = 0; i < providers.length; i++){
                if(isIndividualProvider(providers[i])){
                    result.push(providers[i].npi);
                }
            }
            return result;
        }
        function getOrganizationalProvidersNpi (providers){
            var result = [];
            for(var i = 0; i < providers.length; i++){
                if(isOrganizationProvider(providers[i])){
                    result.push(providers[i].npi);
                }
            }
            return result;
        }
    }
})();