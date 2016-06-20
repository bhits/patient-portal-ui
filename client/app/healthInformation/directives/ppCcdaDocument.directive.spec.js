/**
 * Created by cindy.ren on 6/15/2016.
 */

xdescribe('app.ppCcdaDocumentDirective', function() {
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
    beforeEach(module('app/healthInformation/directives/ccdaDocument.html'));


    beforeEach(inject(function (_healthInformationService_, $compile,
                                _$controller_, _$rootScope_, _$httpBackend_,
                                _$templateCache_) {
        healthInformationService = _healthInformationService_;
        $httpBackend = _$httpBackend_;
        $templateCache = _$templateCache_.get("app/healthInformation/directives/ccdaDocument.html");
        _$templateCache_.put('app/healthInformation/directives/ccdaDocument.html', $templateCache);

        $scope = _$rootScope_.$new();
        $scope.document = "document";

        element = angular.element("<ppCcdaDocument></ppCcdaDocument>");
        template = $compile(element)($scope);
        template.append($templateCache);
        $scope.$digest();

        controller = _$controller_('CCDADocumentController', {
            healthInformationService: healthInformationService
        }, healthInfo);

        $httpBackend.whenGET('app/healthInformation/directives/ccdaDocument.html').respond(200, '');
    }));

    it("should test that CCDADocumentController initiated correctly", function () {
        controller.this = healthInfo;
        expect(controller.cdaDocument).toEqual(exampleDocument);
        expect(controller.patient).toEqual(patient);
        expect(controller.authors).toEqual(['author1','author2']);
        expect(controller.contactInfo).toEqual({email: 'emailToken=janeDoe@gmail.com', address: '1122 Address Lane'});
        expect(controller.address).toBe('1122 Address Lane');
        expect(controller.sections).toBe('Section 1');
        expect(controller.treatment).toBe('Treatment 1');
    });

    it('should test directive in ppCcdaDocument', function(){
        controller.this = healthInfo;
        var templateHTML = template.html();
        expect(templateHTML).toContain('ccdaDocumentVm.cdaDocument.type');
        expect(element.scope().document).toBe('document');
    });

});
