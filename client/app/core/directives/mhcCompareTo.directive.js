(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('mhcCompareTo', mhcCompareTo);

    /* @ngInject */
    function mhcCompareTo() {
        var directive = {
            require: "ngModel",
            scope: {
                otherModelValue: "=mhcCompareTo"
            },
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc(scope, element, attributes, ngModel) {

            ngModel.$validators.compareTo = function (modelValue) {
                return modelValue === scope.otherModelValue;
            };

            scope.$watch("otherModelValue", function () {
                ngModel.$validate();
            });
        }

    }
})();