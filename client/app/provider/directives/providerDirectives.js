/**
 * Created by tomson.ngassa on 9/30/2015.
 */


(function () {

    'use strict';

    function ProviderLookupResult() {
        return {
            restrict: 'E',
            scope: {
                providerLookupResult: '=',
                queryParameters: '='
            },
            templateUrl: 'app/provider/tmpl/provider-lookup-result.tpl.html',
            controllerAs: 'ProviderLookupResultVm',
            bindToController: true,
            controller: ['$timeout', '$state', 'utilityService', 'ProviderService', 'notificationService', function ($timeout, $state, utilityService, ProviderService, notificationService) {
                var ProviderLookupResultVm = this;
                ProviderLookupResultVm.pagination = {
                    totalItems: ProviderLookupResultVm.providerLookupResult.totalNumberOfProviders,
                    currentPage: ProviderLookupResultVm.providerLookupResult.currentPage,
                    itemsPerPage: ProviderLookupResultVm.providerLookupResult.itemsPerPage,
                    maxSize: 10
                };
                var oldPage = ProviderLookupResultVm.pagination.currentPage;

                function scrollToSearchResults() {
                    utilityService.scrollTo('provider_lookup_result');
                }

                function getCurrentProviderList() {
                    return ProviderService.getProvidersResource().query(angular.identity, angular.identity);
                }

                ProviderLookupResultVm.providersData = getCurrentProviderList();

                $timeout(scrollToSearchResults, 200);

                ProviderLookupResultVm.isProviderAlreadyAdded = function (npi) {
                    return ProviderService.hasNpi(ProviderLookupResultVm.providersData, npi);
                };

                ProviderLookupResultVm.loadPage = function () {
                    var newPage = ProviderLookupResultVm.pagination.currentPage;
                    ProviderLookupResultVm.pagination.currentPage = oldPage;

                    function loadPageSuccess(response) {
                        oldPage = newPage;
                        ProviderLookupResultVm.pagination.currentPage = newPage;
                        ProviderLookupResultVm.providerLookupResult = response;
                        ProviderLookupResultVm.pagination.totalItems = ProviderLookupResultVm.providerLookupResult.totalNumberOfProviders;
                        ProviderLookupResultVm.pagination.itemsPerPage = ProviderLookupResultVm.providerLookupResult.itemsPerPage;
                        ProviderLookupResultVm.providersData = getCurrentProviderList();
                        scrollToSearchResults();
                    }

                    function loadPageError(response) {
                        notificationService.error("Failed to load the page, please try again later...");
                    }

                    ProviderService.lookupProviders(ProviderLookupResultVm.queryParameters, newPage, loadPageSuccess, loadPageError);
                };

                ProviderLookupResultVm.isEmptyResult = function () {
                    return ProviderService.isEmptyLookupResult(ProviderLookupResultVm.providerLookupResult);
                };

                ProviderLookupResultVm.addProvider = function (npi) {
                    function addProviderSuccess() {
                        $state.go('fe.provider.list');
                    }

                    function addProviderError(err) {
                        notificationService.error("Failed to add the provider, please try again later...");
                    }

                    ProviderService.addProvider(npi, addProviderSuccess, addProviderError);
                };

                ProviderLookupResultVm.paginationSummary = function () {
                    var rangeStart = (ProviderLookupResultVm.providerLookupResult.currentPage * ProviderLookupResultVm.providerLookupResult.itemsPerPage + 1);
                    var rangeEnd = (Math.min((ProviderLookupResultVm.providerLookupResult.totalNumberOfProviders), (ProviderLookupResultVm.providerLookupResult.currentPage * ProviderLookupResultVm.providerLookupResult.itemsPerPage + ProviderLookupResultVm.providerLookupResult.itemsPerPage)));
                    var total = (ProviderLookupResultVm.providerLookupResult.totalNumberOfProviders);
                    var summary = 'Showing '.concat(rangeStart, ' to ', rangeEnd, ' of ', total, ' entries');
                    return summary;
                };

            }]
        };
    }

    function ProviderLookupSearch() {
        return {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/provider/tmpl/provider-lookup-search.tpl.html',
            controllerAs: 'ProviderLookupSearchVm',
            bindToController: true,
            controller: ['$location', '$element', '$timeout', '$state', 'utilityService', 'ProviderService', 'notificationService',
                function ($location, $element, $timeout, $state, utilityService, ProviderService, notificationService) {
                    var ProviderLookupSearchVm = this;
                    ProviderLookupSearchVm.formMinlength = 2;
                    ProviderLookupSearchVm.formMaxlength = 30;
                    ProviderLookupSearchVm.firstPage = 1;

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

                    ProviderLookupSearchVm.plsQueryParameters = angular.copy(plsQueryParametersMaster);

                    ProviderLookupSearchVm.usstateChanged = function () {
                        if (!utilityService.hasString(ProviderLookupSearchVm.plsQueryParameters.usstate)) {
                            ProviderLookupSearchVm.plsQueryParameters.city = "";
                        }
                    };

                    ProviderLookupSearchVm.lastnameChanged = function () {
                        if (!utilityService.hasString(ProviderLookupSearchVm.plsQueryParameters.lastname)) {
                            ProviderLookupSearchVm.plsQueryParameters.firstname = "";
                            ProviderLookupSearchVm.plsQueryParameters.gender = "";
                            ProviderLookupSearchVm.plsQueryParameters.phone = "";
                        }
                    };

                    ProviderLookupSearchVm.facilitynameChanged = function () {
                        if (!utilityService.hasString(ProviderLookupSearchVm.plsQueryParameters.facilityname)) {
                            ProviderLookupSearchVm.plsQueryParameters.phone = "";
                        }
                    };

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

                    ProviderLookupSearchVm.lookupProvider = function (pageNumber) {
                        $location.hash('');
                        ProviderLookupSearchVm.providerLookupResult = null;
                        var queryParameters = ProviderLookupSearchVm.plsQueryParameters;
                        ProviderService.lookupProviders(queryParameters, pageNumber,
                            function (response) {
                                if (!ProviderService.isEmptyLookupResult(response)) {
                                    collapseSearchAccordion();
                                    ProviderLookupSearchVm.providerLookupResult = response;
                                } else {
                                    notificationService.info('Sorry, no results found.');
                                }

                            },
                            function (response) {
                                notificationService.error('Failed to lookup providers, please try again later...');
                            }
                        );
                    };

                    ProviderLookupSearchVm.reset = function (providerSearchForm) {
                        if (providerSearchForm) {
                            providerSearchForm.$setPristine();
                            providerSearchForm.$setUntouched();
                            ProviderLookupSearchVm.plsQueryParameters = angular.copy(plsQueryParametersMaster);
                        }
                    };

                    ProviderLookupSearchVm.formViewValue = function (form, fieldName) {
                        return form[fieldName].$viewValue;
                    };
                }]
        };
    }

    angular
        .module("app.providerDirectives",
            [
            'app.core',
            'app.providerFiltersModule'
            ])
            .directive('providerLookupResult', ProviderLookupResult)
            .directive('providerLookupSearch', ProviderLookupSearch);
})();
