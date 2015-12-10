
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentTerm', ppConsentTerm);

            function ppConsentTerm() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentterm.tpl.html',
                    scope: {
                        ngModel: '='
                    },
                    bindToController: true,
                    controllerAs: 'ConsentTermVm',
                    controller: ConsentTermController
                };

                return directive;

                function ConsentTermController(){
                    var ConsentTermVm = this;
                    ConsentTermVm.daterange = ConsentTermVm.ngModel;
                }
            }
})();