/**
 * Created by tomson.ngassa on 12/16/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .filter('trustAsHTML', trustAsHTMLFilter);

         /* @ngInject */
        function trustAsHTMLFilter($sce) {
            return sceFilter;

            function sceFilter (text) {
                return $sce.trustAsHtml(text);
            }
        }
})();