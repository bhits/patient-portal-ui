(function () {

    'use strict';

    angular
        .module("app.security")
        .factory('profileService', profileService);

    /* @ngInject */
    function profileService($resource, $http, envService, notificationService, tokenService, oauthConfig) {
        var phrPatientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/profile/:email", {email: '@email'});

        var service = {};
        var profile;

        service.getProfileFromPHR = getProfileFromPHR;
        service.loadProfile = loadProfile;
        service.getProfile = getProfile;
        service.setProfile = setProfile;
        service.getUserName = getUserName;
        service.getName = getName;
        service.getUserId = getUserId;

        return service;

        function loadProfile(success, error) {
            return $http({
                method: 'GET',
                url: oauthConfig.getUserInfo,
                headers: {'Authorization': 'Bearer ' + tokenService.getAccessToken()}
            })
                .success(success)
                .error(error);
        }

        function getProfile() {
            return profile;
        }

        function setProfile(uaaProfile) {
            profile = uaaProfile;
        }

        function getUserName() {
            if (angular.isDefined(profile.user_name)) {
                return profile.user_name;
            } else {
                notificationService.error("No user profile found");
            }
        }

        function getUserId() {
            if (angular.isDefined(profile.user_id)) {
                return profile.user_id;
            } else {
                notificationService.error("No user profile found");
            }

        }

        function getName() {
            if (angular.isDefined(profile.name)) {
                return profile.name;
            } else {
                notificationService.error("No user profile found");
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