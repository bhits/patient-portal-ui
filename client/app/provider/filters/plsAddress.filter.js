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
                provider.practiceLocationAddressCityName,
                provider.practiceLocationAddressStateName,
                utilityService.formatZipCode(provider.practiceLocationAddressPostalCode)].filter(function (element) {
                return !!utilityService.hasString(element);
            });
            return providerAddressArray.join(", ");
        };
    }
}());