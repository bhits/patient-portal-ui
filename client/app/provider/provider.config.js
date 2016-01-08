/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module('app.provider')
            .config(providerConfig);

            /* @ngInject */
            function providerConfig ($stateProvider){
                $stateProvider
                    .state('fe.provider', {
                        abstract: true,
                        url: '/provider',
                        data: { pageTitle: 'Provider' },
                        templateUrl: 'app/layout/content.html'
                    })
                    .state('fe.provider.lookup', {
                        url: '/lookup',
                        data: { pageTitle: 'Provider lookup' },
                        templateUrl: 'app/provider/controllers/provider-lookup.html'
                    })
                    .state('fe.provider.list', {
                        url: '/list',
                        data: {pageTitle: 'Provider List'},
                        templateUrl: 'app/provider/controllers/provider-list.html',
                        controller: 'ProviderListController',
                        controllerAs: 'providerListVm',
                        resolve: {
                            /* @ngInject */
                            providers: function ($q, providerService, utilityService, notificationService) {
                                var deferred = $q.defer();
                                var providerResource = providerService.getProvidersResource();
                                var providersData = providerResource.query(
                                    function (response) {
                                        return response;
                                    },
                                    function (response) {
                                        notificationService.error('Error in getting list of provider.');
                                        return response;
                                    });

                                providersData.$promise.then(function (response) {
                                    deferred.resolve(response);
                                });
                                return deferred.promise;
                            }
                        }
                    });
            }
})();