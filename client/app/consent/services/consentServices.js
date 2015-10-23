/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentService($resource, ENVService) {
        var consentResource = $resource(ENVService.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
        var selectedProvider = [];

        //To be refactore
        var hasNPI = function(list, npi){
            for(var j = 0; j< list.length; j++ ) {
                if(npi === list[j]) {
                    return true;
                }
            }
            return false;
        };

        return {

            createConsent: function(consent, success, error) {

            },

            deleteConsent: function(id, success, error) {

            },

            updateConsent: function(consent, success, error) {
            },

            listConsent: function(page, success, error) {
                /*var consentList = [{
                    "id": "1",
                    "toDiscloseName": ["VAN DONGEN, MONICA"],
                    "isMadeToName": ["GRIMES, MICHAEL"],
                    "doNotShareClinicalDocumentTypeCodes": [],
                    "doNotShareClinicalDocumentSectionTypeCodes": ["Medications", "Allergies"],
                    "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"],
                    "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
                    "doNotShareClinicalConceptCodes": [],
                    "consentStage": "CONSENT_SIGNED",
                    "revokeStage": "REVOCATION_NOT_SUBMITTED",
                    "consentStart": 1404446399000,
                    "consentEnd": 1437537600000,
                    "consentStartString": null,
                    "consentEndString": null,
                    "medicalInformationNotDisclosed": true
                }, {
                    "id": "2",
                    "toDiscloseName": ["GRIMES, MICHAEL", "NEVAEH LLC", "CARLSON, GEORGE"],
                    "isMadeToName": ["VAN DONGEN, MONICA", "LUQUIN, TERESA", "MASTER CARE, INC."],
                    "doNotShareClinicalDocumentTypeCodes": [],
                    "doNotShareClinicalDocumentSectionTypeCodes": [],
                    "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"],
                    "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
                    "doNotShareClinicalConceptCodes": [],
                    "consentStage": "CONSENT_SIGNED",
                    "revokeStage": "REVOCATION_NOT_SUBMITTED",
                    "consentStart": 1404446399000,
                    "consentEnd": 1437537600000,
                    "consentStartString": null,
                    "consentEndString": null,
                    "medicalInformationNotDisclosed": true
                }
                ];
                return consentList;
            },

            setSelectedProviders : function(provider){
                selectedProvider = provider;
            },

            getSelectedProviders : function(provider){
              return  selectedProvider;
            },
            prepareProviderList : function(selectedProviders, providers){
                var providerList = [];
                for(var i = 0; i< providers.length; i++ ) {
                    if(hasNPI(selectedProviders, providers[i].npi)){
                        providerList.push({isDisabled: true, provider:providers[i]});
                    }else{
                        providerList.push({isDisabled: false, provider: providers[i]});
                    }
                }
                return providerList;
             }
                return consentList;*/
                consentResource.query({pageNumber: page}, success, error);
            }
        };
    }

    /**
     * The provider service
     *
     */
    angular.module("app.consentServices", ['ngResource', 'app.config'])
        .factory('ConsentService', ConsentService);
})();



