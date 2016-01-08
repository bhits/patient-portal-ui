/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function(){
    'use strict';

    angular
        .module("app.provider")
            .directive('providerLookupResult', providerLookupResultDirective);

            /* @ngInject */
            function providerLookupResultDirective() {
                
                var directive = {
                    restrict: 'E',
                    templateUrl: 'app/provider/directives/provider-lookup-result.html',
                    bindToController: {
                        providerLookupResult: '=',
                        queryParameters: '='
                    },
                    scope: {},
                    controller: ProviderLookupResultController,
                    controllerAs: 'providerLookupResultVm'
                };
                return directive;
            }

             /* @ngInject */
            function ProviderLookupResultController($timeout, $state, utilityService, providerService, notificationService) {
                var vm = this;

                vm.pagination = {
                    totalItems: vm.providerLookupResult.totalNumberOfProviders,
                    currentPage: vm.providerLookupResult.currentPage,
                    itemsPerPage: vm.providerLookupResult.itemsPerPage,
                    maxSize: 10
                };
                var oldPage = vm.pagination.currentPage;
                vm.providersData = getCurrentProviderList();
                vm.isProviderAlreadyAdded = isProviderAlreadyAdded;
                $timeout(scrollToSearchResults, 200);
                vm.loadPage = loadPage;
                vm.isEmptyResult = isEmptyResult;
                vm.addProvider = addProvider;
                vm.paginationSummary = paginationSummary;

                function scrollToSearchResults() {
                    utilityService.scrollTo('provider_lookup_result');
                }
        
                function getCurrentProviderList() {
                    return providerService.getProvidersResource().query(angular.identity, angular.identity);
                }

                function isProviderAlreadyAdded (npi) {
                    return providerService.hasNpi(vm.providersData, npi);
                }

                function loadPage() {
                    var newPage = vm.pagination.currentPage;
                    vm.pagination.currentPage = oldPage;

                    function loadPageSuccess(response) {
                        oldPage = newPage;
                        vm.pagination.currentPage = newPage;
                        vm.providerLookupResult = response;
                        vm.pagination.totalItems = vm.providerLookupResult.totalNumberOfProviders;
                        vm.pagination.itemsPerPage = vm.providerLookupResult.itemsPerPage;
                        vm.providersData = getCurrentProviderList();
                        scrollToSearchResults();
                    }

                    providerService.lookupProviders(vm.queryParameters, newPage, loadPageSuccess, loadPageError);
                }

                function loadPageError(response) {
                    notificationService.error("Failed to load the page, please try again later...");
                }
        
                function isEmptyResult() {
                    return providerService.isEmptyLookupResult(vm.providerLookupResult);
                }

                function addProvider(npi) {
                    providerService.addProvider(npi, addProviderSuccess, addProviderError);
                }

                function addProviderSuccess() {
                    $state.go('fe.provider.list');
                }

                function addProviderError(err) {
                    notificationService.error("Failed to add the provider, please try again later...");
                }

                function paginationSummary() {
                    var rangeStart = (vm.providerLookupResult.currentPage * vm.providerLookupResult.itemsPerPage + 1);
                    var rangeEnd = (Math.min((vm.providerLookupResult.totalNumberOfProviders), (vm.providerLookupResult.currentPage * vm.providerLookupResult.itemsPerPage + vm.providerLookupResult.itemsPerPage)));
                    var total = (vm.providerLookupResult.totalNumberOfProviders);
                    var summary = 'Showing '.concat(rangeStart, ' to ', rangeEnd, ' of ', total, ' entries');
                    return summary;
                }
            }
}());