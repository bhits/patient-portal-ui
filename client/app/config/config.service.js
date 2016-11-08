(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(configConstants) {

        var service = {};
        service.getOauthBasicKey = getOauthBasicKey;

        return service;

        function getOauthBasicKey() {
            return configConstants.oauth2.client.base64BasicKey;
        }
    }
})();