/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {
    'use strict';

    /**
     * The Account Service
     *
     */
    angular
        .module("app.account")
        .factory('accountService', accountService);

    /* @ngInject */
    function accountService($resource, $sessionStorage, envService) {
        var verificationResource = $resource(envService.securedApis.patientUserApiBaseUrl + "/verifications");
        var activationResource = $resource(envService.securedApis.patientUserApiBaseUrl + "/activations");

        var service = {};
        service.verifyPatient = verifyPatient;
        service.activatePatient = activatePatient;
        service.setVerifyInfo = setVerifyInfo;
        service.removeVerifyInfo = removeVerifyInfo;

        return service;

        function verifyPatient(verifyInfo, success, error) {
            verificationResource.get(verifyInfo, success, error);
        }

        function activatePatient(patientInfo, success, error) {
            activationResource.save(patientInfo, success, error);
        }

        function setVerifyInfo(verifyInfo) {
            $sessionStorage.verifyInfo = verifyInfo;
        }

        function removeVerifyInfo() {
            delete $sessionStorage.verifyInfo;
        }
    }
})();



