/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function(){
    'use strict';
    /**
     *  The list Provider Controllers
     *
     * @param $scope - the scope object.
     * @param providers - The list of resolved providers
     * @param $modal - The ui-bootstrap moda; service.
     * @param ProviderService - The provider service.
     * @param notificationService - The notification service for the toast message.
     * @param $state - The ui-router state service.
     */
    function ProviderListController ($scope, providers, $modal, ProviderService, notificationService, $state){
        var providerListCtrlVm = this;

        // The list of providers from the backend service
        providerListCtrlVm.providers = providers;

        /**
         * The controller for the delete provider modal.
         *
         * @param $scope - The modal scope
         * @param $modalInstance - modal instance
         * @param provider - The passed provider instance to be deleted
         *
         */

        function DeleteProviderModalController ($scope, $modalInstance, provider, notificationService, $state) {
            $scope.npi = provider.npi;
            $scope.provider = provider;

            $scope.ok = function () {
                ProviderService.deleteProvider($scope.npi,
                    function(data){
                        $state.go($state.current, {}, {reload: true});
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
        providerListCtrlVm.openDeleteProviderModal = function (provider, size) {
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
    }

    /**
     *  The resolve ogject to resolve the list of providers
     *
     */
    ProviderListController.resolve = {
        providers: ['ProviderService', '$q', '$log', 'utilityService', function (ProviderService, $q, $log, utilityService) {

            var deferred = $q.defer();

            var providerResource = ProviderService.getProvidersResource();
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
    };

    /**
     *  The configuration function for the provider module.
     * @param $stateProvider
     * @constructor
     */

    function ProviderConfig ($stateProvider){
        $stateProvider
            .state('fe.provider', {
                abstract: true,
                url: '/provider',
                data: { pageTitle: 'Provider' },
                templateUrl: 'common/tmpl/content.tpl.html'
            })
            .state('fe.provider.lookup', {
                url: '/lookup',
                data: { pageTitle: 'Provider lookup' },
                templateUrl: 'app/provider/tmpl/provider-lookup.tpl.html'
            })
            .state('fe.provider.list', {
                url: '/list',
                data: {pageTitle: 'Provider List'},
                templateUrl: 'app/provider/tmpl/provider-list.tpl.html',
                controller: 'ProviderListController',
                controllerAs: 'ProviderListVm',
                resolve: ProviderListController.resolve
            });

    }

    /**
     *  The provider controller module.
     *
     */
    angular.module("app.providerModule",
        [
            'app.providerService',
            'app.providerDirectives',
            'app.providerFiltersModule',
            'app.filtersModule',
            'app.core'
        ])
        .config(ProviderConfig)
        .controller('ProviderListController',ProviderListController);
})();