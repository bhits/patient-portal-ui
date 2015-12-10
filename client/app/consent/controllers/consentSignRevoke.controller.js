
'use strict';

(function () {

    angular
        .module('app.consent')
            .controller('SignRevokeConsentController', SignRevokeConsentController);

            /**
             * @memberof app.consent
             * @ngdoc controller
             * @name SignRevokeConsentController
             * @param loadedData {Object} The resolved data for the controller
             * @param $state {service} The ui-router state service
             *
             * @ngInject
             */
            function SignRevokeConsentController(loadedData, $state){
                var SignRevokeConsentVm = this;
                SignRevokeConsentVm.javascriptCode =loadedData;
                SignRevokeConsentVm.close = Close;

                function Close() {
                    $state.go('fe.consent.list');
                }
            }
})();