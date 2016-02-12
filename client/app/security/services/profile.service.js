
(function () {

    'use strict';

    angular
        .module("app.security")
            .factory('profileService', profileService);

            /* @ngInject */
            function profileService() {

                var service = {};
                var profile = {};

                service.getProfile = getProfile;
                service.setProfile = setProfile;

                return service;

                function getProfile() {
                    return profile;
                }
                function setProfile(oauthProfile) {
                    profile = oauthProfile;
                }


            }
})();