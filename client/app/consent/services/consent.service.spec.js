'use strict';

describe('app.consentServices', function () {

    var consentService, $resource, envService, utilityService,
        notificationService, $httpBackend, $scope;

    var mockConsent, mockState = {};
    var entity1 = {entityType: 'Individual', code: 'PAYMENT'};
    var entity2 = {entityType: 'Organization', code: 'ALLERGIES'};
    var entityList = [entity1, entity2];

    beforeEach(module('app.config'));
    beforeEach(module('app.consent'));
    beforeEach(module('ngMock'));

    beforeEach(inject(function(_consentService_, _$resource_, _$rootScope_, _envService_,
                               _utilityService_, _notificationService_, $injector){
        consentService = _consentService_;
        $resource = _$resource_;
        $scope = _$rootScope_.$new();
        envService = _envService_;
        utilityService = _utilityService_;
        notificationService = _notificationService_;
        $httpBackend = $injector.get('$httpBackend');

    }));

    beforeEach(function () {
        mockConsent = {
            "id": "1",
            "toDiscloseName": ["VAN DONGEN, MONICA"],
            "isMadeToName": ["GRIMES, MICHAEL"],
            "doNotShareClinicalDocumentTypeCodes": [],
            "doNotShareClinicalDocumentSectionTypeCodes": ["Medications", "Allergies"],
            "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"],
            "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
            "doNotShareClinicalConceptCodes": [],
            "consentStage": "CONSENT_SAVED",
            "revokeStage": "NA",
            "consentStart": 1404446399000,
            "consentEnd": 1437537600000,
            "consentStartString": null,
            "consentEndString": null,
            "medicalInformationNotDisclosed": true
        };
    });


    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });
    
    describe("test setters", function(){
        
        it('should set authorized NPI', function(){
            consentService.setAuthorizeNpi('authorizeNPI');
            var selected = consentService.getSelectedNpi();
            expect(selected.authorizeNpi).toBe('authorizeNPI');
        });

        it('should set authorized NPI', function(){
            consentService.setDiscloseNpi('discloseNPI');
            var selected = consentService.getSelectedNpi();
            expect(selected.discloseNpi).toBe('discloseNPI');
        });
    });
    

    describe("test getters", function(){

        var testURL;

        xit ('should get consent', function(){

            $httpBackend.when('GET',envService.securedApis.pcmApiBaseUrl + "/consents/:d").respond(200, {id: 111});

            var status = consentService.getConsent(
                {id: 111},
                function (data) {
                    status = data.status;
                    console.log('success!');
                },
                function (error) {
                    console.log('error!');
                });
            $httpBackend.flush();
            $httpBackend.expectGET(envService.securedApis.pcmApiBaseUrl + "/consents/:id");
            expect(status).toEqual(200);
        });


        it ('should get consent resource (getConsentResource)', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
            expect(consentService.getConsentResource().toString()).toEqual(testURL.toString());
        });

        it ('should get purpose of use resource (getSensitivityPolicyResource)', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/purposeOfUse");
            expect(consentService.getPurposeOfUseResource().toString()).toEqual(testURL.toString());
        });

        it ('should get sensitivity policy resource (getSensitivityPolicyResource)', function(){
            testURL = $resource(envService.securedApis.pcmApiBaseUrl + "/sensitivityPolicy");
            expect(consentService.getSensitivityPolicyResource().toString()).toEqual(testURL.toString());
        });

        it('should find the correct entity by the code from the list passed (getEntitiesByCodes)', function () {
            expect(consentService.getEntitiesByCodes(mockState, ['TREATMENT','ALLERGIES'])).toEqual([]);
            expect(consentService.getEntitiesByCodes(entityList, [333])).toEqual([]);
            expect(consentService.getEntitiesByCodes(entityList, [])).toEqual([]);
            expect(consentService.getEntitiesByCodes(entityList, ['PAYMENT'])).toEqual([entity1]);
            expect(consentService.getEntitiesByCodes(entityList, ['PAYMENT','ALLERGIES'])).toEqual([entity1, entity2]);

        });

        it('should find the correct purpose of use by the code from the list passed (getDefaultPurposeOfUse)', function () {
            expect(consentService.getDefaultPurposeOfUse(mockState, ['TREATMENT','ALLERGIES'])).toEqual([]);
            expect(consentService.getDefaultPurposeOfUse(entityList, [333])).toEqual([]);
            expect(consentService.getDefaultPurposeOfUse(entityList, [])).toEqual([]);
            expect(consentService.getDefaultPurposeOfUse(entityList, ['PAYMENT'])).toEqual([entity1]);
            expect(consentService.getDefaultPurposeOfUse(entityList, ['PAYMENT','ALLERGIES'])).toEqual([entity1, entity2]);
        });

        it('should compile array of codes from the list of entities passed passed (getCodes)', function () {
            mockState = {};
            expect(consentService.getCodes(mockState)).toEqual([]);
            expect(consentService.getCodes(undefined)).toEqual([]);
            expect(consentService.getCodes(entityList)).toEqual(['PAYMENT', 'ALLERGIES']);
        });

        it('should compile array of codes from the list of entities passed passed (getPurposeOfUseCodes)', function () {
            mockState = {};
            expect(consentService.getPurposeOfUseCodes(mockState)).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
            expect(consentService.getPurposeOfUseCodes(undefined)).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
            expect(consentService.getPurposeOfUseCodes([])).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
            expect(consentService.getPurposeOfUseCodes(entityList)).toEqual({selectedPurposeOfUseCodes: ['PAYMENT','ALLERGIES']});
        });

        it('should find the correct lookup entity by the code from the list passed (getLookupEntities)', function () {
            expect(consentService.getLookupEntities(mockState, ['TREATMENT','ALLERGIES'])).toEqual([]);
            expect(consentService.getLookupEntities(entityList, [333])).toEqual([]);
            expect(consentService.getLookupEntities(entityList, [])).toEqual([]);
            expect(consentService.getLookupEntities(entityList, ['PAYMENT'])).toEqual([entity1]);
            expect(consentService.getLookupEntities(entityList, ['PAYMENT','ALLERGIES'])).toEqual([entity1, entity2]);
        });

    }); //end describe: test getters

    describe("test everything else", function(){

        it ('should reset selected NPI', function(){
            consentService.resetSelectedNpi();
            expect(consentService.getSelectedNpi()).toEqual({authorizeNpi: "", discloseNpi: ""});
        });

        // it('should prepare provider list', function(){
        //     var providers = [{npi: 111},{npi: 222}];
        //     var dummyValue = {entityType: 'Individual', npi: 111};
        //     var dummyValue2 = {entityType: 'Organization', npi: 222};
        //     var selectedProviders = [dummyValue, dummyValue2];
        //
        //     var what = consentService.prepareProviderList(selectedProviders, providers);
        //     console.log(what);
        // });

        it ('should return true if all Sensitivity Policy Codes can be shared (isShareAll)', function(){
            mockConsent = {
                "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"]
            };
            expect(consentService.isShareAll(mockConsent)).toBeFalsy();
            mockConsent = {
                "doNotShareSensitivityPolicyCodes": []
            };
            expect(consentService.isShareAll(mockConsent)).toBeTruthy();
            mockConsent = {
            };
            expect(consentService.isShareAll(mockConsent)).toBeTruthy();
            mockConsent = {
                "doNotShareSensitivityPolicyCodes": undefined
            };
            expect(consentService.isShareAll(mockConsent)).toBeTruthy();
            mockConsent = {
                "doNotShareSensitivityPolicyCodes": 'value'
            };
            expect(consentService.isShareAll(mockConsent)).toBeTruthy();
        });

        it ('should return the correct resolve state for consent (resolveConsentState)', function(){
            spyOn(consentService, 'resolveConsentState').and.callThrough();
            $scope.consent = mockState;
            consentService.resolveConsentState(mockConsent);
            expect(consentService.resolveConsentState(mockState)).toBe('error');
            expect(consentService.resolveConsentState(mockConsent)).toBe('Saved');
            mockConsent = {
                "consentStage": "CONSENT_SAVED",
                "revokeStage": "REVOCATION_NOT_SUBMITTED"
            };
            expect(consentService.resolveConsentState(mockConsent)).toBe('error');
            mockConsent = {
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "REVOCATION_NOT_SUBMITTED"
            };
            expect(consentService.resolveConsentState(mockConsent)).toBe('Signed');
            mockConsent = {
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "NA"
            };
            expect(consentService.resolveConsentState(mockConsent)).toBe('error');
            mockConsent = {
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "REVOCATION_REVOKED"
            };
            expect(consentService.resolveConsentState(mockConsent)).toBe('Revoked');
            mockConsent = {
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "NA"
            };
            expect(consentService.resolveConsentState(mockConsent)).toBe('error');
        });

    });

});