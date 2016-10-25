(function () {

    'use strict';

    angular
        .module('app.core')
        .directive('c2sValidateEmail', c2sValidateEmail);

    /* @ngInject */
    function c2sValidateEmail(coreConstants) {

        var EMAIL_REGEXP = coreConstants.EMAIL_REGEXP;

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, elm, attrs, ctrl) {
            // this will overwrite the default Angular email validator
            ctrl.$validators.email = function (modelValue) {
                if (angular.isDefined(modelValue)) {
                    return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                } else {
                    return true;
                }
            };
        }
    }
})();