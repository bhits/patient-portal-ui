
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller("CreateEditConsentController", CreateEditConsentController);

            /* @ngInject */
            function CreateEditConsentController($scope, ConsentService, ProviderService, loadedData ){
                var CreateEditConsentVm = this;
                CreateEditConsentVm.providers = loadedData[0] ;
                CreateEditConsentVm.purposeOfUse = loadedData[1] ;
                CreateEditConsentVm.medicalSections= loadedData[2] ;
                CreateEditConsentVm.sensitivityPolicies = loadedData[3] ;
                CreateEditConsentVm.consent = loadedData.length === 5? loadedData[4]: null ;

            }
})();