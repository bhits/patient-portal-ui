/**
 * Created by Jiahao.Li on 3/24/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sValidatePassword', c2sValidatePassword);

    /* @ngInject */
    function c2sValidatePassword(coreConstants) {

        var PASSWORD_REGEX = coreConstants.PASSWORD_REGEX;

        var directive = {
            require: 'ngModel',
            restrict: 'A',
            scope: {},
            link: linkFunc
        };
        return directive;

        /* @ngInject */
        function linkFunc(scope, elm, attrs, ctrl) {
            ctrl.$validators.isValidPassword = function (modelValue) {
                if (angular.isDefined(modelValue)) {
                    return ctrl.$isEmpty(modelValue) || PASSWORD_REGEX.test(modelValue);
                } else {
                    return true;
                }
            };
        }
    }
})();