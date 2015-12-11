/**
 * Created by jiahao.li on 12/11/2015.
 */
(function () {
    'use strict';

    angular.module('app.medicalDocumentsDirectives',[])
        .directive('ppMedicalDocumentsUploadedDocuments', ppMedicalDocumentsUploadedDocuments);

    function ppMedicalDocumentsUploadedDocuments() {
        return {
            restrict: 'E',
            replace:true,
            templateUrl: 'app/medicalDocuments/tmpl/medicalDocumentsUploadedDocuments.tpl.html',
            scope: {}
        };
    }

})();