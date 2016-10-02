(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('address', addressFilter);

    /**
     * Filter to format phone number
     */
    function addressFilter(utilityService) {

        return composeAddress;

        function composeAddress(data) {
            var address = "";
            if (angular.isDefined(data)) {

                if (utilityService.isDefinedAndLengthNotZero(data.firstLinePracticeLocationAddress)) {
                    address += data.firstLinePracticeLocationAddress + ", ";
                }
                if (utilityService.isDefinedAndLengthNotZero(data.practiceLocationAddressCityName)) {
                    address += data.practiceLocationAddressCityName + ", ";
                }

                if (utilityService.isDefinedAndLengthNotZero(data.practiceLocationAddressStateName)) {
                    address += data.practiceLocationAddressStateName + ", ";
                }

                if (utilityService.isDefinedAndLengthNotZero(data.practiceLocationAddressPostalCode)) {
                    address += data.practiceLocationAddressPostalCode;
                }
            }
            return address;
        }
    }
})();