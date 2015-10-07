/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerDirectives", [])

    .directive('providerLookupResult', ['$location', '$anchorScroll', '$timeout', 'ProviderService', function ($location, $anchorScroll, $timeout, ProviderService) {
        return {
            restrict: 'E',
            scope: {
                providerLookupResult: '=',
                queryParameters: '='
            },
            templateUrl: 'app/provider/tmpl/provider-lookup-result.tpl.html',
            controller: ['$scope', function ($scope) {
                $scope.totalItems = $scope.providerLookupResult.totalNumberOfProviders;
                $scope.currentPage = $scope.providerLookupResult.currentPage + 1;

                $timeout(function () {
                    $location.hash('provider_lookup_result');
                    $anchorScroll();
                }, 200);

                $scope.loadPage = function (page) {
                    $scope.currentPage = page;
                    ProviderService.lookupProviders($scope.queryParameters, $scope.currentPage - 1,
                        function (response) {
                            $scope.providerLookupResult = response;
                        },
                        function (response) {
                            delete $scope.providerLookupResult;
                        }
                    );
                };

                $scope.isEmptyResult = function () {
                    return ProviderService.isEmptyLookupResult($scope.providerLookupResult);
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
            controller: ['$scope', '$location', '$element', '$timeout', 'ProviderService',
                function ($scope, $location, $element, $timeout, ProviderService) {

                    $scope.showSearch = true;

                    function collapseSearchAccordion() {
                        var ibox = $element.find('div.ibox');
                        var icon = $element.find('i:first');
                        var content = ibox.find('div.ibox-content');
                        content.slideToggle(200);
                        // Toggle icon from up to down
                        icon.toggleClass('fa-chevron-up').toggleClass('fa-chevron-down');
                        ibox.toggleClass('').toggleClass('border-bottom');
                        $timeout(function () {
                            ibox.resize();
                            ibox.find('[id^=map-]').resize();
                        }, 50);
                    }

                    $scope.lookupProvider = function (pageNumber) {
                        $location.hash('');
                        delete $scope.providerLookupResult;
                        $scope.showSearch = false;
                        var queryParameters = $scope.plsQueryParameters;
                        ProviderService.lookupProviders(queryParameters, pageNumber,
                            function (response) {
                                if (!ProviderService.isEmptyLookupResult(response)) {
                                    collapseSearchAccordion();
                                }
                                $scope.providerLookupResult = response;
                            },
                            function (response) {
                                delete $scope.providerLookupResult;
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