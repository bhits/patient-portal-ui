(function () {
    'use strict';
    /**
     * The address filter
     *
     * @returns {String} - The filter address strign
     *
     * @constructor
     */
    function AddressFilter() {

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
                addressStr += ", " + provider.practiceLocationAddressPostalCode;
            }

            return addressStr;
        };
    }

    /**
     * Formats the individual provider first and last name or the organization name
     *
     * @returns {String} - The individual provider first and last name or the organization name
     *
     */
    function NameOrFacilityFilter() {
        return function (provider) {
            if (angular.equals(provider.entityType, 'Individual')) {
                return provider.lastName + "," + provider.firstName;
            } else if (angular.equals(provider.entityType, 'Organization')) {
                return provider.orgName;
            }
        };
    }

    /**
     * Filter to format phone number
     */
    function PhoneNumberFilter() {
        return function (phoneNumber) {
            var num = phoneNumber;
            var numInt = parseInt(phoneNumber);
            if (angular.isDefined(numInt) && angular.isNumber(numInt) && numInt.toString().length >= 10) {
                var numString = numInt.toString();
                num = numString.slice(0, 3) + "-" + numString.slice(3, 6) + "-" + numString.slice(6, 10) + (numString.length > 10 ? '-' + numString.slice(10) : '');
            }
            return num;
        };
    }

    /**
     * Filter to format zip code
     */
    function ZipFilter() {
        return function (zipCode) {
            var formattedZipCode = parseInt(zipCode).toString();
            if (formattedZipCode.toString().length > 5) {
                formattedZipCode = formattedZipCode.slice(0, 5) + "-" + formattedZipCode.slice(5);
            }
            return formattedZipCode;
        };
    }

    /**
     * The generalize filter for the application
     *
     */
    angular.module('app.filtersModule', [])
        .filter('address', AddressFilter)
        .filter('nameorfacility', NameOrFacilityFilter)
        .filter('phone', PhoneNumberFilter)
        .filter('zip', ZipFilter);
})();

