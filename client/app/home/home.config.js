

(function () {

    'use strict';

    angular
        .module('app.home')
            .config(homeConfig);

            /* @ngInject */
            function homeConfig($stateProvider){

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
                        templateUrl: 'app/home/home.html',
                        data: { pageTitle: 'Home' }
                    });
            }

})();