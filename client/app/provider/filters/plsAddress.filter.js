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
            var providerAddressArray = [provider.firstLineBusinessPracticeLocationAddress,
                provider.secondLineBusinessPracticeLocationAddress,
                provider.businessPracticeLocationAddressCityName,
                provider.businessPracticeLocationAddressStateName,
                utilityService.formatZipCode(provider.businessPracticeLocationAddressPostalCode)].filter(function (element) {
                return !!utilityService.hasString(element);
            });
            return providerAddressArray.join(", ");
        };
    }
}());