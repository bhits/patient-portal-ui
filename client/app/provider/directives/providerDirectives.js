/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerDirectives", [])

    .directive('providerLookupResult', ['$timeout', 'utilityService', 'ProviderService', function ($timeout, utilityService, ProviderService) {
        return {
            restrict: 'E',
            scope: {
                providerLookupResult: '=',
                queryParameters: '='
            },
            templateUrl: 'app/provider/tmpl/provider-lookup-result.tpl.html',
            controller: ['$scope', function ($scope) {
                $scope.pagination = {};
                $scope.pagination.totalItems = $scope.providerLookupResult.totalNumberOfProviders;
                $scope.pagination.currentPage = $scope.providerLookupResult.currentPage + 1;
                $scope.pagination.maxSize = 10;

                function scrollToSearchResults() {
                    utilityService.scrollTo('provider_lookup_result');
                }

                $timeout(scrollToSearchResults, 200);

                $scope.loadPage = function () {
                    ProviderService.lookupProviders($scope.queryParameters, $scope.pagination.currentPage - 1,
                        function (response) {
                            $scope.providerLookupResult = response;
                            $scope.pagination.totalItems = $scope.providerLookupResult.totalNumberOfProviders;
                            scrollToSearchResults();
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
            controller: ['$scope', '$location', '$element', '$timeout', '$state', 'ProviderService',

                function ($scope, $location, $element, $timeout, $state, ProviderService) {

                    $scope.formMinlength = 2;
                    $scope.formMaxlength = 10;
                    $scope.firstPage = 0;

                    var plsQueryParametersMaster = {
                        usstate: "",
                        city: "",
                        zipcode: "",
                        lastname: "",
                        firstname: "",
                        gender: "",
                        phone: "",
                        facilityname: ""
                    };

                    $scope.plsQueryParameters = angular.copy(plsQueryParametersMaster);

                    $scope.$watch('plsQueryParameters.usstate', function (newValue) {
                        if (!newValue) {
                            if ($scope.plsQueryParameters && $scope.plsQueryParameters.city) {
                                $scope.plsQueryParameters.city = "";
                            }
                        }
                    });

                    $scope.$watch('plsQueryParameters.lastname', function (newValue) {
                        if (!newValue) {
                            if ($scope.plsQueryParameters && $scope.plsQueryParameters.firstname) {
                                $scope.plsQueryParameters.firstname = "";
                            }
                            if ($scope.plsQueryParameters && $scope.plsQueryParameters.gender) {
                                $scope.plsQueryParameters.gender = "";
                            }
                            if ($scope.plsQueryParameters && $scope.plsQueryParameters.phone) {
                                $scope.plsQueryParameters.phone = "";
                            }
                        }
                    });

                    $scope.$watch('plsQueryParameters.facilityname', function (newValue) {
                        if (!newValue) {
                            if ($scope.plsQueryParameters && $scope.plsQueryParameters.phone) {
                                $scope.plsQueryParameters.phone = "";
                            }
                        }
                    });

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

                    $scope.paginationSummary = function () {
                        var rangeStart = ($scope.providerLookupResult.currentPage * $scope.providerLookupResult.itemsPerPage + 1);
                        var rangeEnd = (Math.min(($scope.providerLookupResult.totalNumberOfProviders), ($scope.providerLookupResult.currentPage * $scope.providerLookupResult.itemsPerPage + $scope.providerLookupResult.itemsPerPage)));
                        var total = ($scope.providerLookupResult.totalNumberOfProviders);
                        var summary = 'Showing '.concat(rangeStart, ' to ', rangeEnd, ' of ', total, ' entries');
                        return summary;
                    };

                    $scope.reset = function () {
                        if ($scope.providerSearchForm) {
                            $scope.providerSearchForm.$setPristine();
                            $scope.providerSearchForm.$setUntouched();
                            $scope.plsQueryParameters = angular.copy(plsQueryParametersMaster);
                        }
                    };
                }]
        };

    })
;