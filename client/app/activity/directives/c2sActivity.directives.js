(function () {

    'use strict';

    angular
        .module('app.activity')
        .directive('c2sActivity', c2sActivity);

    function c2sActivity() {

        var directive = {
            restrict: 'E',
            replace: false,
            templateUrl: 'app/activity/directives/activity.html',
            scope: {},
            bindToController: {
                activitiesData: '='
            },
            controller: ActivityController,
            controllerAs: 'activityVm'
        };

        return directive;

        function ActivityController(activityService, notificationService) {
            var vm = this;
            var oldPage = vm.activitiesData.currentPage;
            vm.activities = vm.activitiesData.historyDtoList;


            vm.pagination = {
                totalItems: vm.activitiesData.totalItems,
                currentPage: oldPage,
                itemsPerPage: vm.activitiesData.itemsPerPage,
                maxSize: 10
            };
            
            vm.loadPage = loadPage;

            function loadPage() {
                var newPage = vm.pagination.currentPage;
                vm.pagination.currentPage = oldPage;
                activityService.getActivityHistoryList(newPage, success, error);
            }

            function success(response) {
                oldPage = response.currentPage;
                updatePagination(response);
                vm.activities = response.historyDtoList;
            }

            function error(response) {
                notificationService.error('Failed to get the activity history list, please try again later...');
            }

            function updatePagination(response) {
                vm.pagination.totalItems = response.totalItems;
                vm.pagination.currentPage = response.currentPage;
                vm.pagination.itemsPerPage = response.itemsPerPage;
            }
        }
    }
})();