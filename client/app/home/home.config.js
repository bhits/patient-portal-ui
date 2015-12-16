
'use strict';

(function () {

    /**
     * @name home config
     */
    angular
        .module('app.home')
            .config(HomeConfig);

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
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.index.home', {
                        url: '/home',
                        templateUrl: 'app/home/home.tpl.html',
                        data: { pageTitle: 'Home' }
                    });
            }

})();