(function () {
    'use strict';

    angular
        .module('app.consent')
        .directive('c2sConsentProviderSelect', c2sConsentProviderSelect);

    /* @ngInject */
    function c2sConsentProviderSelect() {
        var directive = {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/consent/directives/consentProviderSelect.html',
            scope: {}, // Isolated scope is required if you want to have multiple instances of the directives.
            bindToController: {
                modaltitle: "=",
                providers: "=",
                ngModel: '='
            },
            controllerAs: 'consentSelectProviderVm',
            controller: ConsentSelectProviderController
        };
        return directive;
    }

    /* @ngInject */
    function ConsentSelectProviderController($modal, consentService, notificationService) {
        var vm = this;
        vm.fieldplaceholder = vm.modaltitle === 'Authorize' ? "AUTHORIZE.TITLE_1" : "AUTHORIZE.TITLE_2";
        vm.openSelectProviderModal = openSelectProviderModal;
        vm.selectedProvider = vm.ngModel;

        function openSelectProviderModal() {

            var modalInstance = $modal.open({
                templateUrl: 'app/consent/directives/consentProviderSelectModal.html',
                resolve: {
                    data: function () {
                        return {
                            modalTitle: vm.modaltitle,
                            providers: vm.providers,
                            selectedProvider: vm.selectedProvider
                        };
                    }
                },
                controllerAs: 'selectProviderModalVm',
                controller: SelectProviderModalController
            });
        }

        /* @ngInject */
        function SelectProviderModalController($modalInstance, notificationService, data, utilityService, consentService) {
            var selectProviderModalVm = this;
            selectProviderModalVm.cancel = cancel;
            selectProviderModalVm.isOrganizationProvider = isOrganizationProvider;
            selectProviderModalVm.isIndividualProvider = isIndividualProvider;
            selectProviderModalVm.isSelected = isSelected;
            selectProviderModalVm.ok = ok;
            selectProviderModalVm.providers = data.providers;
            selectProviderModalVm.selectedProvider = {npi: ((data.selectedProvider !== null) && angular.isDefined(data.selectedProvider) && angular.isDefined(data.selectedProvider.npi)) ? data.selectedProvider.npi : ''};
            selectProviderModalVm.selectedNpi = consentService.getSelectedNpi();
            selectProviderModalVm.title = data.modalTitle;
            selectProviderModalVm.hasNoProviders = hasNoProviders;
            selectProviderModalVm.hasAtLeastTwoProviders = hasAtLeastTwoProviders;

            function hasNoProviders() {
                return !(angular.isDefined(selectProviderModalVm.providers) && selectProviderModalVm.providers.length > 0);
            }

            function hasAtLeastTwoProviders() {
                return !!(angular.isDefined(selectProviderModalVm.providers) && selectProviderModalVm.providers.length > 1);
            }

            function cancel() {
                $modalInstance.dismiss('cancel');
            }

            function isOrganizationProvider(provider) {
                return utilityService.isOrganizationProvider(provider);
            }

            function isIndividualProvider(provider) {
                return utilityService.isIndividualProvider(provider);
            }

            function isSelected(npi) {
                if (selectProviderModalVm.title === 'Authorize') {
                    return (selectProviderModalVm.selectedNpi.discloseNpi === npi);
                } else if (selectProviderModalVm.title === 'Disclosure') {
                    return (selectProviderModalVm.selectedNpi.authorizeNpi === npi);
                }
            }

            function ok() {
                $modalInstance.close();
                var selectedProvider = utilityService.getProviderByNPI(selectProviderModalVm.providers, selectProviderModalVm.selectedProvider.npi);
                vm.ngModel = selectedProvider;
                vm.selectedProvider = selectedProvider;

                if (selectProviderModalVm.title === 'Authorize') {
                    consentService.setAuthorizeNpi(selectedProvider.npi);
                } else {
                    consentService.setDiscloseNpi(selectedProvider.npi);
                }
            }
        }
    }
})();