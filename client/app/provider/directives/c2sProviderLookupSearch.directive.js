/**
 * Created by tomson.ngassa on 12/28/2015.
 */

(function () {
    'use strict';

    angular
        .module("app.provider")
        .directive('c2sProviderLookupSearch', c2sProviderLookupSearch);

    /* @ngInject */
    function c2sProviderLookupSearch() {
        var directive = {
            restrict: 'E',
            scope: {},
            templateUrl: 'app/provider/directives/providerLookupSearch.html',
            controller: ProviderLookupSearchController,
            controllerAs: 'providerLookupSearchVm'
        };

        return directive;

        /* @ngInject */
        function ProviderLookupSearchController($location, $element, $timeout, utilityService, providerService, notificationService) {
            var vm = this;
            vm.formMinlength = 2;
            vm.formMaxlength = 30;
            vm.firstPage = 1;

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

            vm.plsQueryParameters = angular.copy(plsQueryParametersMaster);
            vm.usstateChanged = usstateChanged;
            vm.lastnameChanged = lastnameChanged;
            vm.facilitynameChanged = facilitynameChanged;
            vm.lookupProvider = lookupProvider;
            vm.reset = reset;
            vm.formViewValue = formViewValue;

            function usstateChanged() {
                if (!utilityService.hasString(vm.plsQueryParameters.usstate)) {
                    vm.plsQueryParameters.city = "";
                }
            }

            function lastnameChanged() {
                if (!utilityService.hasString(vm.plsQueryParameters.lastname)) {
                    vm.plsQueryParameters.firstname = "";
                    vm.plsQueryParameters.gender = "";
                    vm.plsQueryParameters.phone = "";
                }
            }

            function facilitynameChanged() {
                if (!utilityService.hasString(vm.plsQueryParameters.facilityname)) {
                    vm.plsQueryParameters.phone = "";
                }
            }

            function lookupProvider(pageNumber) {
                $location.hash('');
                vm.providerLookupResult = null;
                var queryParameters = vm.plsQueryParameters;
                providerService.lookupProviders(queryParameters, pageNumber,
                    function (response) {
                        if (!providerService.isEmptyLookupResult(response)) {
                            collapseSearchAccordion();
                            vm.providerLookupResult = providerService.getLookupResult(response);
                        } else {
                            notificationService.info('Sorry, no results found.');
                        }
                    },
                    function (response) {
                        notificationService.error('Failed to lookup providers, please try again later...');
                    }
                );
            }

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

            function reset(providerSearchForm) {
                if (providerSearchForm) {
                    providerSearchForm.$setPristine();
                    providerSearchForm.$setUntouched();
                    vm.plsQueryParameters = angular.copy(plsQueryParametersMaster);
                }
            }

            function formViewValue(form, fieldName) {
                return form[fieldName].$viewValue;
            }
        }
    }
}());