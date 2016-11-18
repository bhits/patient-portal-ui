(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(configConstants, configPropertyList) {

        var service = {};
        service.getBrandName = getBrandName;
        service.getBrandInitials = getBrandInitials;
        service.getBrandSmallLogo = getBrandSmallLogo;
        service.getBrandMediumLogo = getBrandMediumLogo;
        service.getBrandLargeLogo = getBrandLargeLogo;
        service.getOauthBasicKey = getOauthBasicKey;
        service.getPcmApiBaseUrl = getPcmApiBaseUrl;
        service.getPhrApiBaseUrl = getPhrApiBaseUrl;
        service.getTryPolicyApiBaseUrl = getTryPolicyApiBaseUrl;
        service.getUserInfo = getUserInfo;
        service.getPlsApiBaseUrl = getPlsApiBaseUrl;
        service.getTokenUrl = getTokenUrl;
        service.getVerificationUrl = getVerificationUrl;
        service.getActivationUrl = getActivationUrl;
        service.getForgotPasswordUrl = getForgotPasswordUrl;

        return service;

        function getConfigByPropertyKey(index) {
            if (configConstants !== null) {
                return accessPropertyByStringKey(configConstants, configPropertyList[index]);
            }
        }

        function getBrandName() {
            return getConfigByPropertyKey(0);
        }

        function getBrandInitials() {
            return getConfigByPropertyKey(1);
        }

        function getBrandSmallLogo() {
            return getConfigByPropertyKey(2);
        }

        function getBrandMediumLogo() {
            return getConfigByPropertyKey(3);
        }

        function getBrandLargeLogo() {
            return getConfigByPropertyKey(4);
        }

        function getOauthBasicKey() {
            return getConfigByPropertyKey(5);
        }

        function getPcmApiBaseUrl() {
            return getConfigByPropertyKey(6);
        }

        function getPhrApiBaseUrl() {
            return getConfigByPropertyKey(7);
        }

        function getTryPolicyApiBaseUrl() {
            return getConfigByPropertyKey(8);
        }

        function getUserInfo() {
            return getConfigByPropertyKey(9);
        }

        function getPlsApiBaseUrl() {
            return getConfigByPropertyKey(10);
        }

        function getTokenUrl() {
            return getConfigByPropertyKey(11);
        }

        function getVerificationUrl() {
            return getConfigByPropertyKey(12);
        }

        function getActivationUrl() {
            return getConfigByPropertyKey(13);
        }

        function getForgotPasswordUrl() {
            return getConfigByPropertyKey(14);
        }

        function accessPropertyByStringKey(obj, stringKey) {
            var parts = stringKey.split('.');
            var newObj = obj[parts[0]];
            if (parts[1]) {
                parts.splice(0, 1);
                var newString = parts.join('.');
                return accessPropertyByStringKey(newObj, newString);
            }
            return newObj;
        }
    }
})();