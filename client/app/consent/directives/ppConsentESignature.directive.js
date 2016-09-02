
(function () {

    'use strict';

    angular
        .module('app.consent')
            .directive('ppConsentESignature', ppConsentESignature);

            /* @ngInject */
            function ppConsentESignature(consentService, profileService) {

                var directive =  {
                    restrict: 'E',
                    templateUrl: 'app/consent/directives/consentESignature.html',
                    scope: {},
                    bindToController: {
                        attestation: "="
                    },
                    controller: ConsentESignatureController,
                    controllerAs: 'consentESignatureVm'
                };

                return directive;
            }

            /* @ngInject */
            function ConsentESignatureController ($modal, consentService, utilityService) {
                var vm = this;
                vm.onchecked = onchecked;
                vm.onCompleteAttestation = onCompleteAttestation;
                vm.isAuthenticated = false;
                vm.hasSensitiveCategoriesToDisplay = hasSensitiveCategoriesToDisplay;
                activate();

                function activate(){
                    prepareConsentTerm();
                    computeAuthorizeProvider();
                    computeDisclosureProvider();
                }

                function prepareConsentTerm(){
                    if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.consentTermsVersions) ){
                        var terms = vm.attestation.consentTermsVersions.consentTermsText;
                        var userNameKey = "ATTESTER_FULL_NAME";
                        vm.termsWithUserName = terms.replace(userNameKey,composeFullname(vm.attestation) );
                    }
                }

                function composeFullname(attestation){
                    var fullName = "";
                    if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.firstName) && angular.isDefined(vm.attestation.lastName) ){
                        fullName =  "<strong>" + vm.attestation.firstName + " " + vm.attestation.lastName + "</strong>";
                    }else{
                        console.erro("Cannot set full name");
                    }
                    return fullName;
                }
                function computeAuthorizeProvider(){
                    if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.orgProvidersPermittedToDisclosure) && vm.attestation.orgProvidersPermittedToDisclosure.length> 0 ){
                        vm.authorizeProvider = vm.attestation.orgProvidersPermittedToDisclosure[0];
                    }else if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.indProvidersPermittedToDisclosure) && vm.attestation.indProvidersPermittedToDisclosure.length> 0 ){
                        vm.authorizeProvider = vm.attestation.indProvidersPermittedToDisclosure[0];
                    }
                }

                function computeDisclosureProvider(){
                    if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.indProvidersDisclosureIsMadeTo) && vm.attestation.indProvidersDisclosureIsMadeTo.length> 0 ){
                        vm.disclosureProvider = vm.attestation.indProvidersDisclosureIsMadeTo[0];
                    }else if( angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.orgProvidersDisclosureIsMadeTo) &&  vm.attestation.orgProvidersDisclosureIsMadeTo.length> 0 ){
                        vm.disclosureProvider = vm.attestation.orgProvidersDisclosureIsMadeTo[0];
                    }
                }
                
                function hasSensitiveCategoriesToDisplay(){
                    if(angular.isDefined(vm.attestation) && angular.isDefined(vm.attestation.doNotShareSensitivityPolicyDisplayNames) && vm.attestation.doNotShareSensitivityPolicyDisplayNames.length > 0 ){
                        return true;
                    } else {
                        return false;
                    }

                }
                

                //TODO: refactor attestation checkbox into directive that can be reused both for signing and revoking
                function onchecked(){
                    if(vm.attestation.acceptTerms){
                        vm.openAuthenticateModal();
                    }else{
                        vm.isAuthenticated = false;
                    }
                }
                vm.openAuthenticateModal = function() {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentESignatureAuthenticateModal.html',
                        controller: AuthenticateController,
                        controllerAs: 'authenticateVm',
                        backdrop  : 'static',
                        keyboard  : false
                    });
                };

                /* @ngInject */
                function AuthenticateController($modalInstance, notificationService, authenticationService, profileService) {
                    var authenticateVm  = this;
                    authenticateVm.cancel = cancel;
                    authenticateVm.ok = ok;
                    authenticateVm.errorMessage="";

                    function cancel() {
                        vm.attestation.acceptTerms = false;
                        $modalInstance.dismiss('cancel');
                    }

                    function ok() {
                        authenticate();
                    }
                    
                    function authenticate(){
                        var loginInfo = {
                            grant_type: 'password',
                            response_type: 'token',
                            username: profileService.getUserName(),
                            password: authenticateVm.password
                        };
                        var success = function (response) {
                            authenticateVm.errorMessage="";
                            vm.isAuthenticated = true;
                            $modalInstance.close();
                        };
                        var error = function (error) {
                            vm.isAuthenticated = false;
                            authenticateVm.errorMessage="Invalid password.";
                        };

                        authenticationService.login(loginInfo, success, error);
                    }
                }

                function onCompleteAttestation(){
                    var success = function(response){
                        vm.isAuthenticated = true;
                        vm.openAttestedConsentPreviewModal();
                    };

                    var error = function(response){
                        console.log("Error");
                    };
                    consentService.createAttestedConsent(vm.attestation.consentId, vm.attestation.acceptTerms, success, error);
                }

                vm.openAttestedConsentPreviewModal = function() {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/consent/directives/consentPreviewAttestationModal.html',
                        controller: PreviewAttestedConsentController,
                        controllerAs: 'attestedConsentModalVm',
                        backdrop  : 'static',
                        keyboard  : false
                    });
                };

                /* @ngInject */
                function PreviewAttestedConsentController($modalInstance, notificationService, profileService) {
                    var attestedConsentModalVm  = this;
                    attestedConsentModalVm.closeAndRedirectAndToConsentList = closeAndRedirectAndToConsentList;
                    attestedConsentModalVm.downloadAttestedConsentAndRedirectToConsentList = downloadAttestedConsentAndRedirectToConsentList;


                    function closeAndRedirectAndToConsentList() {
                        $modalInstance.dismiss('cancel');
                    }


                    function downloadAttestedConsentAndRedirectToConsentList(){
                        var fileName = profileService.getName();
                        var success = function(data){
                            utilityService.downloadFile(data, fileName,'application/pdf');
                        };
                        var error = function (respone){
                            notificationService.error("Error in downloading signed consent pdf.");
                        };
                        consentService.downloadAttestedConsentPdf(vm.attestation.consentId,success, error);
                    }
                }
            }


})();