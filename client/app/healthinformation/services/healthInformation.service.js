(function () {

'use strict';

    angular
        .module("app.healthInformation")
            .factory('healthInformationService', healthInformationService);

            /* @ngInject */
            function healthInformationService($resource, envService){
                var patientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patientHealthData/:mrn", {mrn: '@mrn'});
                var service = {};

                service.getHealthInformationResource = getHealthInformationResource;
                service.getHealthInformation = getHealthInformation;
                service.getSectionByName = getSectionByName;
                service.getSectionCollectionByName = getSectionCollectionByName;

                function isDefineAndNotNull(value){
                    return (angular.isDefined(value) && value !== null );
                }

                function getHealthInformationResource(){
                    return patientResource;
                }

                function getHealthInformation (data){
                    if (isDefineAndNotNull(data) && isDefineAndNotNull(data.ccdaDocuments[0]) && isDefineAndNotNull(data.ccdaDocuments[0].Document)) {
                        return data.ccdaDocuments[0];
                    }else{
                        console.log("health information object missing.");
                    }
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

                return service;
            }
})();
