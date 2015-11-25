(function () {

    'use strict';

    function config($stateProvider) {
        $stateProvider
            .state('fe.login', {
                url: "/login",
                data: {pageTitle: 'Login'},
                templateUrl: "app/access/tmpl/login.tpl.html",
                controllerAs: "loginVm",
                controller: 'LoginController'
            });
    }


    /**
     * The Login Controller.
     *
     * @param {Object} $state - The ui-router state service
     * @param {Object} AuthenticationService - The authentication service
     * @param {Object} Idle - The ngIdle service
     *
     */


    function LoginController($scope, $state, Idle, ENVService) {
        var loginVm = this;
        loginVm.version = ENVService.version;

        $scope.$on('oauth:authorized', function (event, token) {
            Idle.watch();
            $state.go('fe.index.home');
        });
    }

    /**
     * Responsible for user login using the AuthenticationService
     */
    angular.module("app.accessModule",
        [
            'ngIdle',
            'app.config'
        ])
        .config(config)
        .controller('LoginController', LoginController);

})();