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
    function TopNavbarController(configService) {
        var vm = this;
        vm.brandSmallLogo = specifyImageType(configService.getBrandSmallLogo());
        vm.brandMediumLogo = specifyImageType(configService.getBrandMediumLogo());

        function specifyImageType(base64Image) {
            return "data:image/png;base64," + base64Image;
        }
    }
})();