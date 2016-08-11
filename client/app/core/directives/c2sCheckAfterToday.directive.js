/**
 * Created by jiahao.li on 3/28/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('c2sCheckAfterToday', c2sCheckAfterToday);

    /* @ngInject */
    function c2sCheckAfterToday() {
        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, elm, attrs, ctrl) {
            ctrl.$validators.isAfterToday = function (modelDate) {
                if (angular.isDefined(modelDate)) {
                    return modelDate < new Date();
                }
            };
        }
    }
})();