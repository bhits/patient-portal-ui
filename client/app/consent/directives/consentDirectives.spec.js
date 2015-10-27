'use strict';

describe('app.consentDirectives', function () {
    var module;

    beforeEach(function () {
        module = angular.module("app.consentDirectives");
    });

    it("should be registered", function () {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function () {

        var dependencies;

        var hasModule = function (m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function () {
            dependencies = module.value('app.consentDirectives').requires;
        });

        it("should have app.consentServices", function () {
            expect(hasModule('app.consentServices')).toBeTruthy();
        });

        it("should have app.providerService", function () {
            expect(hasModule('app.providerService')).toBeTruthy();
        });

        it("should have app.providerFiltersModule", function () {
            expect(hasModule('app.providerFiltersModule')).toBeTruthy();
        });

        it("should have checklist-model", function () {
            expect(hasModule('checklist-model')).toBeTruthy();
        });

    });
});

describe('app.consentDirectives', function () {
    var $compile,
        $rootScope,
        $httpBackend,
        ConsentService;

    // Load the modules, which contains the directive or a dependency
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('app.consentDirectives'));
    beforeEach(module('templates-app'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _ConsentService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        ConsentService = _ConsentService_;
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('replaces the element with the appropriate content for consent-card', function () {
        // Arrange
        var mockState = "MOCK_STATE";
        var mockConsent = {
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
        $rootScope.consent = mockConsent;
        spyOn(ConsentService, 'resolveConsentState').andReturn(mockState);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();

        // Assert
        // Check that the compiled element contains the templated content
        expect(element.html()).toContain(mockConsent.toDiscloseName);
        expect(element.html()).toContain(mockConsent.isMadeToName);
        expect(element.html()).toContain(mockConsent.doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).toContain(mockConsent.doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).toContain(mockConsent.doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).toContain(mockConsent.doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsent.shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsent.shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsent.shareForPurposeOfUseCodes[2]);
        expect(element.html()).toContain(mockState);
        expect(ConsentService.resolveConsentState).toHaveBeenCalledWith(mockConsent);
    });
});
