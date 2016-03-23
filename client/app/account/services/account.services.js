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
        var verificationResource = $resource(envService.unsecuredApis.verificationUrl);
        var activationResource = $resource(envService.unsecuredApis.activationUrl);

        var service = {};
        service.verifyPatient = verifyPatient;
        service.activatePatient = activatePatient;
        service.setVerifyInfo = setVerifyInfo;
        service.getVerifyInfo = getVerifyInfo;
        service.setUserName = setUserName;
        service.getUserName = getUserName;
        service.removeVerifyInfo = removeVerifyInfo;
        service.removeActivateInfo = removeActivateInfo;

        return service;

        function verifyPatient(verifyInfo, success, error) {
            return verificationResource.get(verifyInfo, success, error);
        }

        function activatePatient(patientInfo, success, error) {
            return activationResource.save(patientInfo, success, error);
        }

        function setVerifyInfo(verifyInfo) {
            $sessionStorage.verifyInfo = verifyInfo;
        }

        function getVerifyInfo() {
            return $sessionStorage.verifyInfo;
        }

        function setUserName(userName) {
            $sessionStorage.userName = userName;
        }

        function getUserName() {
            return $sessionStorage.userName;
        }

        function removeVerifyInfo() {
            delete $sessionStorage.verifyInfo;
        }

        function removeActivateInfo() {
            $sessionStorage.$reset();
        }
    }
})();



