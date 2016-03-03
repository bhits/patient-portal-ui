(function () {
    'use strict';

    angular.module('app.security')
        .factory('storageService', StorageService);

    /* @ngInject */
    function StorageService($sessionStorage, $localStorage, oauthConfig) {

        var service = {};

        service.getStorage = getStorage;

        return service;

        function getStorage() {
            return oauthConfig.storageType === 'local' ? $localStorage : $sessionStorage;
        }
    }
})();