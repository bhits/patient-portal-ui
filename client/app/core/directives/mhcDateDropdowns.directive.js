/**
 * Created by Jiahao.Li on 3/18/2016.
 */

(function () {
    'use strict';

    angular
        .module('app.core')
        .directive('mhcDatedropdowns', mhcDateDropdowns);

    function mhcDateDropdowns() {

        var directive = {
            restrict: 'A',
            replace: true,
            templateUrl: 'app/core/directives/datedropdowns.html',
            scope: {},
            bindToController: {},
            controller: DateDropdownsController,
            controllerAs: 'dateDropdownsVm'
        };

        return directive;
    }

    /* @ngInject */
    function DateDropdownsController() {
        var vm = this;
    }
})();