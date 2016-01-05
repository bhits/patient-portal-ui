/**
 * Created by tomson.ngassa on 12/15/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
            .filter('zip', zipFilter);

            /* @ngInject */
            function zipFilter(utilityService) {
                return zipcodeFilter;

                function zipcodeFilter (zipCode) {
                    return utilityService.formatZipCode(zipCode);
                }
            }
})();