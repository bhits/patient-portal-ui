
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('mhcValidateDate', mhcValidateDate);

            /* @ngInject */
            function mhcValidateDate(utilityService) {
                var directive =  {
                    require: 'ngModel',
                    restrict: 'A',
                    scope: {},
                    link: linkFunc
                };
                return directive;

                /* @ngInject */
                function linkFunc(scope, element, attr, ngModel) {

                    ngModel.$validators.isValidDate = function(modelValue) {
                        if(angular.isDefined(modelValue)){
                            return utilityService.isValidDate(modelValue);
                        }else{
                            return true;
                        }
                    };

                    ngModel.$validators.isFutureDate = function(iputDate) {
                        if(angular.isDefined(iputDate) && utilityService.isValidDate(iputDate)){
                            var today = new Date();
                            var parts = iputDate.split('/');
                            var enteredDate = new Date(parts[2], (parts[0] - 1), parts[1]);
                            return (enteredDate < today);
                        }else{
                            return true;
                        }
                    };
                }
            }
})();