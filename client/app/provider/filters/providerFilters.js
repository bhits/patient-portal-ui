/**
 * Created by burcak.ulug on 10/12/2015.
 */
(function () {
    'use strict';

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

    function pcmProviderAddress(utilityService) {

        return function (provider) {
            var addressStr = "";
            if (angular.isDefined(provider.firstLinePracticeLocationAddress)) {
                addressStr += provider.firstLinePracticeLocationAddress;
            }
            if (angular.isDefined(provider.practiceLocationAddressCityName)) {
                addressStr += ", " + provider.practiceLocationAddressCityName;
            }
            if (angular.isDefined(provider.practiceLocationAddressStateName)) {
                addressStr += ", " + provider.practiceLocationAddressStateName;
            }
            if (angular.isDefined(provider.practiceLocationAddressPostalCode)) {
                addressStr += ", " + utilityService.formatZipCode(provider.practiceLocationAddressPostalCode);
            }

            return addressStr;
        };
    }

    function PCMProviderNameOrFacilityFilter() {
        return function (provider) {
            if (angular.equals(provider.entityType, 'Individual')) {
                return provider.lastName + "," + provider.firstName;
            } else if (angular.equals(provider.entityType, 'Organization')) {
                return provider.orgName;
            }
        };
    }

    angular
        .module('app.providerFiltersModule',
            ['app.core'])
            .filter('plsName', PLSProviderNameFilter)
            .filter('plsAddress', ['utilityService', PLSProviderAddressFilter])
            .filter('pcmProviderAddress', pcmProviderAddress)
            .filter('pcmProviderNameOrFacility', PCMProviderNameOrFacilityFilter);
})();