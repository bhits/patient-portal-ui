/**
 * Created by tomson.ngassa on 9/30/2015.
 */

(function () {
    'use strict';

    function ConsentService($resource, ENVService) {
        var consentListResource = $resource(ENVService.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
        var purposeOfUseResource = $resource(ENVService.pcmApiBaseUrl + "/purposeOfUse");
        var medicationSectionResource = $resource(ENVService.pcmApiBaseUrl + "/medicalSection");
        var sensitvityPolicyResource = $resource(ENVService.pcmApiBaseUrl + "/sensitivityPolicy");
        var consentResource = $resource(ENVService.pcmApiBaseUrl + "/consents/:id",{id: '@id'}, {'update': { method:'PUT' }});

        var selectedNpi = {authorizeNpi: "", discloseNpi: ""};
        var selectedProvider = [];
        //To be refactore
        var hasNPI = function (list, npi) {
            for (var j = 0; j < list.length; j++) {
                if (npi === list[j]) {
                    return true;
                }
            }
            return false;
        };

        return {

            getConsentResource: function(){
                return consentResource;
            },

            getPurposeOfUseResource: function(){
                return purposeOfUseResource;
            },

            getMedicationSectionResource: function(){
                return medicationSectionResource;
            },

            getSensitvityPolicyResource: function(){
                return sensitvityPolicyResource;
            },

            getConsent: function (id, success, error) {
                consentResource.get({id:id}, success, error);
            },

            createConsent: function (consent, success, error) {
                consentResource.save(consent, success, error);
            },

            updateConsent: function (consent, success, error) {
                consentResource.update(consent, success, error);
            },

            deleteConsent: function (id, success, error) {
                consentResource.delete({id: id}, success, error);
            },

            listConsent: function (page, success, error) {
                function adjustPageOnSuccessResponse(response) {
                    if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                        response.currentPage += 1;
                    }
                    (success || angular.identity)(response);
                }
                return consentListResource.get({pageNumber: page-1}, adjustPageOnSuccessResponse, error);
            },

            setAuthorizeNpi: function (npi) {
                selectedNpi.authorizeNpi = npi;
            },
            setDiscloseNpi: function (npi) {
                selectedNpi.discloseNpi = npi;
            },

            getSelectedNpi: function () {
                return selectedNpi;
            },

            getSelectedProvider : function(){
                return selectedProvider;
            },

            prepareProviderList: function (selectedProviders, providers) {
                var providerList = [];
                for (var i = 0; i < providers.length; i++) {
                    if (hasNPI(selectedProviders, providers[i].npi)) {
                        providerList.push({isDisabled: true, provider: providers[i]});
                    } else {
                        providerList.push({isDisabled: false, provider: providers[i]});
                    }
                }
                return providerList;
            },

            resolveConsentState: function (consent) {
                var state = 'error';
                if (consent.consentStage === 'CONSENT_SAVED' && consent.revokeStage === 'NA') {
                    state = 'saved';
                } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_NOT_SUBMITTED') {
                    state = 'signed';
                } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_REVOKED') {
                    state = 'revoked';
                }
                return state;
            },

            isShareAll: function (consent) {
                return isEmptyArray(consent.doNotShareClinicalDocumentSectionTypeCodes) && isEmptyArray(consent.doNotShareSensitivityPolicyCodes);

                function isEmptyArray(o) {
                    return angular.isUndefined(o) || !angular.isArray(o) || o.length === 0;
                }
            },

            getPurposeOfUse: function (success, error) {
                purposeOfUseResource.query(success, error);
            },
            getMedicalSection: function (success, error) {
                medicationSectionResource.query(success, error);
            },
            getSensitivityPolicies: function (success, error) {
                sensitvityPolicyResource.query(success, error);
            },

            getEntitiesByCodes: function(entities,codes){
                var selectedEntities = [];

                if(codes.length === 0){
                    return selectedEntities;
                }else{
                    for(var i = 0; i < codes.length; i++){
                        var code = codes[i];
                        for(var j = 0; j < entities.length; j++){
                            var entityCode = entities[j].code;
                            if(entityCode === code){
                                selectedEntities.push(entities[i]);
                            }
                        }
                    }
                }
                return selectedEntities;
            },

            getDefaultPurposeOfUse: function(PurposeOfUse, selectedPurposeOfUseCodes){
                var result = [];
                if(selectedPurposeOfUseCodes.length === 0){
                    result = this.getEntitiesByCodes(PurposeOfUse,['TREATMENT'] );
                }else if( selectedPurposeOfUseCodes.length > 0 ){
                    for(var i = 0; i < selectedPurposeOfUseCodes.length; i++){
                        var selectedCode = selectedPurposeOfUseCodes[i];
                        for(var j = 0; j < PurposeOfUse.length; j++){
                            var code = PurposeOfUse[j].code;
                            if( code === selectedCode){
                                result.push(PurposeOfUse[i]);
                            }
                        }
                    }
                }
                return result;
            },

            getPurposeOfUseCodes: function(entities){
                var result = {selectedPurposeOfUseCodes: ['TREATMENT']};
                if(entities.length === 0 ){
                    return result;
                }else if(entities.length > 0 ){
                    result.selectedPurposeOfUseCodes =  this.getCodes(entities);
                    return result;
                }
            },

            getCodes: function(data){
                var codes = [];
                if(angular.isDefined(data)){
                    for(var i = 0; i < data.length; i++){
                        codes.push(data[i].code);
                    }
                }

                return codes;
            },

            getLookupEntities: function(lookuplist, codelist ){
                var entities = [];
                if(angular.isDefined(codelist) && codelist.length > 0 ){
                    for(var i = 0; i < codelist.length; i++){
                        for(var j = 0; j < lookuplist.length; j++){
                            if(lookuplist[j].code === codelist[i]){
                                entities.push(lookuplist[j]);
                            }
                        }
                    }
                }

                return entities;
            },

            resetSelectedNpi: function(){
                selectedNpi = {authorizeNpi: "", discloseNpi: ""};
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



