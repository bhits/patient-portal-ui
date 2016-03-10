(function () {

    'use strict';

    angular
        .module("app.security")
        .factory('profileService', profileService);

    /* @ngInject */
    function profileService($sessionStorage, $resource, envService, notificationService) {
        var phrPatientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/profile/:email", {email: '@email'});
        var profileResource = $resource(envService.securedApis.userInfo);

        var service = {};

        service.getProfileFromPHR = getProfileFromPHR;
        service.loadProfile = loadProfile;
        service.setProfile = setProfile;
        service.getUserName = getUserName;
        service.getName = getName;
        service.getUserId = getUserId;

        return service;

        function loadProfile() {
            return profileResource.get().$promise;
        }

        function getProfile() {
            return $sessionStorage.profile;
        }

        function setProfile(uaaProfile) {
            $sessionStorage.profile = uaaProfile;
        }

        function getUserName() {
            if (angular.isDefined(getProfile())) {
                return getProfile().user_name;
            } else {
                notificationService.error("No userName found");
            }
        }

        function getUserId() {
            if (angular.isDefined(getProfile())) {
                return getProfile().user_id;
            } else {
                notificationService.error("No userId found");
            }

        }

        function getName() {
            if (angular.isDefined(getProfile())) {
                return getProfile().name;
            } else {
                notificationService.error("No user fullName found");
            }

        }

        function getProfileFromPHR(email) {
            phrPatientResource.get({email: email},
                function (response) {
                    console.log(response);
                },
                function (response) {
                    console.log(response);
                });
        }
    }
})();