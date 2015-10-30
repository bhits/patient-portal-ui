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
        $modal,
        $q,
        ConsentService,
        notificationService;

    var mockConsent = {};
    var mockConsentList = {};

    // Load the modules, which contains the directive or a dependency
    beforeEach(module('ui.bootstrap'));
    beforeEach(module('app.consentDirectives'));
    beforeEach(module('templates-app'));
    beforeEach(module('templates-common'));
    beforeEach(module('app.notificationModule'));

    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function (_$compile_, _$rootScope_, _$httpBackend_, _$modal_, _$q_, _ConsentService_, _notificationService_) {
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
        $modal = _$modal_;
        $q = _$q_;
        ConsentService = _ConsentService_;
        notificationService = _notificationService_;
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
        mockConsentList = {
            totalItems: 20,
            itemsPerPage: 5,
            currentPage: 0,
            consents: [{
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
            }, {
                "id": "3",
                "toDiscloseName": ["GRIMES, MICHAEL", "NEVAEH LLC", "CARLSON, GEORGE"],
                "isMadeToName": ["VAN DONGEN, MONICA", "LUQUIN, TERESA", "MASTER CARE, INC."],
                "doNotShareClinicalDocumentTypeCodes": [],
                "doNotShareClinicalDocumentSectionTypeCodes": [],
                "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"],
                "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
                "doNotShareClinicalConceptCodes": [],
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "REVOCATION_REVOKED",
                "consentStart": 1404446399000,
                "consentEnd": 1437537600000,
                "consentStartString": null,
                "consentEndString": null,
                "medicalInformationNotDisclosed": true
            }, {
                "id": "4",
                "toDiscloseName": ["GRIMES, MICHAEL", "NEVAEH LLC", "CARLSON, GEORGE"],
                "isMadeToName": ["VAN DONGEN, MONICA", "LUQUIN, TERESA", "MASTER CARE, INC."],
                "doNotShareClinicalDocumentTypeCodes": [],
                "doNotShareClinicalDocumentSectionTypeCodes": [],
                "doNotShareSensitivityPolicyCodes": ["Mental health information sensitivity", "HIV/AIDS information sensitivity"],
                "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
                "doNotShareClinicalConceptCodes": [],
                "consentStage": "CONSENT_SIGNED",
                "revokeStage": "NA",
                "consentStart": 1404446399000,
                "consentEnd": 1437537600000,
                "consentStartString": null,
                "consentEndString": null,
                "medicalInformationNotDisclosed": true
            }, {
                "id": "5",
                "toDiscloseName": ["GRIMES, MICHAEL", "NEVAEH LLC", "CARLSON, GEORGE"],
                "isMadeToName": ["VAN DONGEN, MONICA", "LUQUIN, TERESA", "MASTER CARE, INC."],
                "doNotShareClinicalDocumentTypeCodes": [],
                "doNotShareClinicalDocumentSectionTypeCodes": [],
                "doNotShareSensitivityPolicyCodes": [],
                "shareForPurposeOfUseCodes": ["Payment", "Emergency Treatment", "Healthcare Treatment"],
                "doNotShareClinicalConceptCodes": [],
                "consentStage": "CONSENT_SAVED",
                "revokeStage": "NA",
                "consentStart": 1404446399000,
                "consentEnd": 1437537600000,
                "consentStartString": null,
                "consentEndString": null,
                "medicalInformationNotDisclosed": true
            }
            ]
        };
    });

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should replace the element with the appropriate content for consent-card', function () {
        // Arrange
        var mockState = "MOCK_STATE";
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

    it('should open a manage modal for consent-card directive', function () {
        // Arrange
        var directiveController;
        var mockState = "success";
        $rootScope.consent = mockConsent;
        spyOn(ConsentService, 'resolveConsentState').andReturn(mockState);
        var modalPromise = $q.defer().promise;
        spyOn($modal, 'open').andReturn({result: modalPromise});

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardVm;
        directiveController.openManageConsentModal(mockConsent);

        // Assert
        expect($modal.open).toHaveBeenCalled();
    });

    it('should call ConsentService.resolveConsentState in consent-card directive', function () {
        // Arrange
        var directiveController;
        var mockState = "success";
        $rootScope.consent = mockConsent;
        spyOn(ConsentService, 'resolveConsentState').andReturn(mockState);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardVm;
        directiveController.consentState(mockConsent);

        // Assert
        expect(ConsentService.resolveConsentState).toHaveBeenCalledWith(mockConsent);
    });

    it('should call ConsentService.isShareAll in consent-card directive', function () {
        // Arrange
        var directiveController;
        var mockIsShareAll = true;
        $rootScope.consent = mockConsent;
        spyOn(ConsentService, 'isShareAll').andReturn(mockIsShareAll);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardVm;
        directiveController.isShareAll(mockConsent);

        // Assert
        expect(ConsentService.isShareAll).toHaveBeenCalledWith(mockConsent);
    });

    it('should combine non disclosed items in one array and join to a string in consent-card directive', function () {
        // Arrange
        var directiveController;
        var expectedNotDisclosedItems = 'Medications, Allergies, Mental health information sensitivity, HIV/AIDS information sensitivity';
        $rootScope.consent = mockConsent;

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardVm;
        var notDisclosedItems = directiveController.notDisclosedItems(mockConsent);

        // Assert
        expect(notDisclosedItems).toEqual(expectedNotDisclosedItems);
    });

    it('should join purpose of use items into a string in consent-card directive', function () {
        // Arrange
        var directiveController;
        var expectedPurposeOfUseItems = 'Payment, Emergency Treatment, Healthcare Treatment';
        $rootScope.consent = mockConsent;

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card consent="consent"></consent-card>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardVm;
        var notDisclosedItems = directiveController.purposeOfUseItems(mockConsent);

        // Assert
        expect(notDisclosedItems).toEqual(expectedPurposeOfUseItems);
    });

    it('should replace the element with the appropriate content for consent-card-list', function () {
        // Arrange
        function mockListConsentFn(page, success, error) {
            mockConsentList.currentPage += 1;
            success(mockConsentList);
        }

        spyOn(ConsentService, 'listConsent').andCallFake(mockListConsentFn);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card-list></consent-card-list>')($rootScope);
        // fire all the watches
        $rootScope.$digest();

        // Assert
        // Check that the compiled element contains the templated content
        // 0
        expect(element.html()).toContain(mockConsentList.consents[0].toDiscloseName);
        expect(element.html()).toContain(mockConsentList.consents[0].isMadeToName);
        expect(element.html()).toContain(mockConsentList.consents[0].doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[0].doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[0].doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[0].doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[0].shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[0].shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[0].shareForPurposeOfUseCodes[2]);
        // 1
        expect(element.html()).toContain(mockConsentList.consents[1].toDiscloseName);
        expect(element.html()).toContain(mockConsentList.consents[1].isMadeToName);
        expect(element.html()).not.toContain(mockConsentList.consents[1].doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).not.toContain(mockConsentList.consents[1].doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[1].doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[1].doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[1].shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[1].shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[1].shareForPurposeOfUseCodes[2]);
        // 2
        expect(element.html()).toContain(mockConsentList.consents[2].toDiscloseName);
        expect(element.html()).toContain(mockConsentList.consents[2].isMadeToName);
        expect(element.html()).not.toContain(mockConsentList.consents[2].doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).not.toContain(mockConsentList.consents[2].doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[2].doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[2].doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[2].shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[2].shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[2].shareForPurposeOfUseCodes[2]);
        // 3
        expect(element.html()).toContain(mockConsentList.consents[3].toDiscloseName);
        expect(element.html()).toContain(mockConsentList.consents[3].isMadeToName);
        expect(element.html()).not.toContain(mockConsentList.consents[3].doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).not.toContain(mockConsentList.consents[3].doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[3].doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[3].doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[3].shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[3].shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[3].shareForPurposeOfUseCodes[2]);
        // 4
        expect(element.html()).toContain(mockConsentList.consents[4].toDiscloseName);
        expect(element.html()).toContain(mockConsentList.consents[4].isMadeToName);
        expect(element.html()).not.toContain(mockConsentList.consents[4].doNotShareClinicalDocumentSectionTypeCodes[0]);
        expect(element.html()).not.toContain(mockConsentList.consents[4].doNotShareClinicalDocumentSectionTypeCodes[1]);
        expect(element.html()).not.toContain(mockConsentList.consents[4].doNotShareSensitivityPolicyCodes[0]);
        expect(element.html()).not.toContain(mockConsentList.consents[4].doNotShareSensitivityPolicyCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[4].shareForPurposeOfUseCodes[0]);
        expect(element.html()).toContain(mockConsentList.consents[4].shareForPurposeOfUseCodes[1]);
        expect(element.html()).toContain(mockConsentList.consents[4].shareForPurposeOfUseCodes[2]);
        // call to mock service
        expect(ConsentService.listConsent).toHaveBeenCalledWith(1, jasmine.any(Function), jasmine.any(Function));
    });

    it('should get the consent list and keep it in controller in consent-card-list', function () {
        // Arrange
        var directiveController;

        function mockListConsentFn(page, success, error) {
            mockConsentList.currentPage += 1;
            success(mockConsentList);
        }

        spyOn(ConsentService, 'listConsent').andCallFake(mockListConsentFn);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card-list></consent-card-list>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardListVm;

        // Assert
        // call to mock service
        expect(angular.equals(mockConsentList, directiveController.consentList)).toBe(true);
        expect(ConsentService.listConsent).toHaveBeenCalledWith(1, jasmine.any(Function), jasmine.any(Function));
    });

    it('should manage the pagination model in consent-card-list', function () {
        // Arrange
        var directiveController;

        function mockListConsentFn(page, success, error) {
            mockConsentList.currentPage += 1;
            success(mockConsentList);
        }

        spyOn(ConsentService, 'listConsent').andCallFake(mockListConsentFn);

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card-list></consent-card-list>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardListVm;

        // Assert
        // call to mock service
        expect(directiveController.pagination.totalItems).toEqual(mockConsentList.totalItems);
        expect(directiveController.pagination.currentPage).toEqual(mockConsentList.currentPage);
        expect(directiveController.pagination.itemsPerPage).toEqual(mockConsentList.itemsPerPage);
        expect(ConsentService.listConsent).toHaveBeenCalledWith(1, jasmine.any(Function), jasmine.any(Function));
    });

    it('should notify user using notificationService when ConsentService fails in consent-card-list', function () {
        // Arrange
        var directiveController;

        function mockListConsentFn(page, success, error) {
            mockConsentList.currentPage += 1;
            error(mockConsentList);
        }

        spyOn(ConsentService, 'listConsent').andCallFake(mockListConsentFn);
        spyOn(notificationService, 'error').andCallThrough();

        // Act
        // Compile a piece of HTML containing the directive
        var element = $compile('<consent-card-list></consent-card-list>')($rootScope);
        // fire all the watches
        $rootScope.$digest();
        directiveController = element.isolateScope().ConsentCardListVm;

        // Assert
        expect(notificationService.error).toHaveBeenCalledWith(jasmine.any(String));
        expect(ConsentService.listConsent).toHaveBeenCalledWith(1, jasmine.any(Function), jasmine.any(Function));
    });

});
