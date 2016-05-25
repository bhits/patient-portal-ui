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
                var address = "";
                if (angular.isDefined(data)) {

                    if(utilityService.isDefinedAndLenghtNotZero(data.firstLinePracticeLocationAddress)){
                        address += data.firstLinePracticeLocationAddress + " , ";
                    }
                    if( utilityService.isDefinedAndLenghtNotZero(data.practiceLocationAddressCityName)){
                        address += data.practiceLocationAddressCityName + ", ";
                    }

                    if( utilityService.isDefinedAndLenghtNotZero(data.practiceLocationAddressStateName)){
                        address += data.practiceLocationAddressStateName + ", ";
                    }

                    if( utilityService.isDefinedAndLenghtNotZero(data.practiceLocationAddressPostalCode)){
                        address += data.practiceLocationAddressPostalCode ;
                    }
                }
                return address;
            }
        }
})();