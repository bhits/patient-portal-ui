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

            function composeAddress (data) {
                var address = {};
                if (angular.isDefined(data)) {
                    address = data.firstLineMailingAddress + " , " + data.mailingAddressCityName + ", " + data.mailingAddressCountryCode + ", " + utilityService.formatZipCode(data.mailingAddressPostalCode);
                }
                return address;
            }

        }
})();