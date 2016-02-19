
(function () {

    'use strict';

    angular
        .module("app.security")
            .factory('profileService', profileService);

            /* @ngInject */
            function profileService($resource, envService, notificationService) {
                var phrPatientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/profile/:email", {email:'@email'});

                var service = {};
                var profile = {};

                service.getProfileFromPHR = getProfileFromPHR;
                service.setOauthProfile = setOauthProfile;
                service.getProfile = getProfile;
                service.getUserName = getUserName;
                service.getName = getName;
                service.getUserId = getUserId;

                return service;

                function setOauthProfile (oauthProfile){
                    profile = oauthProfile;
                }

                function getProfile(){
                    return profile;
                }

                function getUserName(){
                    if(angular.isDefined(profile.user_name)){
                        return profile.user_name;
                    }else{
                        notificationService.error("No user profile found");
                    }

                }
                function getUserId(){
                    if(angular.isDefined(profile.user_id)){
                        return profile.user_id;
                    }else{
                        notificationService.error("No user profile found");
                    }

                }

                function getName(){
                    if(angular.isDefined(profile.name)){
                        return profile.name;
                    }else{
                        notificationService.error("No user profile found");
                    }

                }

                function getProfileFromPHR(email) {
                    phrPatientResource.get({email: email},
                    function(response){
                        console.log(response);
                    },
                    function(response){
                        console.log(response);
                    });
                }
            }
})();