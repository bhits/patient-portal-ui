
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
            function ConsentSelectProviderController ($scope,$modal, consentService, ProviderService, notificationService) {
                var Vm = this;
                Vm.fieldplaceholder = Vm.modaltitle === 'Authorize' ? "The following individual or organization" : "To disclose my information to";
                Vm.openSelectProviderModal = openSelectProviderModal;
                Vm.selectedProvider = Vm.ngModel;

                function openSelectProviderModal () {

                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentProviderSelectModal.html',
                        resolve: {
                            data: function () {
                                return {
                                    modalTitle: Vm.modaltitle,
                                    providers: Vm.providers,
                                    selectedProvider: Vm.selectedProvider
                                };
                            }
                        },

                        controller:SelectProviderModalController

                    });
                }

                /* @ngInject */
                function SelectProviderModalController($scope, $modalInstance, notificationService, data, ProviderService, consentService) {
                    $scope.cancel = cancel;
                    $scope.isOrganizationProvider = isOrganizationProvider;
                    $scope.isIndividualProvider = isIndividualProvider;
                    $scope.isSelected = isSelected;
                    $scope.ok = ok;
                    $scope.providers = data.providers;
                    $scope.selectedProvider = getSelectedProvider;
                    $scope.selectedNpi = consentService.getSelectedNpi();
                    $scope.title = data.modalTitle;


                    function cancel () {
                        $modalInstance.dismiss('cancel');
                    }

                    function getSelectedProvider(){
                        return {npi: ((data.selectedProvider !== null) && angular.isDefined(data.selectedProvider) && angular.isDefined(data.selectedProvider.npi)) ? data.selectedProvider.npi : ''};
                    }

                    function isOrganizationProvider (provider) {
                        return ProviderService.isOrganizationProvider(provider);
                    }

                    function isIndividualProvider(provider) {
                        return ProviderService.isIndividualProvider(provider);
                    }

                    function isSelected (npi) {
                        if ($scope.title === 'Authorize') {
                            return ($scope.selectedNpi.discloseNpi === npi);
                        } else if ($scope.title === 'Disclosure') {
                            return ($scope.selectedNpi.authorizeNpi === npi);
                        }
                    }

                    function ok () {
                        $modalInstance.close();
                        var selectedProvider = ProviderService.getProviderByNPI($scope.providers, $scope.selectedProvider.npi);
                        Vm.ngModel = selectedProvider;
                        Vm.selectedProvider = selectedProvider;

                        if ($scope.title === 'Authorize') {
                            consentService.setAuthorizeNpi(selectedProvider.npi);
                        } else {
                            consentService.setDiscloseNpi(selectedProvider.npi);
                        }
                    }


                }
            }
})();