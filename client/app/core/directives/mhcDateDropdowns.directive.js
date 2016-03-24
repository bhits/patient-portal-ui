/**
 * Created by Jiahao.Li on 3/18/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('mhcDateDropdowns', mhcDateDropdowns);

    function mhcDateDropdowns() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/core/directives/datedropdowns.html',
            scope: {},
            bindToController: {
                ngModel: '='
            },
            controller: DateDropdownsController,
            controllerAs: 'dateDropdownsVm'
        };

        return directive;
    }

    /* @ngInject */
    function DateDropdownsController($scope) {
        var vm = this;
        vm.ngModel = {};

        $scope.months = createMonths();
        $scope.days = createDays();
        $scope.years = createYears();

        $scope.$watch('dateDropdownsVm.dateFields.month', function (month) {
                if (angular.isDefined(month)) {
                    vm.ngModel.month = month;
                }
            }
        );

        $scope.$watch('dateDropdownsVm.dateFields.day', function (day) {
                if (angular.isDefined(day)) {
                    vm.ngModel.day = day;
                }
            }
        );

        $scope.$watch('dateDropdownsVm.dateFields.year', function (year) {
                if (angular.isDefined(year)) {
                    vm.ngModel.year = year;
                }
            }
        );
    }

    function createMonths() {
        var monthRange = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        var months = [];
        var maxMonth = monthRange.length;

        for (var i = 0; i < maxMonth; i++) {
            months.push({
                value: i + 1,
                name: monthRange[i]
            });
        }
        return months;
    }

    function createDays() {
        var dayRange = [1, 31];
        var days = [];
        while (dayRange[0] <= dayRange[1]) {
            days.push(dayRange[0]++);
        }
        return days;
    }

    function createYears() {
        var maxYear = 100;
        var years = [];
        var currentYear = new Date().getFullYear();
        for (var i = 0; i < maxYear + 1; i++) {
            years.push(currentYear - i);
        }
        return years;
    }
})();