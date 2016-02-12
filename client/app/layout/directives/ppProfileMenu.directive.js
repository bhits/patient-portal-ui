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
                function ProfileMenuController ($scope, utilityService, profileService, Profile) {
                    var vm = this;

                    $scope.$on('oauth:profile', profileRetrievedHandler);
                    vm.logout = logout;

                    //Fired when the profile data has been retrieved from the
                    // authorization server (UAA).
                    function profileRetrievedHandler(profile) {
                        var oAuthProfile = Profile.get();
                        vm.name = oAuthProfile.name;
                        //TODO get/set image url dynamically
                        vm.profileImgPath = getProfileImagePath(oAuthProfile.user_name);
                        profileService.setProfile(oAuthProfile);
                    }

                    function logout(){

                    }

                    function getProfileImagePath(profileName){
                        var imagePath = "assets/img/generic-avatar-md-90.png";
                        if(angular.isDefined(profileName) && utilityService.startsWith((profileName + "").toLocaleLowerCase(), "sally")){
                            imagePath = "assets/img/sally-avatar-md-90.png";
                        }
                        return imagePath;
                    }
                }
            }
})();