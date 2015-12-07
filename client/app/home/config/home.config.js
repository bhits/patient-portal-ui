
'use strict';

(function () {

    angular
        .module('app.home')
        .config(HomeConfig);

    /**
     * Home config function
     *
     * @param $stateProvider
     */

    /* @ngInject */
    function HomeConfig($stateProvider){

        $stateProvider
            .state('fe', {
                abstract: true,
                data: { pageTitle: 'Patient Portal' },
                url: '/fe',
                templateUrl: ''
            })
            .state('fe.index', {
                abstract: true,
                url: '/index',
                data: { pageTitle: 'Home' },
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('fe.index.home', {
                url: '/home',
                templateUrl: 'app/home/config/home.tpl.html',
                data: { pageTitle: 'Home' },
                controllerAs: "HomeVm",
                controller: 'HomeController'
            });
    }

})();