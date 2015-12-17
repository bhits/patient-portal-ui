
'use strict';

(function () {

    angular
        .module("app.security")
            .controller('LoginController', LoginController);
            /**
             * The Login Controller.
             * @ngInject
             */
            function LoginController($scope, $state, Idle, ENVService) {
                var vm = this;
                vm.version = ENVService.version;

                $scope.$on('oauth:authorized', function (event, token) {
                    Idle.watch();
                    $state.go('fe.index.home');
                });
            }
})();