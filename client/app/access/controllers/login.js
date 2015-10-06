(function () {

    'use strict';

    function config($stateProvider){
            $stateProvider
                .state('login', {
                    url: "/login",
                    data: { pageTitle: 'Login' },
                    templateUrl: "app/access/tmpl/login.tpl.html",
                    controllerAs: "loginVm",
                    controller: 'LoginController'
                });
        }


    /**
     * The Login Controller.
     *
     * @param {Object} $scope - The Angularjs scope
     * @param {Object} $state - The ui-router state service
     * @param {Object} AuthenticationService - The authentication service
     * @param {Object} Idle - The ngIdle service
     *
     */


    function LoginController($scope, $state, AuthenticationService, Idle, ENVService, utilityService) {
        var loginVm = this;

        // The login object
        loginVm.loginData = {userName: "", password: ""};

        loginVm.version = ENVService.version;
        /**
         * Login user using the AuthenticationService.
         * On success starts ngIdle and redirects to home screen.
         */
        loginVm.login = function () {
            AuthenticationService.login(loginVm.loginData).then(function (response) {

                    if(angular.isDefined(response.Error) && response.Error !== null ){
                        loginVm.message = "Invalid username and/or password." ;
                    }else{
                        Idle.watch();
                        $state.go('index.home');
                    }
                },
                function (err) {
                    loginVm.message = "Invalid username and/or password." ;
                });
        };

        loginVm.scrollTo = function(scrollToId){
            utilityService.scrollTo(scrollToId);
        };
    }

    /**
     * Responsible for user login using the AuthenticationService
     */
    angular.module("app.accessModule",
        [
            'app.authenticationModule',
            'ngIdle',
            'app.config',
            'app.servicesModule'
        ])
        .config(config)
        .controller('LoginController',LoginController);

})();