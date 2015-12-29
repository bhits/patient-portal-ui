(function () {
    'use strict';

    angular
        .module('app.provider')
            .controller('ProviderListController', ProviderListController);

            /* @ngInject */
            function ProviderListController (providers, $modal, providerService, $state, notificationService ){
                var vm = this;
        
                vm.providers = providers;
        

                vm.openDeleteProviderModal = function (provider, size) {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/provider/controllers/provider-delete-modal.html',
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

                function DeleteProviderModalController (provider, notificationService,$modalInstance,  $state) {

                    var deleteProviderModalVm = this;

                    deleteProviderModalVm.npi = provider.npi;
                    deleteProviderModalVm.provider = provider;
                    deleteProviderModalVm.ok = function () {
                        providerService.deleteProvider(deleteProviderModalVm.npi,
                            function(data){
                                $state.go($state.current, {}, {reload: true});
                                notificationService.success('Success in deleting provider');

                            },
                            function(data){
                                notificationService.error('Error in deleting provider');
                            }
                        );
                        $modalInstance.close();
                    };

                    deleteProviderModalVm.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }

            }


})();