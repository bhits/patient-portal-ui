
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller("ConsentCreateEditController", ConsentCreateEditController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name ConsentCreateEditController
             * @param ConsentService {service} The consent service
             * @param ProviderService {service} The provider service
             * @param loadedData {Array} The resolved data (lookup data and consent data when editing consent) for the controller
             *
             * @ngInject
             */
            function ConsentCreateEditController(ConsentService, ProviderService, loadedData ){
                var ConsentCreateEditVm = this;
                ConsentCreateEditVm.providers = loadedData[0] ;
                ConsentCreateEditVm.purposeOfUse = loadedData[1] ;
                ConsentCreateEditVm.medicalSections= loadedData[2] ;
                ConsentCreateEditVm.sensitivityPolicies = loadedData[3] ;
                ConsentCreateEditVm.consent = loadedData.length === 5? loadedData[4]: null ;

            }
})();