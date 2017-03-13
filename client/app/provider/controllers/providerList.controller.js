(function () {
    'use strict';

    angular
        .module('app.provider')
        .controller('ProviderListController', ProviderListController);

    /* @ngInject */
    function ProviderListController(providers, $modal, providerService, $state, notificationService) {
        var vm = this;
        vm.providers = providers;
        vm.openDeleteProviderModal = function (provider, size) {
            var modalInstance = $modal.open({
                templateUrl: 'app/provider/controllers/providerDeleteModal.html',
                size: size,
                resolve: {
                    provider: function () {
                        return provider;
                    }
                },
                controllerAs: 'deleteProviderModalVm',
                controller: DeleteProviderModalController
            });
        };

        function DeleteProviderModalController(provider, notificationService, $modalInstance, $state) {

            var deleteProviderModalVm = this;

            deleteProviderModalVm.npi = provider.npi;
            deleteProviderModalVm.provider = provider;
            deleteProviderModalVm.ok = function () {
                providerService.deleteProvider(deleteProviderModalVm.npi,
                    function (data) {
                        $state.go($state.current, {}, {reload: true});
                        if (isEnglish()) {
                            notificationService.success('Success in deleting provider');
                        } else {
                            notificationService.success('El proveedor ha sido eliminado');
                        }
                    },
                    function (data) {
                        if (isEnglish()) {
                            notificationService.error('Error in deleting provider');
                        } else {
                            notificationService.error('El proveedor no pudo ser eliminado');
                        }

                    }
                );
                $modalInstance.close();
            };

            deleteProviderModalVm.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            function isEnglish() {
                var language = window.localStorage.lang || 'en';
                if (language.substring(0,2) === 'en') {
                    return true;
                } else {
                    return false;
                }
            }
        }

    }
})();