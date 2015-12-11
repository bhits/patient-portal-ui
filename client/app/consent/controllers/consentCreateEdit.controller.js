
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
                var Vm = this;
                Vm.providers = loadedData[0] ;
                Vm.purposeOfUse = loadedData[1] ;
                Vm.medicalSections= loadedData[2] ;
                Vm.sensitivityPolicies = loadedData[3] ;
                Vm.consent = loadedData.length === 5? loadedData[4]: null ;
            }
})();