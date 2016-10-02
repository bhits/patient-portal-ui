(function () {

    'use strict';

    angular
        .module("app.healthInformation")
        .factory('healthInformationService', healthInformationService);

    /* @ngInject */
    function healthInformationService($resource, envService) {
        var healthInformationResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/healthInformation");
        var service = {};

        service.getHealthInformation = getHealthInformation;
        service.getSectionByName = getSectionByName;
        service.getSectionCollectionByName = getSectionCollectionByName;
        service.getCDADocument = getCDADocument;

        return service;

        function getHealthInformation(success, error) {
            return healthInformationResource.get(success, error);
        }

        function getSectionByName(data, sectionName) {
            if (isDefineAndNotNull(data) && isDefineAndNotNull(data[sectionName])) {
                return data[sectionName];
            } else {
                console.log("Section missing.");
            }
        }

        function getSectionCollectionByName(data, sectionName, collectionName) {
            if (isDefineAndNotNull(data) && isDefineAndNotNull(data[sectionName])) {
                var section = data[sectionName];
                if (isDefineAndNotNull(section[collectionName])) {
                    return section[collectionName];
                } else {
                    console.log("Section: " + sectionName + " collection is missing.");
                }
            } else {
                console.log("Section: " + sectionName + " missing.");
            }
        }

        function getCDADocument(document) {
            if (isDefineAndNotNull(document) && isDefineAndNotNull(document.CDAdocuments) && isDefineAndNotNull(document.CDAdocuments.length > 0)) {
                return document.CDAdocuments[0];
            } else {
                console.log("Error getting CDA Document from Documents.");
                console.log(document);
            }
        }

        function isDefineAndNotNull(value) {
            return (angular.isDefined(value) && value !== null );
        }
    }
})();
