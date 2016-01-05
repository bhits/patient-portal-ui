
(function () {

'use strict';
    
    function NoDataAlert() {
        return {
            restrict: 'E',
            scope: {
                data: "="
            },
            template: '<div class="alert alert-warning " role="alert" ng-show="data.length == 0">' +
            'No data is available.' +
            '</div>',
            link: function ($scope, $element) {
            }
        };
    }

    function ppCcdaDocument() {

        var directive = {
            restrict: 'E',
            scope: {
                document: '='
            },
            bindToController: true,
            templateUrl: "app/healthinformation/tmpl/ccdaDocument.html",
            controllerAs: 'ccdaDocumentVm',
            controller: CCDADocumentController
        };

        return directive;

        function CCDADocumentController(HealthInformationService){
            var Vm = this;
            Vm.patient = HealthInformationService.getSectionByName(Vm.document, 'patient');
            Vm.author = HealthInformationService.getSectionByName(Vm.document, 'author');
            Vm.sections = HealthInformationService.getSectionByName(Vm.document, 'section');
            Vm.treatment = HealthInformationService.getSectionByName(Vm.document, 'treatment');
        }
    }

    function ppCcdaDocumentSection() {

        var directive = {
            restrict: 'E',
            scope: {
                section: '='
            },
            bindToController: true,
            templateUrl: "app/healthinformation/tmpl/ccdaDocumentSection.html",
            controllerAs: 'ccdaDocumentSectionVm',
            controller: CCDADocumentSectionController
        };

        return directive;

        function CCDADocumentSectionController(){
            var Vm = this;
        }
    }

    /**
     *  The patient health information directives
     *
     */
    angular.module('app.healthInformationDirectivesModule', [])
        .directive('noDataAlert',NoDataAlert)
        .directive('ppCcdaDocument',ppCcdaDocument)
        .directive('ppCcdaDocumentSection',ppCcdaDocumentSection);

})();
