(function () {

'use strict';

    angular
        .module("app.healthInformation")
            .factory('healthInformationService', healthInformationService);

            /* @ngInject */
            function healthInformationService($resource, envService){
                var patientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/healthInformation/:mrn", {mrn: '@mrn'});
                var service = {};

                service.getHealthInformationResource = getHealthInformationResource;
                service.getSectionByName = getSectionByName;
                service.getSectionCollectionByName = getSectionCollectionByName;
                service.getCDADocument = getCDADocument;
                service.getDocuments = getDocuments;

                function isDefineAndNotNull(value){
                    return (angular.isDefined(value) && value !== null );
                }

                function getHealthInformationResource(){
                    return patientResource;
                }


                function getSectionByName(data, sectionName){
                    if(isDefineAndNotNull(data) && isDefineAndNotNull(data[sectionName])){
                        return data[sectionName];
                    }else{
                        console.log("Section missing.");
                    }
                }

                function getSectionCollectionByName (data, sectionName, collectionName){
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

                function getCDADocument(document){
                    if(isDefineAndNotNull(document) && isDefineAndNotNull(document.CDAdocuments) && isDefineAndNotNull(document.CDAdocuments.length > 0)){
                        return document.CDAdocuments[0];
                    }else{
                        console.log("Error getting CDA Document from Documents." );
                        console.log(document);
                    }
                }

                function getDocuments(patientData){
                    if(isDefineAndNotNull(patientData) && (patientData.length > 0) && isDefineAndNotNull(patientData[0].Documents) ){
                        return patientData[0].Documents;
                    }else{
                        console.log("Error getting Documents." );
                        console.log(patientData);
                    }
                }
                return service;
            }
})();
