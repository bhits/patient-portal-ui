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
                function ProfileMenuController ($scope, profileService, Profile) {
                    var vm = this;

                    $scope.$on('oauth:profile', profileRetrievedHandler);
                    vm.logout = logout;

                    //Fired when the profile data has been retrieved from the
                    // authorization server (UAA).
                    function profileRetrievedHandler(profile) {
                        var oAuthProfile = Profile.get();
                        vm.name = oAuthProfile.name;
                        profileService.setProfile(oAuthProfile);
                    }

                    function logout(){

                    }
                }
            }
})();