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
                data: {pageTitle: 'Provider'},
                templateUrl: 'app/common/content.tpl.html'
            })
            .state('provider.list', {
                url: '/list',
                params: {scrollTo: null, expand: null},
                data: {pageTitle: 'Provider List'},
                templateUrl: 'app/provider/tmpl/provider-list.tpl.html',
                controller: 'ProviderListController'
            })
            .state('provider.lookup', {
                url: '/lookup',
                params: {scrollTo: null, expand: null},
                data: {pageTitle: 'Provider lookup'},
                templateUrl: 'app/provider/tmpl/provider-lookup.tpl.html',
                controller: 'ProviderLookupController'
            });
    }
    ])

    .controller('ProviderListController', ['$scope', 'ProviderService',
        function ($scope, ProviderService) {

        }])

    .controller('ProviderLookupController', ['$scope', 'ProviderService',
        function ($scope, ProviderService) {

            $scope.showSearch = true;

            $scope.lookupProvider = function (pageNumber) {
                $scope.showSearch = false;
                var queryParameters = $scope.plsQueryParameters;
                queryParameters.phone = queryParameters.phone1 + queryParameters.phone2 + queryParameters.phone3;
                console.log(queryParameters);
                ProviderService.getProviders(queryParameters).get({pageNumber: pageNumber},
                    function (response) {
                        console.log("SUCCESS:");
                        console.log(response);
                        $scope.providerLookupResult = response;
                        console.log($scope.paginationSummary);
                    },
                    function (response) {
                        console.log("ERROR:");
                        console.log(response);
                    }
                );
            };

            $scope.getTotalPageNumber = function (totalPages) {
                return new Array(totalPages);
            };

            $scope.paginationSummary = function () {
                var rangeStart = ($scope.providerLookupResult.currentPage * $scope.providerLookupResult.itemsPerPage + 1);
                var rangeEnd = (Math.min(($scope.providerLookupResult.totalNumberOfProviders), ($scope.providerLookupResult.currentPage * $scope.providerLookupResult.itemsPerPage + $scope.providerLookupResult.itemsPerPage)));
                var total = ($scope.providerLookupResult.totalNumberOfProviders);
                var summary = 'Showing '.concat(rangeStart, ' to ', rangeEnd, ' of ', total, ' entries');
                return summary;
            };

        }]);