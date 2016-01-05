(function () {
    'use strict';

    angular
        .module('app.healthInformation')
            .directive('ppCcdaDocumentSection', ppCcdaDocumentSection);

            function ppCcdaDocumentSection() {

                var directive = {
                    restrict: 'E',
                    scope: {
                        section: '='
                    },
                    bindToController: true,
                    templateUrl: "app/healthInformation/directives/ccdaDocumentSection.html",
                    controllerAs: 'ccdaDocumentSectionVm',
                    controller: CCDADocumentSectionController
                };

                return directive;

                function CCDADocumentSectionController(){
                    var Vm = this;
                }
            }
})();