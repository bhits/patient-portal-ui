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
        function OauthLoginController($state, $sessionStorage, oauthAuthenticationService, oauthConfig) {
            var vm = this;
            vm.login = login;

            function login() {
                oauthAuthenticationService.login(vm.user.email, vm.user.password)
                    .then(function () {

                            console.log("Success in logging in.");
                            $state.go(oauthConfig.loginSuccessPath);

                            // Redirect user here to login page or perhaps some other intermediate page
                            // that requires email address verification before any other part of the site
                            // can be accessed.
                        },
                        function (response) {

                            vm.loginError = response.data[oauthConfig.loginErrorMessage];// jshint ignore:line
                            console.log("Error in logging in.");

                            //TODO
                            $sessionStorage.$reset();
                        });
            }
        }
    }
})();