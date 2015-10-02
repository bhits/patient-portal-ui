'use strict';

/**
 * Responsible for user login using the AuthenticationService
 * .
 *
 */
angular.module("app.accessModule", ['app.authenticationModule', 'ngIdle', 'app.config', 'app.servicesModule'])

.config(['$stateProvider', function ($stateProvider) {

    $stateProvider
           .state('login', {
               url: "/login",
               data: { pageTitle: 'Login' },
               templateUrl: "app/access/tmpl/login.tpl.html",
               controller: 'LoginController'
           });
    }
])

/**
 * The Login Controller.
 *
 * @param {Object} $scope - The Angularjs scope
 * @param {Object} $state - The ui-router state service
 * @param {Object} AuthenticationService - The authentication service
 * @param {Object} Idle - The ngIdle service
 *
  */
.controller('LoginController', ['$scope', '$state', 'AuthenticationService', 'Idle','ENVService', 'utilityService', function ($scope, $state, AuthenticationService, Idle, ENVService, utilityService) {
    // The login object
    $scope.loginData = {userName: "", password: ""};

    $scope.version = ENVService.version;
    /**
     * Login user using the AuthenticationService.
     * On success starts ngIdle and redirects to home screen.
     */
    $scope.login = function () {
        AuthenticationService.login($scope.loginData).then(function (response) {

                if(angular.isDefined(response.Error) && response.Error !== null ){
                    $scope.message = "Invalid username and/or password." ;
                }else{
                    Idle.watch();
                    $state.go('index.home');
                }
        },
         function (err) {
             $scope.message = "Invalid username and/or password." ;
         });
    };

    $scope.scrollTo = function(scrollToId){
        utilityService.scrollTo(scrollToId);
    };

}]);