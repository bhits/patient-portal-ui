/**
 * Created by cindy.ren on 6/20/2016.
 */

'use strict';

xdescribe('app.c2sCcdaDocumentSectionDirective ', function() {
    var healthInformationService, controller, $scope, $httpBackend, element, $templateCache, template;

    var patient = {
        name: 'Jane Doe',
        contactInfo: {
            email: 'emailToken=janeDoe@gmail.com',
            address: '1122 Address Lane'
        }
    };
    var exampleDocument = {
        targetPatient: patient,
        authors: ['author1','author2'],
        sections: 'Section 1',
        treatment: 'Treatment 1'
    };
    var healthInfo = {
        document: {
            CDAdocuments: [exampleDocument,'doc2.doc'],
        },
        type: 'Document Type',
        date: '06/20/2016',
        title: 'Test Title'
    };


    beforeEach(module('app.config'));
    beforeEach(module('app.core'));
    beforeEach(module('app.core'));
    beforeEach(module('app.healthInformation'));
    beforeEach(module('app/healthInformation/directives/ccdaDocumentSection.html'));


    beforeEach(inject(function (_healthInformationService_, $compile,
                                _$controller_, _$rootScope_, _$httpBackend_,
                                _$templateCache_) {
        healthInformationService = _healthInformationService_;
        $httpBackend = _$httpBackend_;
        $templateCache = _$templateCache_.get("app/healthInformation/directives/ccdaDocumentSection.html");
        _$templateCache_.put('app/healthInformation/directives/ccdaDocumentSection.html', $templateCache);

        $scope = _$rootScope_.$new();
        $scope.document = "document";

        element = angular.element("<c2sCcdaDocument></c2sCcdaDocument>");
        template = $compile(element)($scope);
        template.append($templateCache);
        $scope.$digest();

        controller = _$controller_('CCDADocumentSectionController', {
            healthInformationService: healthInformationService
        }, healthInfo);

        $httpBackend.whenGET('app/healthInformation/directives/ccdaDocumentSection.html').respond(200, '');
    }));

    it("should test that CCDADocumentController initiated correctly", function () {
        controller.this = healthInfo;
        expect(controller.type).toEqual("Document Type");
    });


});
