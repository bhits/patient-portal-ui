(function () {
    'use strict';

    angular
        .module('app.layout')
            .directive('ppProfileMenu', ppProfileMenu);

            /* @ngInject */
            function ppProfileMenu() {
                var directive =  {
                    restrict: 'E',
                    scope: {},
                    templateUrl: 'app/layout/directives/profileMenu.html',
                    controllerAs: 'profileMenuVm',
                    bindToController: true,
                    controller: ProfileMenuController
                };

                return directive;

                /* @ngInject */
                function ProfileMenuController ($scope, utilityService, Profile, profileService) {
                    var vm = this;

                    $scope.$on('oauth:profile', profileRetrievedHandler);

                    // Fired when the profile data has been retrieved from the
                    // authorization server (UAA).
                    function profileRetrievedHandler(profile) {
                        var oAuthProfile = Profile.get();
                        profileService.setOauthProfile(oAuthProfile);
                        vm.name = oAuthProfile.name;
                        //TODO get/set image url dynamically
                        vm.profileImgName = getProfileImageName(oAuthProfile.user_name);
                    }

                    function getProfileImageName(profileName){
                        var name = "generic-avatar-md-90.png";
                        if(angular.isDefined(profileName) && utilityService.startsWith((profileName + "").toLocaleLowerCase(), "sally")){
                            name = "sally-avatar-md-90.png";
                        }
                        return name;
                    }
                }
            }
})();