
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentTerm', ppConsentTerm);

            function ppConsentTerm() {

                var directive = {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentTerm.tpl.html',
                    scope: {
                        ngModel: '='
                    },
                    bindToController: true,
                    controllerAs: 'consentTermVm',
                    controller: ConsentTermController
                };

                return directive;

                function ConsentTermController(){
                    var Vm = this;
                    Vm.daterange = Vm.ngModel;
                }
            }
})();