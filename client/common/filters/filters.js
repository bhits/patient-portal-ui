
(function(){
    'use strict';
    /**
     * The address filter
     *
     * @returns {String} - The filter address strign
     *
     * @constructor
     */
    function AddressFilter (){

        return function(provider){
            var addressStr = "";
            if(angular.isDefined(provider.firstLinePracticeLocationAddress)){
                addressStr += provider.firstLinePracticeLocationAddress;
            }
            if(angular.isDefined(provider.practiceLocationAddressCityName)){
                addressStr += ", " +provider.practiceLocationAddressCityName;
            }
            if(angular.isDefined(provider.practiceLocationAddressStateName)){
                addressStr += ", " + provider.practiceLocationAddressStateName;
            }
            if(angular.isDefined(provider.practiceLocationAddressPostalCode)){
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
    function NameOrFacilityFilter(){
        return function(provider){
            if(angular.equals(provider.entityType, 'Individual')){
                return provider.lastName + "," + provider.firstName;
            }else if(angular.equals(provider.entityType, 'Organization')){
                return provider.orgName;
            }
        };
    }

    /**
     * The generalize filter for the application
     *
     */
    angular.module('app.filtersModule', [])
        .filter('address', AddressFilter)
        .filter('nameorfacility', NameOrFacilityFilter);
})();

