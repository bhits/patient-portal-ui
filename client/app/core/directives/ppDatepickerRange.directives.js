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
                    controllerAs: 'DatePickerVm',
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
                var DatePickerVm = this;
                DatePickerVm.consent = DatePickerVm.ngModel;
                $scope.$watch('DatePickerVm.consent.consentStart', watchStartDate);
                $scope.$watch('DatePickerVm.consent.consentEnd',watchEndDate );

                function watchStartDate (startDate) {
                    setDateRange(startDate, DatePickerVm.consent.consentEnd);
                }

                function watchEndDate(endDate) {
                    setDateRange(DatePickerVm.consent.consentStart, endDate);
                }

                function setDateRange (startDate, endDate) {
                    if (!startDate || !endDate) {
                        return;
                    }
                    DatePickerVm.error = "";
                    var fd = utilityService.formatDate(new Date());
                    if (Date.parse(startDate) < Date.parse(fd)) {
                        DatePickerVm.error = ' Consent must start from today';
                    } else if (Date.parse(startDate) > Date.parse(endDate)) {
                        DatePickerVm.error = ' The start date cannot occur after the end date';
                    } else {
                        DatePickerVm.ngModel = DatePickerVm.consent;
                    }

                    DatePickerVm.showError = DatePickerVm.error.length;
                }
            }

})();