
'use strict';

(function () {

    angular
        .module("app.security")
            .controller('LoginController', LoginController);
            /* @ngInject */
            function LoginController($scope, $state, Idle, envService) {
                var vm = this;
                vm.version = envService.version;

                $scope.$on('oauth:authorized', function (event, token) {
                    Idle.watch();
                    $state.go('fe.index.home');
                });
            }
})();