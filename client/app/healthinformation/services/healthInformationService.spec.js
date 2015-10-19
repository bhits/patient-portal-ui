/**
 * Created by tomson.ngassa on 7/20/2015.
 */

'use strict';

describe('app.healthInformationService  ', function(){
    var module;

    beforeEach(function() {
        module = angular.module("app.healthInformationService");
    });

    it("should be registered", function() {
        expect(module).not.toEqual(null);
    });

    describe("Dependencies:", function() {

        var dependencies;

        var hasModule = function(m) {
            return dependencies.indexOf(m) >= 0;
        };
        beforeEach(function() {
            dependencies = module.value('app.healthInformationService').requires;
        });

        it("should have ngResource as a dependency", function() {
            expect(hasModule('ngResource')).toEqual(true);
        });
    });
});

describe('app.healthInformationService ', function() {
    var HealthInformationService, $httpBackend;

    beforeEach(module('app.config'));
    beforeEach(module('app.healthInformationService'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
            //HealthInformationService = $injector.get('HealthInformationService');
            HealthInformationService = $injector.get('HealthInformationService');
        });
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have getHealthInformationResource function', function () {
        expect(angular.isFunction(HealthInformationService.getHealthInformationResource())).toNotBe(null);
    });

    it('should get getHealthInformation data', function () {
        var ccdaDocument =  {AllergySection: {}, CCDAHeader: {}, EncounterSection:{}};
        var data = {CcdaDocuments: [ccdaDocument]};
        expect(angular.isFunction(HealthInformationService.getHealthInformation)).toBe(true);
        expect(HealthInformationService.getHealthInformation(data)).toEqual(ccdaDocument);
    });

    it('should print error message if data parameter in getHealthInformation is empty', function () {
        spyOn(console, 'log').andCallThrough();
        var emptyData = {CcdaDocuments:[]};
        HealthInformationService.getHealthInformation(emptyData);
        expect(console.log).toHaveBeenCalledWith("health information object missing.");
    });

    it('should get CCDA section by name', function () {
        var AllergySection = {Allergies: [{}], Code: {}, Name: "Allergy", Narrative: "", Title:""};
        var ccdaDocument =  {AllergySection: AllergySection, CCDAHeader: {}, EncounterSection:{}};
        expect(angular.isFunction(HealthInformationService.getSectionByName)).toBe(true);
        expect(HealthInformationService.getSectionByName(ccdaDocument, "AllergySection")).toEqual(AllergySection);
    });

    it('should print error message if data parameter in getSectionByName is empty', function () {
        spyOn(console, 'log').andCallThrough();
        var emptyData = {AllergySection: {}, CCDAHeader: {}, EncounterSection:{}};
        HealthInformationService.getSectionByName(emptyData);
        expect(console.log).toHaveBeenCalledWith("Section missing.");
    });

    it('should get section collection by name', function () {
        var allergies = [{   Author: null, EndDate: null, Name: "Penicillin",
            Reactions: [{Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT"}],
            Severity: {Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT", DisplayName: "Mild"},
            StartDate: "2011-10-19T10:32:02.367551-04:00",
            Status: "Active",
            Substance: {Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT"},
        }];
        var AllergySection = {
            Allergies: allergies,
            Code: {}, Name: "Allergy", Narrative: "", Title:""};
        var ccdaDocument =  {AllergySection: AllergySection, CCDAHeader: {}, EncounterSection:{}};
        expect(angular.isFunction(HealthInformationService.getSectionCollectionByName)).toBe(true);
        expect(HealthInformationService.getSectionCollectionByName(ccdaDocument, "AllergySection", "Allergies")).toEqual(allergies);
    });

    it('should log error message if section collection has no collection', function () {
        spyOn(console, 'log').andCallThrough();
        var allergies = [];
        var AllergySection = {
            Code: {}, Name: "Allergy", Narrative: "", Title:""};
        var ccdaDocument =  {AllergySection: AllergySection, CCDAHeader: {}, EncounterSection:{}};
        HealthInformationService.getSectionCollectionByName(ccdaDocument, "AllergySection", "Allergies");
        expect(console.log).toHaveBeenCalledWith("Section: AllergySection collection is missing.");
    });

    it('should log error message if section collection has no section', function () {
        spyOn(console, 'log').andCallThrough();
        var allergies = [];
        var AllergySection = {
            Allergies: allergies,
            Code: {}, Name: "Allergy", Narrative: "", Title:""};
        var ccdaDocument =  { CCDAHeader: {}, EncounterSection:{}};
        HealthInformationService.getSectionCollectionByName(ccdaDocument, "AllergySection", "Allergies");
        expect(console.log).toHaveBeenCalledWith("Section: AllergySection missing.");
    });

    it('should return menu toggle flags', function () {
        var allergies = [{   Author: null, EndDate: null, Name: "Penicillin",
            Reactions: [{Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT"}],
            Severity: {Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT", DisplayName: "Mild"},
            StartDate: "2011-10-19T10:32:02.367551-04:00",
            Status: "Active",
            Substance: {Code: "123456", CodeSystem: "2.16.840.1.113883.6.96", CodeSystemName: "SNOMEDCT"},
        }];
        var AllergySection = {
            Allergies: allergies,
            Code: {}, Name: "Allergy", Narrative: "", Title:""};
        var ccdaDocument =  {AllergySection: AllergySection, CCDAHeader: {}, EncounterSection:{}};
        var data = {CcdaDocuments: [ccdaDocument]};

        var result = { demographics : true, medications : false, alerts : true, results : false, encounters : false, problems : false, vitalSigns : false, procedures : false, planofcare : false, familyHistory : false, healthcareProviders : false, socialhistory : false, advancedDirectives : false, functionalStatus : false, support : false, payers : false, immunization : false, medicalEquipment : false };
        expect(HealthInformationService.calculateMenuToggleFlags(ccdaDocument)).toEqual(result);
    });

});
