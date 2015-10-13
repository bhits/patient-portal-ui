/**
 * Created by burcak.ulug on 10/12/2015.
 */
(function () {
    'use strict';

    /**
     * Filter to format provider name from PLS
     */
    function PLSProviderNameFilter() {
        return function (provider) {
            var providerName = '';
            if (angular.isDefined(provider) && angular.isDefined(provider.entityType) && angular.isString(provider.entityType)) {
                switch (provider.entityType) {
                    case 'Organization':
                        providerName = provider.providerOrganizationName;
                        break;
                    case 'Individual':
                        providerName = provider.providerLastName + ', ' + provider.providerFirstName + (provider.providerMiddleName ? ' ' + provider.providerMiddleName : '');
                        break;
                }
            }
            return providerName;
        };
    }

    /**
     * Filter to format provider address from PLS
     */
    function PLSProviderAddressFilter(utilityService) {
        return function (provider) {
            var providerAddressArray = [provider.providerFirstLineBusinessPracticeLocationAddress,
                provider.providerSecondLineBusinessPracticeLocationAddress,
                provider.providerBusinessPracticeLocationAddressCityName,
                provider.providerBusinessPracticeLocationAddressStateName,
                utilityService.formatZipCode(provider.providerBusinessPracticeLocationAddressPostalCode)].filter(function (element) {
                    return !!utilityService.hasString(element);
                });
            return providerAddressArray.join(", ");
        };
    }

    angular.module('app.providerFiltersModule', ['app.servicesModule'])
        .filter('plsName', PLSProviderNameFilter)
        .filter('plsAddress', ['utilityService', PLSProviderAddressFilter]);

})();