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

    beforeEach(module('app.healthInformationService'));

    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            $httpBackend = $injector.get('$httpBackend');
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

    xit('should have getCCDAHeader function', function () {
        expect(angular.isFunction(HealthInformationService.getCCDAHeader)).toBe(true);
    });

    xit('should get CCDAHeader ', function () {
        var data = {
                        "CCDAHeader": {
                            Assignment: "Allopathic and Osteopathic Physicians",
                            AuthorOfRecord: "Henry Seven",
                            DateRecordDeveloped: "0001-01-01T00:00:00",
                            InformationRecipient: "Henry Seven, Good Health Clinic",
                            LegalAuthenticator: "Henry Seven"
                        }
        };
        expect(HealthInformationService.getCCDAHeader(data)).toEqual(data.CCDAHeader);

        var data1 = {};
        expect(HealthInformationService.getCCDAHeader(data1)).toEqual();
    });

    xit('should get Patient Demographics ', function () {
        var data = {
            "CCDAHeader":{
                "PatientDemographicInfo": {
                    Address: "17 Daws Street, Blue Bell MA 02368 USA",
                    BirthDate: "10/20/1956",
                    ContactInfo: "(781) 555-1212",
                    Ethnicity: "Not Hispanic or Latino",
                    FirstName: "Albert FROM IExHub"
                }
            }
        };
        expect(HealthInformationService.getPatientDemographics(data)).toEqual(data.CCDAHeader.PatientDemographicInfo);

        var data1 = {};
        expect(HealthInformationService.getPatientDemographics(data1)).toEqual();
    });

    xit('should get Allergies ', function () {
        var data = {
            "ContinuityCareDocument": {
                "AllergySection": {
                    "Allergies": [{Reaction: "Hives", Status: "Active", Name: "Penicillin"}]
                }
            }
        };

        expect(HealthInformationService.getAllergies(data)).toEqual(data.ContinuityCareDocument.AllergySection.Allergies);

        var data1 = {};
        expect(HealthInformationService.getAllergies(data1)).toEqual();
    });

    xit('should get Medications  ', function () {
        var data = {
            "ContinuityCareDocument": {
                "MedicationSection": {
                    "Medications": [{EndDate: null, FillInstructions: "Generic Substitution Allowed", Indications: "Depression", Instructions: "Two times a day", Name: "Sertraline 20 MG/ML Oral Solution [Zoloft]", PrescribingPhysician: "Dr. Chris White", PrescriptionFilledBy: "Good Health Clinic, 21 North Avenue, Burlington MA 02368", StartDate: "0001-01-01T00:00:00.0001988", Status: "Active"}]
                }
            }
        };

        expect(HealthInformationService.getMedications(data)).toEqual(data.ContinuityCareDocument.MedicationSection.Medications);

        var data1 = {};
        expect(HealthInformationService.getMedications(data1)).toEqual();
    });

    xit('should get Problem List   ', function () {
        var data = {
            "ContinuityCareDocument": {
                "ProblemListSection": {
                    "Problems": [{EndDate: null, Name: "Hypertension, essential", StartDate: "0001-01-01T00:00:00.0001998", Status: "Active"}]
                }
            }
        };

        expect(HealthInformationService.getProblemList(data)).toEqual(data.ContinuityCareDocument.ProblemListSection.Problems);

        var data1 = {};
        expect(HealthInformationService.getProblemList(data1)).toEqual();
    });

    xit('should get Procedures    ', function () {
        var data = {
            "ContinuityCareDocument": {
                "ProceduresSection": {
                    "Procedures": [{AttendingPhyscian: "Dr. Chris White", Date: "0001-01-01T00:00:00.0001996", Facility: "Acute Care Hospital 107 Lincoln Street Worcester Massachusetts 01605",
                        Indications: "Preventative, Pre-cancerous", Name: "Colonic Polypectomy", Specimens: "colonic polyp sample", Status: "Completed"}]
                }
            }
        };

        expect(HealthInformationService.getProcedures(data)).toEqual(data.ContinuityCareDocument.ProceduresSection.Procedures);

        var data1 = {};
        expect(HealthInformationService.getProcedures(data1)).toEqual();
    });

    xit('should get Result    ', function () {
        var data = {
            "ContinuityCareDocument": {
                "ResultsSection": {
                    "Results": [{DateReported: "0001-01-01T00:00:00.0001994", Lab: "Acute Care Hospital 107 Lincoln Street Worcester Massachusetts 01605", Name: "Blood Test", SpecificTest: "Hemoglobin Levels", TestResults: "13.2 g/dl - Normal (Ranges:13-18 g/dl)"}]
                }
            }
        };

        expect(HealthInformationService.getResult(data)).toEqual(data.ContinuityCareDocument.ResultsSection.Results);

        var data1 = {};
        expect(HealthInformationService.getResult(data1)).toEqual();
    });

});
