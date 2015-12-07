
'use strict';

(function () {

    angular
        .module('app.consent')
            .directive('consentTerm', ConsentTerm);

            function ConsentTerm() {
                return {
                    restrict: 'E',
                    replace: false,
                    templateUrl: 'app/consent/directives/consent-term.tpl.html',
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