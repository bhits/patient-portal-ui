
(function () {

    'use strict';

    angular
        .module("app.security")
            .factory('profileService', profileService);

            /* @ngInject */
            function profileService($resource, AccessToken, envService) {
                var phrPatientResource = $resource(envService.securedApis.phrApiBaseUrl + "/patients/:email", {email:'@email'});

                var service = {};
                var profile = {};

                service.getProfile = getProfile;
                service.setProfile = setProfile;
                service.getProfileFromUAA = getProfileFromUAA;
                service.getProfileFromPHRByEmail = getProfileFromPHRByEmail;

                return service;

                function getProfileFromUAA() {
                    var token = AccessToken.get();
                    var uaaResource = $resource(envService.oauth.profileUri,{},
                        {
                            get: {
                                method: 'GET',
                                params: {},
                                headers: { Authorization: 'Bearer ' + token.access_token, 'Content-Type': 'application/json; charset=utf-8' }
                            }
                        }
                    );

                    return uaaResource.get({},
                        function(oauthProfile){
                            profile = oauthProfile;
                        },
                        function(error){
                            console.log(error);
                        }).$promise;
                }
                function setProfile(oauthProfile) {
                    profile = oauthProfile;
                }

                function getProfile() {
                    return profile;
                }

                // TODO when needed to get profile information
                // from PHR
                function getProfileFromPHRByEmail(email) {
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