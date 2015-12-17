'use strict';

(function () {

    angular
        .module('app.core')
            .directive('ppDatepickerRange', ppDatePickerRange);

            function ppDatePickerRange() {
                var directive =  {
                    restrict: 'EA',
                    scope: {
                        tolabel: "@",
                        fromlabel: "@",
                        ngModel: "="
                    },
                    templateUrl: 'app/core/directives/datepicker-range.tpl.html',
                    bindToController: true,
                    controllerAs: 'datePickerVm',
                    controller: DatePickerRangeController,
                    link: linkFunc
                };

                return directive;

                function linkFunc(scope, element) {
                    element.datepicker({todayBtn: "linked", autoclose: true});
                }
            }

            /* @ngInject */
            function DatePickerRangeController($scope, utilityService) {
                var vm = this;
                vm.consent = vm.ngModel;
                $scope.$watch('vm.consent.consentStart', watchStartDate);
                $scope.$watch('vm.consent.consentEnd',watchEndDate );

                function watchStartDate (startDate) {
                    setDateRange(startDate, vm.consent.consentEnd);
                }

                function watchEndDate(endDate) {
                    setDateRange(vm.consent.consentStart, endDate);
                }

                function setDateRange (startDate, endDate) {
                    if (!startDate || !endDate) {
                        return;
                    }
                    vm.error = "";
                    var fd = utilityService.formatDate(new Date());
                    if (Date.parse(startDate) < Date.parse(fd)) {
                        vm.error = ' Consent must start from today';
                    } else if (Date.parse(startDate) > Date.parse(endDate)) {
                        vm.error = ' The start date cannot occur after the end date';
                    } else {
                        vm.ngModel = vm.consent;
                    }

                    vm.showError = vm.error.length;
                }
            }

})();