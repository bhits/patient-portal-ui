(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('c2sTopNavbarLogo', c2sTopNavbarLogo);

    /* @ngInject */
    function c2sTopNavbarLogo() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/layout/directives/topNavbarLogo.html',
            controllerAs: 'topNavbarLogoVm',
            controller: TopNavbarLogoController
        };
        return directive;

        /* @ngInject */
        function TopNavbarLogoController(configService) {
            var vm = this;
            vm.brandSmallLogo = specifyImageType(configService.getBrandSmallLogo());
            vm.brandMediumLogo = specifyImageType(configService.getBrandMediumLogo());

            function specifyImageType(base64Image) {
                return "data:image/png;base64," + base64Image;
            }
        }
    }
})();