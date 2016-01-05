
(function () {

    'use strict';

    angular
        .module('app.consent')
            .controller('ConsentSignRevokeController', ConsentSignRevokeController);

             /* @ngInject */
            function ConsentSignRevokeController(loadedData, $state){
                var vm = this;
                vm.javascriptCode =loadedData;
                vm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();