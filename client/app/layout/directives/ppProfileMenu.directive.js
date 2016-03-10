(function () {
    'use strict';

    angular
        .module('app.layout')
        .directive('ppProfileMenu', ppProfileMenu);

    /* @ngInject */
    function ppProfileMenu() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/layout/directives/profileMenu.html',
            controllerAs: 'profileMenuVm',
            bindToController: true,
            controller: ProfileMenuController
        };

        return directive;

        /* @ngInject */
        function ProfileMenuController(utilityService, profileService) {
            var vm = this;
            vm.name = profileService.getName();
            //TODO get/set image url dynamically
            vm.profileImgName = getProfileImageName(profileService.getUserName());

            function getProfileImageName(profileName) {
                var name = "generic-avatar-md-90.png";
                if (angular.isDefined(profileName) && utilityService.startsWith((profileName + "").toLocaleLowerCase(), "sally")) {
                    name = "sally-avatar-md-90.png";
                }
                return name;
            }
        }
    }
})();