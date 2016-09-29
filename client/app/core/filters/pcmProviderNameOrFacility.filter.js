/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('pcmProviderNameOrFacility', pcmProviderNameOrFacilityFilter);

    function pcmProviderNameOrFacilityFilter() {
        return function (provider) {
            if (angular.equals(provider.entityType, 'Individual')) {
                return provider.lastName + "," + provider.firstName;
            } else if (angular.equals(provider.entityType, 'Organization')) {
                return provider.orgName;
            }
        };
    }
}());
