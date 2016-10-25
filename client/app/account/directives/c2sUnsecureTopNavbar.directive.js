(function () {
    'use strict';

    angular
        .module('app.account')
        .directive('c2sUnsecureTopNavbar', topNavbar);

    function topNavbar() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/account/directives/topNavbar.html',
            scope: {},
            bindToController: {
                title: "="
            },
            controller: TopNavbarController,
            controllerAs: 'topNavbarVm'
        };

        return directive;
    }

    /* @ngInject */
    function TopNavbarController() {
        var vm = this;
    }
})();