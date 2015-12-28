
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentProviderSelect', ppConsentProviderSelect);

            /* @ngInject */
            function ppConsentProviderSelect($modal, ProviderService, consentService) {
                var directive =  {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentProviderSelect.html',
                    scope: {
                        modaltitle: "=",
                        providers: "=",
                        ngModel: '='
                    },
                    bindToController: true,
                    controllerAs: 'consentSelectProviderVm',
                    controller: ConsentSelectProviderController
                };

                return directive;
            }

            /* @ngInject */
            function ConsentSelectProviderController ($modal, consentService, ProviderService, notificationService) {
                var vm = this;
                vm.fieldplaceholder = vm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";
                vm.openSelectProviderModal = openSelectProviderModal;
                vm.selectedProvider = vm.ngModel;

                function openSelectProviderModal () {

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
                        controller:SelectProviderModalController

                    });
                }

                /* @ngInject */
                function SelectProviderModalController($modalInstance, notificationService, data, ProviderService, consentService) {
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

                    function cancel () {
                        $modalInstance.dismiss('cancel');
                    }

                    function isOrganizationProvider (provider) {
                        return ProviderService.isOrganizationProvider(provider);
                    }

                    function isIndividualProvider(provider) {
                        return ProviderService.isIndividualProvider(provider);
                    }

                    function isSelected (npi) {
                        if (selectProviderModalVm.title === 'Authorize') {
                            return (selectProviderModalVm.selectedNpi.discloseNpi === npi);
                        } else if (selectProviderModalVm.title === 'Disclosure') {
                            return (selectProviderModalVm.selectedNpi.authorizeNpi === npi);
                        }
                    }

                    function ok () {
                        $modalInstance.close();
                        var selectedProvider = ProviderService.getProviderByNPI(selectProviderModalVm.providers, selectProviderModalVm.selectedProvider.npi);
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