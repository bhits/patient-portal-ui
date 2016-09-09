/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

xdescribe('app.c2sCcdaDocumentDirective', function() {
    var healthInformationService, controller, $scope, $httpBackend, $templateCache, template;

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
        CDAdocuments: [exampleDocument,'doc2.doc'],
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
        $httpBackend.whenGET('app/healthInformation/directives/ccdaDocumentSection.html').respond(200, '');

        $templateCache = _$templateCache_.get("app/healthInformation/directives/ccdaDocument.html");
        _$templateCache_.put('app/healthInformation/directives/ccdaDocument.html', $templateCache);

        $scope = _$rootScope_.$new();

        var element = angular.element('<c2sCcdaDocument document="document"></c2sCcdaDocument>');
        $scope.document = healthInfo;

        $compile(element)($scope);
        element.append($templateCache);
        $scope.$digest();

        // controller = _$controller_('CCDADocumentController', {
        //     //$scope: $scope,
        //     healthInformationService: _healthInformationService_
        // }, healthInfo);
        // console.log(controller);
    }));

    it('should test directive in c2sCcdaDocument', function(){
        // /var templateHTML = template.html();
        // /expect(controller).toContain('Document Type');
        // /expect(element.scope().document).toBe('document');
    });

});
