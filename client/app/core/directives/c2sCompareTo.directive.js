(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('c2sCompareTo', c2sCompareTo);

    /* @ngInject */
    function c2sCompareTo() {
        var directive = {
            require: "ngModel",
            scope: {
                otherModelValue: "=c2sCompareTo"
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