'use strict';

xdescribe('app.consentServices', function () {

    var consentService, $resource, configService, utilityService,
        notificationService, $httpBackend, $scope, status, passed, testURL;

    var mockConsent, mockState = {};
    var entity1 = {entityType: 'Individual', code: 'PAYMENT'};
    var entity2 = {entityType: 'Organization', code: 'ALLERGIES'};
    var entityList = [entity1, entity2];

    var success = function (data) {
        status = data.status;
        passed = true;
    };

    var error = function (error) {
        status = error.status;
        passed = false;
    };

    var consent = {
        providersPermittedToDiscloseNpi: ["providersPermittedToDiscloseNpi"],
        providersDisclosureIsMadeToNpi: ["providersDisclosureIsMadeToNpi"],
        organizationalProvidersDisclosureIsMadeToNpi: ["organizationalProvidersDisclosureIsMadeToNpi"],
        organizationalProvidersPermittedToDiscloseNpi: ["organizationalProvidersPermittedToDiscloseNpi"],
        doNotShareSensitivityPolicyCodes: ["doNotShareSensitivityPolicyCodes"],
        shareForPurposeOfUseCodes: ["shareForPurposeOfUseCodes"],
        consentStart: ["consentStart"],
        consentEnd: ["consentEnd"],
        status: 200
    };

    var failedConsent = {
        providersPermittedToDiscloseNpi: ["providersPermittedToDiscloseNpi"],
        providersDisclosureIsMadeToNpi: ["providersDisclosureIsMadeToNpi"],
        organizationalProvidersDisclosureIsMadeToNpi: ["organizationalProvidersDisclosureIsMadeToNpi"],
        organizationalProvidersPermittedToDiscloseNpi: ["organizationalProvidersPermittedToDiscloseNpi"],
        doNotShareSensitivityPolicyCodes: ["doNotShareSensitivityPolicyCodes"],
        shareForPurposeOfUseCodes: ["shareForPurposeOfUseCodes"],
        consentStart: ["consentStart"],
        consentEnd: ["consentEnd"],
        status: 0
    };

    beforeEach(module('app.config'));
    beforeEach(module('app.consent'));
    beforeEach(module('ngMock'));

    beforeEach(inject(function (_consentService_, _$resource_, _$rootScope_, _configService_,
                                _utilityService_, _notificationService_, $injector) {
        consentService = _consentService_;
        $resource = _$resource_;
        $scope = _$rootScope_.$new();
        configService = _configService_;
        utilityService = _utilityService_;
        notificationService = _notificationService_;
        $httpBackend = $injector.get('$httpBackend');

        passed = null;
        status = null;
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

    it('should get consent resource (getConsentResource)', function () {
        testURL = $resource(configService.getPcmApiBaseUrl() + "/consents/pageNumber/:pageNumber", {pageNumber: '@pageNumber'});
        expect(consentService.getConsentResource().toString()).toEqual(testURL.toString());
    });

    it('should get purpose of use resource (getPurposeOfUseResource)', function () {
        testURL = $resource(configService.getPcmApiBaseUrl() + "/purposeOfUse");
        expect(consentService.getPurposeOfUseResource().toString()).toEqual(testURL.toString());
    });

    it('should get purpose of use resource (getSensitivityPolicyResource)', function () {
        testURL = $resource(configService.getPcmApiBaseUrl() + "/sensitivityPolicy");
        expect(consentService.getSensitivityPolicyResource().toString()).toEqual(testURL.toString());
    });

    it('should get consent (getConsent)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/%5Bobject%20Object%5D").respond(200, {id: 111, status: 200});

        status = consentService.getConsent({id: 111}, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail get consent (getConsent)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents").respond(0, "error");
        status = consentService.getConsent(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should revoke consent (revokeConsent)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/revokeConsent/%5Bobject%20Object%5D").respond(200, {
            id: 111,
            status: 200
        });

        status = consentService.revokeConsent({id: 111}, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail revoke consent (revokeConsent)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/revokeConsent").respond(0, "error");
        status = consentService.revokeConsent(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should create a consent (createConsent)', function () {
        $httpBackend.expect('POST', "/pcm/patients/consents").respond(200, consent);
        status = consentService.createConsent(consent, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail create consent (createConsent)', function () {
        $httpBackend.expect('POST', "/pcm/patients/consents").respond(0, "error");
        status = consentService.createConsent(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should update a consent (updateConsent)', function () {
        $httpBackend.expect('PUT', "/pcm/patients/consents").respond(200, consent);
        status = consentService.updateConsent(consent, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail update consent (updateConsent)', function () {
        $httpBackend.expect('PUT', "/pcm/patients/consents").respond(0, "error");
        status = consentService.updateConsent(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should download unattested consent PDF (downloadUnAttestedConsentPdf)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/unattested").respond(200, "success");
        consentService.downloadUnAttestedConsentPdf("consent.service.spec.js", success, error);
    });

    it('should download signed consent PDF (downloadAttestedConsentPdf)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/attested").respond(200, "success");
        consentService.downloadAttestedConsentPdf("consent.service.spec.js", success, error);
    });

    it('should delete a consent (deleteConsent)', function () {
        $httpBackend.expect('DELETE', "/pcm/patients/consents/%5Bobject%20Object%5D").respond(200, consent);
        status = consentService.deleteConsent(consent, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail delete consent (deleteConsent)', function () {
        $httpBackend.expect('DELETE', "/pcm/patients/consents").respond(0, "error");
        status = consentService.deleteConsent(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should export consent directive (exportConsentDirective)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/exportConsentDirective/%5Bobject%20Object%5D").respond(200, {
            id: 111,
            status: 200
        });
        status = consentService.exportConsentDirective({id: 111}, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail export consent directive (exportConsentDirective)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/exportConsentDirective").respond(0, "error");
        status = consentService.exportConsentDirective(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should get list of consents (listConsent)', function () {
        var page = {
            currentPage: 1
        };

        $httpBackend.expect('GET', '/pcm/patients/consents/pageNumber/1').respond(200, page);

        var success = function (response) {
            passed = true;
            return response;
        };

        var error = function (data) {
            passed = false;
            return data;
        };

        var called = consentService.listConsent(2, success, error);
        $httpBackend.flush();
        expect(called.currentPage).toBe(2);
    });

    it('should error get list of consents (listConsent)', function () {

        var page = {
            currentPage: "error"
        };

        $httpBackend.expect('GET', '/pcm/patients/consents/pageNumber/NaN').respond(200, page);

        var success = function (response) {
            passed = true;
            return response;
        };

        var error = function (data) {
            passed = false;
            return data;
        };

        var called = consentService.listConsent("string", success, error);
        $httpBackend.flush();
        expect(called.currentPage).toBe("error");
    });

    it('should set authorized NPI', function () {
        consentService.setAuthorizeNpi('authorizeNPI');
        var selected = consentService.getSelectedNpi();
        expect(selected.authorizeNpi).toBe('authorizeNPI');
    });

    it('should set authorized NPI', function () {
        consentService.setDiscloseNpi('discloseNPI');
        var selected = consentService.getSelectedNpi();
        expect(selected.discloseNpi).toBe('discloseNPI');
    });

    it('should prepare provider list (prepareProviderList)', function () {
        var providers = [{npi: 111}, {npi: 222}];
        var selectedProviders = [111, 222];

        var what = consentService.prepareProviderList(selectedProviders, providers);
        expect(what.length).toBe(2);
        expect(what[0].isDisabled).toBeTruthy();
        expect(what[1].isDisabled).toBeTruthy();
    });

    it('should fail prepare provider list with null providers (prepareProviderList)', function () {
        var providers = [{npi: 111}, {npi: 222}];
        var selectedProviders = [null, null];

        var what = consentService.prepareProviderList(selectedProviders, providers);
        expect(what.length).toBe(2);
        expect(what[0].isDisabled).toBeFalsy();
    });

    it('should fail prepare provider list with invalid providers (prepareProviderList)', function () {
        var providers = [{npi: 111}, {npi: 222}];
        var selectedProviders = [333, 444];

        var what = consentService.prepareProviderList(selectedProviders, providers);
        expect(what.length).toBe(2);
        expect(what[0].isDisabled).toBeFalsy();
    });

    it('should return the correct resolve state for consent (resolveConsentState)', function () {
        spyOn(consentService, 'resolveConsentState').and.callThrough();
        $scope.consent = mockState;
        consentService.resolveConsentState(mockConsent);
        expect(consentService.resolveConsentState(mockConsent)).toBe('In Progress');
        mockConsent = {
            "consentStage": "CONSENT_SAVED"
        };
        expect(consentService.resolveConsentState(mockConsent)).toBe('In Progress');
        mockConsent = {
            "consentStage": "CONSENT_SIGNED"
        };
        expect(consentService.resolveConsentState(mockConsent)).toBe('Signed');
        mockConsent = {
            "consentStage": "REVOCATION_REVOKED"
        };
        expect(consentService.resolveConsentState(mockConsent)).toBe('Revoked');
    });

    it('should fail to return the correct resolve state for consent (resolveConsentState)', function () {
        spyOn(consentService, 'resolveConsentState').and.callThrough();
        $scope.consent = mockState;
        consentService.resolveConsentState(mockConsent);
        expect(consentService.resolveConsentState(mockState)).toBe('error');
        mockConsent = {
            "consentStage": "NA"
        };
        expect(consentService.resolveConsentState(mockConsent)).toBe('error');
    });

    it('should return true if all Sensitivity Policy Codes can be shared (isShareAll)', function () {
        mockConsent = {
            "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"]
        };
        expect(consentService.isShareAll(mockConsent)).toBeFalsy();
        mockConsent = {
            "doNotShareSensitivityPolicyCodes": []
        };
        expect(consentService.isShareAll(mockConsent)).toBeTruthy();
        mockConsent = {};
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

    it('should get purpose of use (getPurposeOfUse)', function () {
        $httpBackend.expect('GET', "/pcm/patients/purposeOfUse?0=purpose").respond(200, ["purpose"]);
        status = consentService.getPurposeOfUse(["purpose"], success, error);
        $httpBackend.flush();
        expect(passed).toBeTruthy();
    });

    it('should get sensitivities policies (getSensitivityPolicies)', function () {
        $httpBackend.expect('GET', "/pcm/patients/sensitivityPolicy?0=purpose").respond(200, ["purpose"]);
        status = consentService.getSensitivityPolicies(["purpose"], success, error);
        $httpBackend.flush();
        expect(passed).toBeTruthy();
    });

    it('should find the correct entity by the code from the list passed (getEntitiesByCodes)', function () {
        expect(consentService.getEntitiesByCodes(mockState, ['TREATMENT', 'ALLERGIES'])).toEqual([]);
        expect(consentService.getEntitiesByCodes(entityList, [333])).toEqual([]);
        expect(consentService.getEntitiesByCodes(entityList, [])).toEqual([]);
        expect(consentService.getEntitiesByCodes(entityList, ['PAYMENT'])).toEqual([entity1]);
        expect(consentService.getEntitiesByCodes(entityList, ['PAYMENT', 'ALLERGIES'])).toEqual([entity1, entity2]);
    });

    it('should find the correct purpose of use by the code from the list passed (getDefaultPurposeOfUse)', function () {
        expect(consentService.getDefaultPurposeOfUse(mockState, ['TREATMENT', 'ALLERGIES'])).toEqual([]);
        expect(consentService.getDefaultPurposeOfUse(entityList, [333])).toEqual([]);
        expect(consentService.getDefaultPurposeOfUse(entityList, [])).toEqual([]);
        expect(consentService.getDefaultPurposeOfUse(entityList, ['PAYMENT'])).toEqual([entity1]);
        expect(consentService.getDefaultPurposeOfUse(entityList, ['PAYMENT', 'ALLERGIES'])).toEqual([entity1, entity2]);
    });

    it('should compile array of codes from the list of entities passed passed (getPurposeOfUseCodes)', function () {
        mockState = {};
        expect(consentService.getPurposeOfUseCodes(mockState)).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
        expect(consentService.getPurposeOfUseCodes(undefined)).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
        expect(consentService.getPurposeOfUseCodes([])).toEqual({selectedPurposeOfUseCodes: ['TREATMENT']});
        expect(consentService.getPurposeOfUseCodes(entityList)).toEqual({selectedPurposeOfUseCodes: ['PAYMENT', 'ALLERGIES']});
    });

    it('should compile array of codes from the list of entities passed passed (getCodes)', function () {
        mockState = {};
        expect(consentService.getCodes(mockState)).toEqual([]);
        expect(consentService.getCodes(undefined)).toEqual([]);
        expect(consentService.getCodes(entityList)).toEqual(['PAYMENT', 'ALLERGIES']);
    });

    it('should find the correct lookup entity by the code from the list passed (getLookupEntities)', function () {
        expect(consentService.getLookupEntities(mockState, ['TREATMENT', 'ALLERGIES'])).toEqual([]);
        expect(consentService.getLookupEntities(entityList, [333])).toEqual([]);
        expect(consentService.getLookupEntities(entityList, [])).toEqual([]);
        expect(consentService.getLookupEntities(entityList, ['PAYMENT'])).toEqual([entity1]);
        expect(consentService.getLookupEntities(entityList, ['PAYMENT', 'ALLERGIES'])).toEqual([entity1, entity2]);
    });

    it('should reset selected NPI', function () {
        consentService.resetSelectedNpi();
        expect(consentService.getSelectedNpi()).toEqual({authorizeNpi: "", discloseNpi: ""});
    });

    it('should get consent attestation (getConsentAttestation)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/%5Bobject%20Object%5D/attestation").respond(200, {
            consentID: 111,
            status: 200
        });

        status = consentService.getConsentAttestation({consentID: 111}, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail get consent attestation (getConsentAttestation)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/attestation").respond(0, "error");
        status = consentService.getConsentAttestation(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should create consent attestation (createAttestedConsent)', function () {
        var passed = {consentID: 111, acceptTerms: ["something"]};
        $httpBackend.expect('POST', "/pcm/patients/consents/%5Bobject%20Object%5D/attested").respond(200, {status: 200});

        status = consentService.createAttestedConsent(passed, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should get consent revoke attestation (getConsentRevokeAttestation)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/%5Bobject%20Object%5D/revokeConsent").respond(200, {
            consentID: 111,
            status: 200
        });

        status = consentService.getConsentRevokeAttestation({consentID: 111}, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should fail get consent revoke attestation (getConsentRevokeAttestation)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/revokeConsent").respond(0, "error");
        status = consentService.getConsentRevokeAttestation(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should create signed consent revocation (createAttestedConsentRevocation)', function () {
        var passed = {consentID: 111, acceptTerms: ["something"]};
        $httpBackend.expect('POST', "/pcm/patients/consents/%5Bobject%20Object%5D/revocation").respond(200, {status: 200});

        status = consentService.createAttestedConsentRevocation(passed, success, error);
        $httpBackend.flush();
        expect(status).toEqual(200);
        expect(passed).toBeTruthy();
    });

    it('should download signed consent revocation PDF (downloadAttestedConsentRevocationPdf)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/attested").respond(200, "success");
        consentService.downloadAttestedConsentRevocationPdf("consent.service.spec.js", success, error);
    });
});