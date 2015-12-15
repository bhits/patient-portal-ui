(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('phone', PhoneNumberFilter);

        /**
         * Filter to format phone number
         */
        function PhoneNumberFilter() {

            return phoneNumberFilter;

            function phoneNumberFilter (phoneNumber) {
                var num = phoneNumber;
                var numInt = parseInt(phoneNumber);
                if (angular.isDefined(numInt) && angular.isNumber(numInt) && numInt.toString().length >= 10) {
                    var numString = numInt.toString();
                    num = numString.slice(0, 3) + "-" + numString.slice(3, 6) + "-" + numString.slice(6, 10) + (numString.length > 10 ? '-' + numString.slice(10) : '');
                }
                return num;
            }
        }
})();