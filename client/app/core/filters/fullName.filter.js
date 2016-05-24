(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('fullName', fullNameFilter);

        /**
         * Filter to format phone number
         */
        function fullNameFilter() {

            return fullName;

            function fullName (data) {
                var fullName = {};
                if (angular.isDefined(data) && angular.isDefined(data.orgName)&& angular.isDefined(data.firstName) && angular.isDefined(data.lastName)) {
                    fullName = data.orgName ;
                }else if (angular.isDefined(data) && angular.isDefined(data.firstName) && angular.isDefined(data.lastName)) {
                    fullName = data.firstName + " " + data.lastName;
                }
                return fullName;
            }
        }
})();