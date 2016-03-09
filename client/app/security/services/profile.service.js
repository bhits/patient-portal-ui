(function () {

    'use strict';

    angular
        .module("app.security")
        .factory('profileService', profileService);

    /* @ngInject */
    function profileService($sessionStorage, $resource, $http, envService, notificationService, tokenService, oauthConfig) {
        var phrPatientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/profile/:email", {email: '@email'});

        var service = {};

        service.getProfileFromPHR = getProfileFromPHR;
        service.loadProfile = loadProfile;
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
            return $sessionStorage.profile;
        }

        //TODO
        function setProfile(uaaProfile) {
            $sessionStorage.profile = uaaProfile;
        }

        function getUserName() {
            if (angular.isDefined(getProfile())) {
                return getProfile().user_name;
            } else {
                notificationService.error("No user profile found");
            }
        }

        function getUserId() {
            if (angular.isDefined(getProfile())) {
                return getProfile().user_id;
            } else {
                notificationService.error("No user profile found");
            }

        }

        function getName() {
            if (angular.isDefined(getProfile())) {
                return getProfile().name;
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