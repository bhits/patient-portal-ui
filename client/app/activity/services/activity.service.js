/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

(function () {

    angular.module("app.activity")
        .factory('activityService', activityService);

        /* @ngInject */
        function activityService($resource, envService) {
            var activityHistoryResource = $resource(envService.securedApis.pcmApiBaseUrl + "/activities");


            var service = {};
            service.getActivityHistory= getActivityHistory;

            return service;

            function getActivityHistory(success, error){
                return activityHistoryResource.query(success, error);
            }

        }
})();
