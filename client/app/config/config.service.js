(function () {
    'use strict';

    angular
        .module('app.config')
        .factory('configService', configService);

    /* @ngInject */
    function configService(configConstants) {

        var service = {};
        service.getBrandName = getBrandName;
        service.getBrandInitials = getBrandInitials;
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

        function getBrandName() {
            return configConstants.branding.name;
        }

        function getBrandInitials() {
            return configConstants.branding.initials;
        }

        function getOauthBasicKey() {
            return configConstants.oauth2.client.base64BasicKey;
        }

        function getPcmApiBaseUrl() {
            return configConstants.securedApis.pcmApiBaseUrl;
        }

        function getPhrApiBaseUrl() {
            return configConstants.securedApis.phrApiBaseUrl;
        }

        function getTryPolicyApiBaseUrl() {
            return configConstants.securedApis.tryPolicyApiBaseUrl;
        }

        function getUserInfo() {
            return configConstants.securedApis.userInfo;
        }

        function getPlsApiBaseUrl() {
            return configConstants.unsecuredApis.plsApiBaseUrl;
        }

        function getTokenUrl() {
            return configConstants.unsecuredApis.tokenUrl;
        }

        function getVerificationUrl() {
            return configConstants.unsecuredApis.verificationUrl;
        }

        function getActivationUrl() {
            return configConstants.unsecuredApis.activationUrl;
        }

        function getForgotPasswordUrl() {
            return configConstants.unsecuredApis.forgotPasswordUrl;
        }
    }
})();