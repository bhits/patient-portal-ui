(function () {

    'use strict';

    angular
        .module('app.activity')
        .controller('ActivityHistoryController', ActivityHistoryController);

    /* @ngInject */
    function ActivityHistoryController(loadedData) {
        var vm = this;
        vm.paginationData = loadedData;
    }
})();