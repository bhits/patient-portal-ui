
(function () {

    'use strict';

    angular
        .module('app.core')
            .directive('ppDatepickerRange', ppDatePickerRange);

            function ppDatePickerRange() {
                var directive =  {
                    restrict: 'EA',
                    templateUrl: 'app/core/directives/datepickerRange.html',
                    scope: {},
                    bindToController:  {
                        tolabel: "@",
                        fromlabel: "@",
                        ngModel: "="
                    },
                    controllerAs: 'datePickerVm',
                    controller: DatePickerRangeController,
                    link: linkFunc
                };

                return directive;
            }

            /* @ngInject */
            function DatePickerRangeController($scope, utilityService) {
                var datePickerVm = this;
                datePickerVm.consent = datePickerVm.ngModel;
                $scope.$watch('datePickerVm.consent.consentStart',  function(startDate) {
                        setDateRange(startDate, datePickerVm.consent.consentEnd);
                    }
                );
                $scope.$watch('datePickerVm.consent.consentEnd',function(endDate) {
                    setDateRange(datePickerVm.consent.consentStart, endDate);
                } );

                function setDateRange (startDate, endDate) {
                    if (!startDate || !endDate) {
                        return;
                    }
                    datePickerVm.error = "";
                    var fd = utilityService.formatDate(new Date());
                    if (Date.parse(startDate) < Date.parse(fd)) {
                        datePickerVm.error = ' Consent must start from today';
                    } else if (Date.parse(startDate) > Date.parse(endDate)) {
                        datePickerVm.error = ' The start date cannot occur after the end date';
                    } else {
                        datePickerVm.ngModel = datePickerVm.consent;
                    }

                    datePickerVm.showError = datePickerVm.error.length;
                }
            }

            /* @ngInject */
            function linkFunc(scope, element) {
                element.datepicker({todayBtn: "linked", autoclose: true});
            }

})();