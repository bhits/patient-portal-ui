
'use strict';

(function () {
    /**
     * Manages the home page
     */
    angular.module("app.home")
        .controller('HomeController',HomeController);

    /**
     * The home controller
     *
     * @param {Object} $scope - The Angularjs scope
     */

    /* @ngInject */
    function HomeController($scope, utilityService){
        var homeVm = this;
    }
})();