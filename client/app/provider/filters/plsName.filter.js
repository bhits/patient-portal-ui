/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.provider')
        .filter('plsName', plsNameFilter);

    function plsNameFilter() {
        return function (provider) {
            var providerName = '';
            if (angular.isDefined(provider) && angular.isDefined(provider.entityTypeDisplayName)) {
                switch (provider.entityTypeDisplayName) {
                    case "Individual":
                        providerName = provider.firstName + ' ' + provider.lastName;
                        break;
                    case "Organization":
                        providerName = provider.organizationName;
                        break;
                }
            }
            return providerName;
        };
    }
}());