/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

(function () {

    angular.module("app.activity")
        .factory('auditService', auditService);

        /* @ngInject */
        function auditService($resource,$http, envService, utilityService, notificationService) {
            var auditHistoryResource = $resource(envService.securedApis.pcmApiBaseUrl + "/activity");


            var service = {};
            service.getAuditHistory= getAuditHistory;

            return service;

            function getAuditHistory(success, error){
                return auditHistoryResource.query(success, error);
            }

        }
})();
