/**
 * Created by tomson.ngassa on 12/15/2015.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
            .filter('fileName', fileNameFilter);

            /* @ngInject */
            function fileNameFilter() {
                return function(fileName) {
                    var parts = fileName.split(".");
                    var fileNameWithoutExtension = parts[0];
                    return fileNameWithoutExtension;

                };
            }
})();
