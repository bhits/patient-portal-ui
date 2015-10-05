/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerDirectives", [])

    .directive('providerLookupResult', ['$location', '$anchorScroll',function ($location, $anchorScroll) {
        return {
            restrict: 'E',
            scope: {
                providerLookupResult: '='
            },
            templateUrl: 'app/provider/tmpl/provider-lookup-result.tpl.html',
            controller: ['$scope', function($scope){
                $location.hash('provider_lookup_result');
                $anchorScroll();
            }]
        };
    }])

    .directive('providerLookupSearch',function(){
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/provider/tmpl/provider-lookup-search.tpl.html',
            controller: ['$scope','$location','ProviderService',
                function ($scope, $location,ProviderService) {

                    $scope.showSearch = true;

                    $scope.lookupProvider = function (pageNumber) {
                        $location.hash('');
                        delete $scope.providerLookupResult;
                        console.log($scope);
                        $scope.showSearch = false;
                        var queryParameters = $scope.plsQueryParameters;
                        console.log(queryParameters);
                        ProviderService.lookupProviders(queryParameters).get({pageNumber: pageNumber},
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

                }]
        };

    })

;