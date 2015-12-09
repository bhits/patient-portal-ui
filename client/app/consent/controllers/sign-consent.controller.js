
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('SignConsentController', SignConsentController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name SignConsentController
             * @param loadedData {Object} The resolved data for the controller
             * @param $state {service} The ui-router state service
             *
             * @ngInject
             */
            function SignConsentController(loadedData, $state){
                var SignConsentVm = this;
                SignConsentVm.javascriptCode =loadedData;
                SignConsentVm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();