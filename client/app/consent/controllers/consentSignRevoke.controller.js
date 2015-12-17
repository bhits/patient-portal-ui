
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('ConsentSignRevokeController', ConsentSignRevokeController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name ConsentSignRevokeController
             * @param loadedData {Object} The resolved data for the controller
             * @param $state {service} The ui-router state service
             *
             * @ngInject
             */
            function ConsentSignRevokeController(loadedData, $state){
                var vm = this;
                vm.javascriptCode =loadedData;
                vm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();