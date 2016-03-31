(function () {
    'use strict';

    angular.module('app.security')
        .factory('authenticationService', authenticationService);

    /* @ngInject */
    function authenticationService($resource, envService, oauthTokenService, utilityService, oauthConfig) {
        var loginResource = function (userName, password) {
            return $resource(envService.unsecuredApis.tokenUrl, {},
                {
                    save: {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + envService.base64BasicKey,
                            'Content-Type' : 'application/x-www-form-urlencoded'},
                        params: {
                            'grant_type': 'password',
                            'password': password,
                            'username': userName
                        },
                        transformRequest: function (data, headersGetter) {
                            var str = [];
                            for (var d in data){
                                str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                            }
                            return str.join("&");
                        }
                    }
                });
        };

        var service = {};
        service.login = login;
        service.logout = logout;

        return service;

        function login(userName, password) {
            var getLoginResource = loginResource(userName, password);
            return getLoginResource.save().$promise;
        }

        function logout() {
            oauthTokenService.removeToken();
            utilityService.redirectTo(oauthConfig.loginPath);
        }
    }
})();