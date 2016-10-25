/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.provider')
        .filter('plsAddress', plsAddressFilter);

    /* @ngInject */
    function plsAddressFilter(utilityService) {
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
}());