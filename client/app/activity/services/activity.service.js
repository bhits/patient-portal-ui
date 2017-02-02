/**
 * Created by tomson.ngassa on 9/30/2015.
 */

'use strict';

(function () {

    angular.module("app.activity")
        .factory('activityService', activityService);

    /* @ngInject */
    function activityService($resource, configService) {

        var patientListResource = $resource(configService.getPcmApiBaseUrl() + "/activities/pageNumber",
            {pageNumber: '@pageNumber'},
            {
                'query': {
                    method: 'GET',
                    params: {pageNumber: '@pageNumber'}
                }
            }
        );

        var service = {};

        service.getActivityHistoryList = getActivityHistoryList;

        return service;

        function getActivityHistoryList(page, success, error) {
            function adjustPageOnSuccessResponse(response) {
                if (angular.isDefined(response.currentPage) && angular.isNumber(response.currentPage)) {
                    response.currentPage += 1;
                }
                (success || angular.identity)(response);
            }

            return patientListResource.query({pageNumber: page - 1}, adjustPageOnSuccessResponse, error);
        }
    }
})();