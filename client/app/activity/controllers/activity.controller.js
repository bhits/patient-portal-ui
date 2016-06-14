
(function () {

    'use strict';

    angular
        .module('app.activity')
            .controller('ActivityHistoryController', ActivityHistoryController);

             /* @ngInject */
            function ActivityHistoryController(activityList){
                var vm = this;
               vm.activityHistory = activityList;
            }
})();