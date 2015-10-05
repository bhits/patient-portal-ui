/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerDirectives", [])

    .directive('providerLookupResult', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: 'E',
            scope: {
                providerLookupResult: '='
            },
            templateUrl: 'app/provider/tmpl/provider-lookup-result.tpl.html',
            controller: ['$scope', function ($scope) {
                console.log("providerLookupResult directive controller:");
                console.log($scope);
                $location.hash('provider_lookup_result');
                $anchorScroll();

                $scope.isEmptyResult = function () {
                    var isEmpty = !$scope.providerLookupResult || !$scope.providerLookupResult.providers || $scope.providerLookupResult.providers.length === 0;
                    console.log("isEmpty:" + isEmpty);
                    return isEmpty;
                };

                $scope.getProviderName = function (provider) {
                    var providerName = '';
                    if (provider && provider.entityType === 'Organization') {
                        providerName = provider.providerOrganizationName;
                    } else if (provider && provider.entityType === 'Individual') {
                        providerName = provider.providerLastName + ', ' + provider.providerFirstName + (provider.providerMiddleName ? ' ' + provider.providerMiddleName : '');
                    }
                    return providerName;
                };

                $scope.formatPhoneNumber = function (phoneNumber) {
                    return phoneNumber.slice(0, 3) + "-" + phoneNumber.slice(3, 6) + "-" + phoneNumber.slice(6, 10) + (phoneNumber.length > 10 ? '-' + phoneNumber.slice(10) : '');
                };

                $scope.getProviderAddressAsArray = function (provider) {
                    function formatZipCode(zipCode) {
                        var formattedZipCode = zipCode;
                        if (typeof zipCode === 'string' && zipCode.length > 5) {
                            formattedZipCode = zipCode.slice(0, 5) + "-" + zipCode.slice(5);
                        }
                        return formattedZipCode;
                    }

                    var providerAddressArray = [provider.providerFirstLineBusinessPracticeLocationAddress,
                        provider.providerSecondLineBusinessPracticeLocationAddress,
                        provider.providerBusinessPracticeLocationAddressCityName,
                        provider.providerBusinessPracticeLocationAddressStateName,
                        formatZipCode(provider.providerBusinessPracticeLocationAddressPostalCode)].filter(function (element) {
                            return typeof element === 'string' && element.length > 0;
                        });
                    return providerAddressArray.join(", ");

                };
            }]
        };
    }])

    .directive('providerLookupSearch', function () {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/provider/tmpl/provider-lookup-search.tpl.html',
            controller: ['$scope', '$location', 'ProviderService',
                function ($scope, $location, ProviderService) {

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