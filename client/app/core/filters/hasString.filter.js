/**
 * Created by tomson.ngassa on 12/15/2015.
 */

'use strict';

(function () {

    angular
        .module('app.core')
            .filter('hasString', HasString);
            /**
             * @ngInject
             */
            function HasString(utilityService) {
                return hasStr;

                function hasStr(str) {
                    return utilityService.hasString(str);
                }
            }
})();
