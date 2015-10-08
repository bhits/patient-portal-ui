/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';


angular.module("app.providerModule", [ 'app.providerService', 'app.providerDirectives',  'ngMessages'])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('provider', {
                abstract: true,
                url: '/provider',
                data: { pageTitle: 'Provider' },
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('provider.list', {
                url: '/list',
                data: {pageTitle: 'Provider List'},
                templateUrl: 'app/provider/tmpl/provider-list.tpl.html',
                controller: 'ProviderListController',
                resolve: {
                    providers: ['ProviderService', '$q', '$log', 'utilityService', function (ProviderService, $q, $log, utilityService) {

                        var deferred = $q.defer();

                        var providerResource = ProviderService.getProviders();
                        var providersData = providerResource.query(
                            function (response) {
                                return response;
                            },
                            function (response) {
                                return response;
                            });

                        providersData.$promise.then(function(response) {
                            deferred.resolve(response);
                        });

                        return deferred.promise;
                    }]
                }
            })
            .state('provider.lookup', {
                url: '/lookup',
                data: { pageTitle: 'Provider lookup' },
                templateUrl: 'app/provider/tmpl/provider-lookup.tpl.html'
            }) ;
    }
    ])

    .controller('ProviderListController', ['$scope','providers','$modal','ProviderService', function ($scope, providers, $modal, ProviderService) {
        // The list of providers from the backend service
        $scope.providers = providers;

        /**
         *  Opens the confirm delete modal
         *
         * @param size - The size of the modal
         */
        $scope.openDeleteProviderModal = function (provider, size) {
            var modalInstance = $modal.open({
                templateUrl: 'app/provider/tmpl/provider-delete-modal.tpl.html',
                size: size,
                resolve: {
                    provider: function () {
                        return provider;
                    }
                },
                controller: ['$scope','$modalInstance', 'provider', function ($scope, $modalInstance, provider) {
                    $scope.npi = provider.npi;
                    $scope.provider = provider;
                    $scope.ok = function () {
                        ProviderService.deleteProvider($scope.npi,
                            function(data){

                            },
                            function(data){

                            }
                        );
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
    }])
;