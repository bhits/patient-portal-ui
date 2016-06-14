/**
 * Created by jiahao.li on 3/17/2016.
 */

(function () {

    'use strict';

    angular
        .module('app.activity')
        .config(ActivityConfig);

    /* @ngInject */
    function ActivityConfig($stateProvider) {

        $stateProvider
            .state('fe.activity', {
                abstract: true,
                url: '/activity',
                data: {pageTitle: 'Activity'},
                templateUrl: 'app/layout/content.html'
            })
            .state('fe.activity.list', {
                url: '/activity/list',
                data: {pageTitle: 'Activity History'},
                templateUrl: 'app/activity/controllers/activityHistory.html',
                controller: 'ActivityHistoryController',
                controllerAs: 'activityHistoryVm',
                resolve: {
                    /* @ngInject */
                    loadedData: function ($q, activityService, notificationService) {
                        var success = function (response) {
                            return response;
                        };

                        var error = function (data) {
                            notificationService.error('Failed to get the activity history list, please try again later...');
                            return data;
                        };

                        var pageNumber = 1;
                        var deferred = $q.defer();

                        var activityHistoryPromise = activityService.getActivityHistoryList(pageNumber, success, error).$promise;
                        activityHistoryPromise.then(function (response) {
                            deferred.resolve(response);
                        }, function (error) {
                            deferred.reject(error);
                        });

                        return deferred.promise;
                    }
                }
            });
    }
})();
