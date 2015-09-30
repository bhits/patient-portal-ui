/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';



angular.module("app.providerModule", ['ui.router', 'app.providerService', 'app.providerDirectives'])

    .config(['$stateProvider', function ($stateProvider) {
            $stateProvider
                .state('provider', {
                    abstract: true,
                    url: '/provider',
                    data: { pageTitle: 'Provider' },
                    templateUrl: 'app/common/content.tpl.html'
                })
                .state('provider.list', {
                    url: '/list',
                    data: { pageTitle: 'Provider List' },
                    templateUrl: 'app/provider/tmpl/provider-list.tpl.html',
                    controller: 'ProviderListController'
                })
                .state('provider.lookup', {
                    url: '/lookup',
                    data: { pageTitle: 'Provider lookup' },
                    templateUrl: 'app/provider/tmpl/provider-lookup.tpl.html',
                    controller: 'ProviderLookupController'
                }) ;
         }
    ])

    .controller('ProviderListController', ['$scope','ProviderService', function ($scope, ProviderService) {
        $scope.providers = ProviderService.getProviders();

    }])

    .controller('ProviderLookupController', ['$scope','ProviderService',
        function ($scope, ProviderService) {

    }]);