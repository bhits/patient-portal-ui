
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller("CreateEditConsentController", CreateEditConsentController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name CreateEditConsentController
             * @param ConsentService {service} The consent service
             * @param ProviderService {service} The provider service
             * @param loadedData {Array} The resolved data (lookup data and consent data when editing consent) for the controller
             *
             * @ngInject
             */
            function CreateEditConsentController(ConsentService, ProviderService, loadedData ){
                var CreateEditConsentVm = this;
                CreateEditConsentVm.providers = loadedData[0] ;
                CreateEditConsentVm.purposeOfUse = loadedData[1] ;
                CreateEditConsentVm.medicalSections= loadedData[2] ;
                CreateEditConsentVm.sensitivityPolicies = loadedData[3] ;
                CreateEditConsentVm.consent = loadedData.length === 5? loadedData[4]: null ;

            }
})();