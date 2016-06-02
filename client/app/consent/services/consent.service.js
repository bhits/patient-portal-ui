/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

(function () {

    angular.module("app.consent")
        .factory('consentService', consentService);

        /* @ngInject */
        function consentService($resource,$http, envService, utilityService, notificationService) {
            var consentListResource = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
            var consentResource = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/:id",{id: '@id'}, {'update': { method:'PUT' }});
            var consentExportConsentDirective = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/exportConsentDirective/:id",{id: '@id'});
            var purposeOfUseResource = $resource(envService.securedApis.pcmApiBaseUrl + "/purposeOfUse");
            var sensitvityPolicyResource = $resource(envService.securedApis.pcmApiBaseUrl + "/sensitivityPolicy");
            var attestedConsentResource = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/:consentId/attested", {consentId: '@consentId'});
            var revokeConsentResource = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/revokeConsent/:id", {id: '@id'});
            var consentAttestationResource = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/:consentId/attestation", {consentId: '@consentId'});
            var selectedNpi = {authorizeNpi: "", discloseNpi: ""};
            var selectedProvider = [];

            var service = {};
            service.getConsentResource = getConsentResource;
            service.getPurposeOfUseResource = getPurposeOfUseResource;
            service.getSensitvityPolicyResource = getSensitvityPolicyResource;
            service.getConsent = getConsent;
            service.revokeConsent = revokeConsent;
            service.createConsent = createConsent;
            service.updateConsent = updateConsent;
            service.downloadConsent = downloadConsent;
            service.deleteConsent = deleteConsent;
            service.listConsent = listConsent;
            service.setAuthorizeNpi = setAuthorizeNpi;
            service.setDiscloseNpi = setDiscloseNpi;
            service.getSelectedNpi = getSelectedNpi;
            service.getSelectedProvider = getSelectedProvider;
            service.prepareProviderList = prepareProviderList;
            service.resolveConsentState = resolveConsentState;
            service.isShareAll = isShareAll;
            service.getPurposeOfUse = getPurposeOfUse;
            service.getSensitivityPolicies = getSensitivityPolicies;
            service.getEntitiesByCodes = getEntitiesByCodes;
            service.getDefaultPurposeOfUse = getDefaultPurposeOfUse;
            service.getPurposeOfUseCodes = getPurposeOfUseCodes;
            service.getCodes = getCodes;
            service.getLookupEntities = getLookupEntities;
            service.resetSelectedNpi = resetSelectedNpi;
            service.getPurposeOfUseCode = getPurposeOfUseCode;
            service.exportConsentDirective = exportConsentDirective;
            service.getConsentAttestation = getConsentAttestation;
            service.getAttestedConsent = getAttestedConsent;
            service.downloadAttestedConsentPdf = downloadAttestedConsentPdf;

            return service;

            function getConsentResource(){
                return consentResource;
            }

            function getPurposeOfUseResource (){
                return purposeOfUseResource;
            }

            function getSensitvityPolicyResource(){
                return sensitvityPolicyResource;
            }

            function getConsent (id, success, error) {
                return consentResource.get({id:id}, success, error);
            }

            function revokeConsent (id, success, error) {
                return revokeConsentResource.get({id:id}, success, error);
            }

            function createConsent (consent, success, error) {
                return consentResource.save(consent, success, error);
            }

            function updateConsent (consent, success, error) {
                return consentResource.update(consent, success, error);
            }
            
            function downloadConsent(id, success, error) {
                var request = {
                    method : 'GET',
                    responseType : 'arraybuffer',
                    url : envService.securedApis.pcmApiBaseUrl + "/consents/" + id + "/unattested/"
                };
                $http(request).success(success).error(error);
            }

            function downloadAttestedConsentPdf(id, success, error) {
                var request = {
                    method : 'GET',
                    responseType : 'arraybuffer',
                    url : envService.securedApis.pcmApiBaseUrl + "/consents/" + id + "/attested/download"
                };
                $http(request).success(success).error(error);
            }

            // function composeUrl(docType, id){
            //     if(angular.isDefined(docType) && angular.isDefined(id)  ){
            //         return envService.securedApis.pcmApiBaseUrl + "/consents/download/" + docType + "/" + id;
            //     }else{
            //         notificationService.error("Consent pdf document type or id is not defined.");
            //     }
            // }
            //
            // function downloadConsent(id, docType, success, error) {
            //    var request = {
            //        method : 'GET',
            //        responseType : 'arraybuffer',
            //        url : composeUrl(docType, id)
            //    };
            //    $http(request).success(success).error(error);
            // }

            function deleteConsent (id, success, error) {
                return consentResource.delete({id: id}, success, error);
            }

            function exportConsentDirective (id, success, error) {
                return consentExportConsentDirective.get({id: id}, success, error);
            }

            function listConsent (page, success, error) {
                function adjustPageOnSuccessResponse(response) {
                    if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                        response.currentPage += 1;
                    }
                    (success || angular.identity)(response);
                }
                return consentListResource.get({pageNumber: page-1}, adjustPageOnSuccessResponse, error);
            }

            function setAuthorizeNpi (npi) {
                selectedNpi.authorizeNpi = npi;
            }

            function setDiscloseNpi(npi) {
                selectedNpi.discloseNpi = npi;
            }

            function getSelectedNpi() {
                return selectedNpi;
            }

            function getSelectedProvider (){
                return selectedProvider;
            }

            function prepareProviderList (selectedProviders, providers) {
                var providerList = [];
                for (var i = 0; i < providers.length; i++) {
                    if (hasNPI(selectedProviders, providers[i].npi)) {
                        providerList.push({isDisabled: true, provider: providers[i]});
                    } else {
                        providerList.push({isDisabled: false, provider: providers[i]});
                    }
                }
                return providerList;
            }

            function resolveConsentState (consent) {
                var state = 'error';
                if (consent.consentStage === 'CONSENT_SAVED' && consent.revokeStage === 'NA') {
                    state = 'Saved';
                } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_NOT_SUBMITTED') {
                    state = 'Signed';
                } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_REVOKED') {
                    state = 'Revoked';
                }
                return state;
            }

            function isShareAll (consent) {
                return isEmptyArray(consent.doNotShareSensitivityPolicyCodes);

                function isEmptyArray(o) {
                    return angular.isUndefined(o) || !angular.isArray(o) || o.length === 0;
                }
            }

            function getPurposeOfUse (success, error) {
                purposeOfUseResource.query(success, error);
            }

            function getSensitivityPolicies (success, error) {
                sensitvityPolicyResource.query(success, error);
            }

            function getEntitiesByCodes (entities,codes){
                var selectedEntities = [];

                if(codes.length === 0){
                    return selectedEntities;
                }else{
                    for(var i = 0; i < codes.length; i++){
                        var code = codes[i];
                        for(var j = 0; j < entities.length; j++){
                            var entityCode = entities[j].code;
                            if(entityCode === code){
                                selectedEntities.push(entities[j]);
                            }
                        }
                    }
                }
                return selectedEntities;
            }

            function getDefaultPurposeOfUse (PurposeOfUse, selectedPurposeOfUseCodes){
                var result = [];
                if(selectedPurposeOfUseCodes.length === 0){
                    result = getEntitiesByCodes(PurposeOfUse,['TREATMENT'] );
                }else if( selectedPurposeOfUseCodes.length > 0 ){
                    for(var i = 0; i < selectedPurposeOfUseCodes.length; i++){
                        var selectedCode = selectedPurposeOfUseCodes[i];
                        for(var j = 0; j < PurposeOfUse.length; j++){
                            var code = PurposeOfUse[j].code;
                            if( code === selectedCode){
                                result.push(PurposeOfUse[j]);
                            }
                        }
                    }
                }
                return result;
            }

            function getPurposeOfUseCodes (entities){
                var result = {selectedPurposeOfUseCodes: ['TREATMENT']};
                if(entities.length === 0 ){
                    return result;
                }else if(entities.length > 0 ){
                    result.selectedPurposeOfUseCodes = getCodes(entities);
                    return result;
                }
            }

            function getCodes(data){
                var codes = [];
                if(angular.isDefined(data)){
                    for(var i = 0; i < data.length; i++){
                        codes.push(data[i].code);
                    }
                }
                return codes;
            }

            function getLookupEntities (lookuplist, codelist ){
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
            }

            function resetSelectedNpi(){
                selectedNpi = {authorizeNpi: "", discloseNpi: ""};
            }

            function hasNPI (list, npi) {
                for (var j = 0; j < list.length; j++) {
                    if (npi === list[j]) {
                        return true;
                    }
                }
                return false;
            }

            function getPurposeOfUseCode(displayName, purposeOfUse){

            }

            function getConsentAttestation (consentId, success, error) {
                return consentAttestationResource.get({consentId:consentId}, success, error);
            }

            function getAttestedConsent (consentId, success, error) {
                return attestedConsentResource.get({consentId:consentId}, success, error);
            }


        }
})();
