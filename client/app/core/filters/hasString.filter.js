/**
 * Created by tomson.ngassa on 12/15/2015.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
            .filter('hasString', hasString);

            /* @ngInject */
            function hasString(utilityService) {
                return hasStr;

                function hasStr(str) {
                    return utilityService.hasString(str);
                }
            }
})();
