/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

(function () {

    angular.module("app.consent")
        .factory('ConsentService', ConsentService);

    /**
     * @memberof app.consent
     * @description The consent service.
     * @ngdoc service
     * @name ConsentService
     * @param $resource {service} ngResource service
     * @param ENVService {service} The app api config service
     *
     *  @ngInject
     */
    function ConsentService($resource, ENVService) {
        var consentListResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
        var consentResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/consents/:id",{id: '@id'}, {'update': { method:'PUT' }});
        var purposeOfUseResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/purposeOfUse");
        var medicationSectionResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/medicalSection");
        var sensitvityPolicyResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/sensitivityPolicy");
        var signConsentResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/consents/signConsent/:id", {id: '@id'});
        var revokeConsentResource = $resource(ENVService.securedApis.pcmApiBaseUrl + "/consents/revokeConsent/:id", {id: '@id'});

        var selectedNpi = {authorizeNpi: "", discloseNpi: ""};
        var selectedProvider = [];

        var service =  {
            getConsentResource: getConsentResource,
            getPurposeOfUseResource: getPurposeOfUseResource,
            getMedicationSectionResource: getMedicationSectionResource,
            getSensitvityPolicyResource: getSensitvityPolicyResource,
            getConsent: getConsent,
            signConsent: signConsent,
            revokeConsent: revokeConsent,
            createConsent: createConsent,
            updateConsent: updateConsent,
            deleteConsent: deleteConsent,
            listConsent: listConsent,
            setAuthorizeNpi: setAuthorizeNpi,
            setDiscloseNpi: setDiscloseNpi,
            getSelectedNpi: getSelectedNpi,
            getSelectedProvider: getSelectedProvider,
            prepareProviderList: prepareProviderList,
            resolveConsentState: resolveConsentState,
            isShareAll: isShareAll,
            getPurposeOfUse: getPurposeOfUse,
            getMedicalSection: getMedicalSection,
            getSensitivityPolicies: getSensitivityPolicies,
            getEntitiesByCodes: getEntitiesByCodes,
            getDefaultPurposeOfUse: getDefaultPurposeOfUse,
            getPurposeOfUseCodes: getPurposeOfUseCodes,
            getCodes: getCodes,
            getLookupEntities: getLookupEntities,
            resetSelectedNpi: resetSelectedNpi
        };

        return service;

        function getConsentResource(){
            return consentResource;
        }

        function getPurposeOfUseResource (){
            return purposeOfUseResource;
        }

        function getMedicationSectionResource(){
            return medicationSectionResource;
        }

        function getSensitvityPolicyResource(){
            return sensitvityPolicyResource;
        }

        function getConsent (id, success, error) {
            consentResource.get({id:id}, success, error);
        }

        function signConsent (id, success, error) {
            return signConsentResource.get({id:id}, success, error);
        }

        function revokeConsent (id, success, error) {
            return revokeConsentResource.get({id:id}, success, error);
        }

        function createConsent (consent, success, error) {
            consentResource.save(consent, success, error);
        }

        function updateConsent (consent, success, error) {
            consentResource.update(consent, success, error);
        }

        function deleteConsent (id, success, error) {
            consentResource.delete({id: id}, success, error);
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
                state = 'saved';
            } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_NOT_SUBMITTED') {
                state = 'signed';
            } else if (consent.consentStage === 'CONSENT_SIGNED' && consent.revokeStage === 'REVOCATION_REVOKED') {
                state = 'revoked';
            }
            return state;
        }

        function isShareAll (consent) {
            return isEmptyArray(consent.doNotShareClinicalDocumentSectionTypeCodes) && isEmptyArray(consent.doNotShareSensitivityPolicyCodes);

            function isEmptyArray(o) {
                return angular.isUndefined(o) || !angular.isArray(o) || o.length === 0;
            }
        }

        function getPurposeOfUse (success, error) {
            purposeOfUseResource.query(success, error);
        }

        function getMedicalSection (success, error) {
            medicationSectionResource.query(success, error);
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
        //To be refactore
        function hasNPI (list, npi) {
            for (var j = 0; j < list.length; j++) {
                if (npi === list[j]) {
                    return true;
                }
            }
            return false;
        }
    }
})();
