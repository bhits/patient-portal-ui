
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('ConsentSignController', ConsentSignController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name ConsentSignController
             * @param loadedData {Object} The resolved data for the controller
             * @param $state {service} The ui-router state service
             *
             * @ngInject
             */
            function ConsentSignController(loadedData, $state){
                var ConsentSignVm = this;
                ConsentSignVm.javascriptCode =loadedData;
                ConsentSignVm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();