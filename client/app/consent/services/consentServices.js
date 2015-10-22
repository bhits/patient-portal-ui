/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentService($resource, ENVService) {
        var consentResource = $resource(ENVService.pcmApiBaseUrl + "/providers/:npi", {npi: '@npi'});

        return {

            createConsent: function(consent, success, error) {

            },

            deleteConsent: function(id, success, error) {

            },

            updateConsent: function(consent, success, error) {
            },

            listConsent: function(patientId) {
                var consentList = [{
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



