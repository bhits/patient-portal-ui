
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentESignature', ppConsentESignature);

            /* @ngInject */
            function ppConsentESignature() {

                var directive =  {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentESignature.html',
                    scope: {},
                    bindToController: {
                    },
                    controller: ConsentESignatureController,
                    controllerAs: 'consentESignatureVm'
                };

                return directive;
            }

            /* @ngInject */
            function ConsentESignatureController ($modal) {
                var vm = this;
                vm.patient = {
                    createdDate: "04/08/2016",
                    dob: "04/08/2016",
                    name: "Bob Lastname",
                    consentReferenceNumber: "MHC.HC3AFH:&2.16.840.1.113883.3.704.100.200.1.1.3.1&ISO:1518239631:1790718047:OEATAM",
                    authrizeProviderName: "KOYOMJI DENTAL",
                    authorizeProviderNPI: "1992916092",
                    authorizeProviderAddress: "8218 WISCONSIN AVE,BETHESDA, MD, 20814-3107",
                    authorizeProviderTelephone:"301-654-1111",
                    discloseProviderName:"SABA PEDIATRIC MEDICINE, LLC",
                    discloseProviderNPI: "1871783456",
                    discloseProviderAddress: "15225 SHADY GROVE RD,ROCKVILLE, MD, 20850-3258",
                    discloseProviderTelephone:"301-838-8977",
                    sensitiveCategories: [
                        {displayName: "Addictions Information"},
                        {displayName:"Alcohol use and Alcoholism Information"}
                    ],
                    purposeOfUses: [
                        {displayName: "Health Treatment"}
                    ],
                    effectiveDate: "04/08/2016",
                    expirationDate: "04/08/2017",
                    acceptTerms:false
                };

                vm.openAuthenticateModal = function() {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentESignatureAuthenticateModal.html',
                        controller: AuthenticateController,
                        controllerAs: 'authenticateVm'
                    });
                };

                /* @ngInject */
                function AuthenticateController($modalInstance, notificationService, authenticationService, profileService) {
                    var authenticateVm  = this;
                    authenticateVm.cancel = cancel;
                    authenticateVm.ok = ok;
                    authenticateVm.errorMessage="";

                    function cancel() {
                        $modalInstance.dismiss('cancel');
                    }

                    function ok() {
                        authenticate();
                    }
                    
                    function authenticate(){
                        authenticationService.login(profileService.getUserName(), authenticateVm.password)
                            .then(
                                function (response) {
                                    authenticateVm.errorMessage="";
                                    notificationService.success("Success in authenticating patient. Signing consent ...");
                                    $modalInstance.close();
                                }, function (error) {
                                    authenticateVm.errorMessage="Invalid password.";
                                }
                            );
                    }
                }
            }


})();