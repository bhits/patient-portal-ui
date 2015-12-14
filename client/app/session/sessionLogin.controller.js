
'use strict';

(function () {

    /**
     * Responsible for user login using the AuthenticationService
     */
    angular.module("app.session")
        .controller('LoginController', LoginController);
        /**
         * The Login Controller.
         * @ngInject
         */
        function LoginController($scope, $state, Idle, ENVService) {
            var loginVm = this;
            loginVm.version = ENVService.version;

            $scope.$on('oauth:authorized', function (event, token) {
                Idle.watch();
                $state.go('fe.index.home');
            });
        }
})();