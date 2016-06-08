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
                // resolve: {
                //
                //     /* @ngInject */
                //     allowVerification: function ($location, $q, emailTokenService, utilityService, accountConfig) {
                //         var deferred = $q.defer();
                //         var emailTokenStr = $location.hash();
                //         var emailToken = emailTokenService.loadEmailToken(emailTokenStr);
                //
                //         emailTokenService.isValidEmailToken(emailToken, onAccessSuccess, onAccessError);
                //
                //         function onAccessSuccess(response) {
                //             emailTokenService.setEmailToken(emailToken);
                //             deferred.resolve(response);
                //         }
                //
                //         function onAccessError() {
                //             utilityService.redirectTo(accountConfig.activationErrorPath);
                //         }
                //
                //         return deferred.promise;
                //     }
                // }
            });
    }
})();
