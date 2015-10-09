/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';


angular.module("app.providerModule", [ 'app.providerService', 'app.providerDirectives', 'ngMessages', 'app.notificationModule'])

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

    .controller('ProviderListController', ['$scope','providers','$modal','ProviderService','notificationService', function ($scope, providers, $modal, ProviderService, notificationService) {
        // The list of providers from the backend service
        //$scope.providers = providers;
        $scope.providers = [];

        /**
         * The controller for the delete provider modal.
         *
         * @param $scope - The modal scope
         * @param $modalInstance - modal instance
         * @param provider - The passed provider instance to be deleted
         *
         * @constructor
         */
        function DeleteProviderModalController ($scope, $modalInstance, provider, notificationService) {
            $scope.npi = provider.npi;
            $scope.provider = provider;

            $scope.ok = function () {
                notificationService.success('Success in deleting provider');
                ProviderService.deleteProvider($scope.npi,
                    function(data){
                        notificationService.success('Success in deleting provider');

                    },
                    function(data){
                        notificationService.error('Error in deleting provider');
                    }
                );
                $modalInstance.close();
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };
        }

        /**
         * Opens the confirm delete modal
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
                controller: DeleteProviderModalController
            });
        };
    }])
;