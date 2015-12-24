
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('ConsentSignController', ConsentSignController);

            /* @ngInject */
            function ConsentSignController(loadedData, $state){
                var vm = this;
                vm.javascriptCode =loadedData;
                vm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();