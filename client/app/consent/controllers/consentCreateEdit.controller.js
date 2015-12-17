
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller("ConsentCreateEditController", ConsentCreateEditController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name ConsentCreateEditController
             * @param consentService {service} The consent service
             * @param ProviderService {service} The provider service
             * @param loadedData {Array} The resolved data (lookup data and consent data when editing consent) for the controller
             *
             * @ngInject
             */
            function ConsentCreateEditController(consentService, ProviderService, loadedData ){
                var vm = this;
                vm.providers = loadedData[0] ;
                vm.purposeOfUse = loadedData[1] ;
                vm.medicalSections= loadedData[2] ;
                vm.sensitivityPolicies = loadedData[3] ;
                vm.consent = loadedData.length === 5? loadedData[4]: null ;
            }
})();