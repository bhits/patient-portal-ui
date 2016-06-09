
(function () {

    'use strict';

    angular
        .module('app.activity')
            .controller('ActivityHistoryController', ActivityHistoryController);

             /* @ngInject */
            function ActivityHistoryController(auditList){
                var vm = this;
               vm.auditHistory = auditList;
            }
})();