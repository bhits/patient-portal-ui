/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

angular.module("app.providerDirectives", ['app.providerFiltersModule'])

    .directive('providerLookupResult', ['$timeout', '$state', 'utilityService', 'ProviderService', function ($timeout, $state, utilityService, ProviderService) {
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

                $scope.addProvider = function (npi) {
                    function success() {
                        $state.go('provider.list');
                    }

                    function error(err) {
                    }

                    ProviderService.addProvider(npi, success, error);
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