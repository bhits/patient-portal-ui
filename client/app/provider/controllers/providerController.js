/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';


angular.module("app.providerModule", [ 'app.providerService', 'app.providerDirectives'])

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

    .controller('ProviderListController', ['$scope','ProviderService','$modal', function ($scope, ProviderService, $modal) {
        // The list of providers from the backend service
        $scope.providers = ProviderService.getProviders();

        /**
         *  Opens the confirm delete modal
         *
         * @param size - The size of the modal
         */
        $scope.openDeleteProviderModal = function (size) {
            var modalInstance = $modal.open({
                templateUrl: 'app/provider/tmpl/provider-delete-modal.tpl.html',
                size: size,
                controller: ['$scope','$modalInstance', function ($scope, $modalInstance) {

                    $scope.ok = function (npi) {
                        ProviderService.deleteProvider(npi);
                        $modalInstance.close();
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }]
            });
        };
    }])

    .controller('ProviderLookupController', ['$scope',
        function ($scope) {

        }])
;