/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.provider')
        .filter('pcmProviderAddress', pcmProviderAddress);

    /* @ngInject */
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
}());