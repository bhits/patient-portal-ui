
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppIcheck', ppIcheck);

            /**
             *  @ngInject
             */
            function ppIcheck($timeout) {
                return {
                    restrict: 'A',
                    require: 'ngModel',
                    link: function ($scope, element, $attrs, ngModel) {
                        return $timeout(function () {
                            var value;
                            value = $attrs.value;

                            $scope.$watch($attrs.ngModel, function (newValue) {
                                $(element).iCheck('update');
                            });

                            return $(element).iCheck({
                                checkboxClass: 'icheckbox_square-green',
                                radioClass: 'iradio_square-green'

                            }).on('ifChanged', function (event) {
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
                            });
                        });
                    }

                };
            }

})();