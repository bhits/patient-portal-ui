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
                if (isDefineAndNotNull(data) && isDefineAndNotNull(data.ccdaDocuments[0]) && isDefineAndNotNull(data.ccdaDocuments[0].Document)) {
                    return data.ccdaDocuments[0];
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
            }
        };
    }


    angular.module("app.healthInformationService", ['app.core', 'app.config'])
     .factory('HealthInformationService', HealthInformationService);
})();
