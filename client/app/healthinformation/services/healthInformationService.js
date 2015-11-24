(function () {

'use strict';

    function HealthInformationService($resource, ENVService){
        var patientResource = $resource(ENVService.securedApis.phrApiBaseUrl + "/patientHealthData/:mrn", {mrn: '@mrn'});

        var isDefineAndNotNull = function(value){
            return (angular.isDefined(value) && value !== null );
        };

        return {
            /**
             * Gets the Health Information resource object
             * @returns {Object} patientResource - The patient resource object
             */
            getHealthInformationResource: function(){
                return patientResource;
            },

            /**
             * Gets the Health Information object
             * @returns {Object} health Information - The Health Information object
             */
            getHealthInformation: function(data){
                if (isDefineAndNotNull(data) && isDefineAndNotNull(data.documents[0]) && isDefineAndNotNull(data.documents[0].CcdaDocuments)) {
                    return data.documents[0].CcdaDocuments;
                }else{
                    console.log("health information object missing.");
                }
            },

            getSectionByName: function(data, sectionName){
                if(isDefineAndNotNull(data) && isDefineAndNotNull(data[sectionName])){
                    return data[sectionName];
                }else{
                    console.log("Section missing.");
                }
            },

            getSectionCollectionByName: function(data, sectionName, collectionName){
                if(isDefineAndNotNull(data) && isDefineAndNotNull(data[sectionName])){
                    var section = data[sectionName];
                    if(isDefineAndNotNull(section[collectionName])){
                        return section[collectionName];
                    }else{
                        console.log("Section: " + sectionName + " collection is missing.");
                    }
                }else{
                    console.log("Section: " + sectionName + " missing.");
                }
            },

            /**
             * Determines the flags to toggle the menu.
             *
             * @param nameOfSection - The name of the section.
             */
            calculateMenuToggleFlags: function(ccdaData){
                var menuItems = {
                    demographics: isDefineAndNotNull(ccdaData.CCDAHeader),
                    medications: isDefineAndNotNull(ccdaData.MedicationSection),
                    alerts: isDefineAndNotNull(ccdaData.AllergySection),
                    results: isDefineAndNotNull(ccdaData.ResultSection),
                    //encounters: isDefineAndNotNull(ccdaData.EncounterSection),
                    encounters: false,
                    problems: isDefineAndNotNull(ccdaData.ProblemSection),
                    //vitalSigns: isDefineAndNotNull(ccdaData.VitalSignSection),
                    vitalSigns: false,
                    procedures: isDefineAndNotNull(ccdaData.ProcedureSection),
                    planofcare: isDefineAndNotNull(ccdaData.PlanOfCareSection),
                    familyHistory: isDefineAndNotNull(ccdaData.FamilyHistorySection),
                    healthcareProviders: isDefineAndNotNull(ccdaData.HealthcareProvidersSection),
                    socialhistory: isDefineAndNotNull(ccdaData.SocialHistorySection),
                    advancedDirectives: isDefineAndNotNull(ccdaData.AdvancedDirectivesSection),
                    functionalStatus:  isDefineAndNotNull(ccdaData.FunctionalStatusSection),
                    support: isDefineAndNotNull(ccdaData.SupportSection),
                    payers: isDefineAndNotNull(ccdaData.PayersSection),
                    immunization: isDefineAndNotNull(ccdaData.ImmunizationSection),
                    medicalEquipment: isDefineAndNotNull(ccdaData.MedicalEquipmentSection)
                };
                return menuItems;
            }
        };
    }


    angular.module("app.healthInformationService", ['ngResource', 'app.config'])
     .factory('HealthInformationService', HealthInformationService);
})();