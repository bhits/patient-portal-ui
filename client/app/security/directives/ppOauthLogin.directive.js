(function () {
    'use strict';

    angular
        .module('app.security')
        .directive('ppOauthLogin', ppOauthLogin);

    function ppOauthLogin() {

        var directive = {
            restrict: 'E',
            replace: true,
            templateUrl: 'app/security/directives/oauthLogin.html',
            scope: {},
            bindToController: {},
            controller: OauthLoginController,
            controllerAs: 'oauthLoginVm'
        };

        return directive;

        /* @ngInject */
        function OauthLoginController(utilityService, authenticationService, oauthConfig, profileService, notificationService) {
            var vm = this;
            vm.login = login;
            vm.canSubmit = canSubmit;

            function login() {
                // TODO return promises and chain them
                authenticationService.login(vm.user.email, vm.user.password)
                    .then(function () {
                            profileService.loadProfile().get().$promise.then(function (data) {
                                profileService.setProfile(data);
                                utilityService.redirectTo(oauthConfig.loginSuccessPath);
                            }, function (error) {
                                utilityService.redirectTo(oauthConfig.loginSuccessPath);
                                notificationService.error("No profile found");
                            });
                        },
                        function () {
                            vm.loginError = true;
                        });
            }

            function canSubmit(loginForm) {
                return loginForm.$dirty && loginForm.$valid;
            }
        }
    }
})();