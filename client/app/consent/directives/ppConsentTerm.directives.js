
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('ppConsentTerm', ppConsentTerm);

            function ppConsentTerm() {
                return {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consentTerm.tpl.html',
                    scope: {
                        ngModel: '='
                    },
                    bindToController: true,
                    controllerAs: 'ConsentTermVm',
                    controller: ['$scope', function ($scope) {
                        var ConsentTermVm = this;
                        ConsentTermVm.daterange = ConsentTermVm.ngModel;
                    }]
                };
            }
})();