(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('c2sIcheck', c2sIcheck);

    /* @ngInject */
    function c2sIcheck($timeout) {

        var directive = {
            restrict: 'A',
            require: 'ngModel',
            link: linkFunc
        };

        return directive;

        /* @ngInject */
        function linkFunc($scope, element, $attrs, ngModel) {

            return $timeout(timeoutHandler);

            function timeoutHandler() {

                var value = $attrs.value;
                var icheckConfig = {checkboxClass: 'icheckbox_square-green', radioClass: 'iradio_square-green'};

                $scope.$watch($attrs.ngModel, ngModelWatch);

                return $(element).iCheck(icheckConfig).on('ifChanged', ifChangedHandle);


                function ngModelWatch(newValue) {
                    $(element).iCheck('update');
                }

                function ifChangedHandle(event) {
                    if ($(element).attr('type') === 'checkbox' && $attrs.ngModel) {
                        $scope.$apply(function () {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs.ngModel) {
                        return $scope.$apply(function () {
                            return ngModel.$setViewValue(value);
                        });
                    }
                }
            }
        }
    }
})();