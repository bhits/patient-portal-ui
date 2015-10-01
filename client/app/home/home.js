'use strict';

/**
 * Manages the home page
 */
angular.module("app.homeModule", ['app.servicesModule'])

.config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('index', {
                    abstract: true,
                    url: '/index',
                    data: { pageTitle: 'Home' },
                    templateUrl: 'app/common/content.tpl.html'
                })
                .state('index.home', {
                    url: '/home',
                    templateUrl: 'app/home/home.tpl.html',
                    data: { pageTitle: 'Home' },
                    controller: 'HomeController'
                });
        }
])
/**
 * The home controller
 * @param {Object} $scope - The Angularjs scope
 */
.controller('HomeController', ['$scope','utilityService', function($scope, utilityService){
    $scope.scrollTo = function(scrollToId){
        utilityService.scrollTo(scrollToId);
    };
}]);