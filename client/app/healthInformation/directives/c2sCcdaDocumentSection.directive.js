(function () {
    'use strict';

    angular
        .module('app.healthInformation')
        .directive('c2sCcdaDocumentSection', c2sCcdaDocumentSection);

    function c2sCcdaDocumentSection() {

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

        function CCDADocumentSectionController() {
            var vm = this;
        }
    }
})();