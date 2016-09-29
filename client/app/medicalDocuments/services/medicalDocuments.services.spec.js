/**
 * Created by cindy.ren on 7/5/2016.
 */

'use strict';

xdescribe('app.medicalDocumentsService', function () {

    var medicalDocumentsService, $resource, envService, $httpBackend, $scope, status, passed;

    var success = function (data) {
        status = data.status;
        passed = true;
    };

    var error = function (error) {
        status = error.status;
        passed = false;
    };

    beforeEach(module('app.config'));
    beforeEach(module('app.medicalDocument'));
    beforeEach(module('ngMock'));

    beforeEach(inject(function (_medicalDocumentsService_, _$resource_, _$rootScope_, _envService_, $injector) {
        medicalDocumentsService = _medicalDocumentsService_;
        $resource = _$resource_;
        $scope = _$rootScope_.$new();
        envService = _envService_;
        $httpBackend = $injector.get('$httpBackend');

        passed = null;
        status = null;
    }));

    it('should download medical document (downloadMedicalDocument)', function () {
        $httpBackend.expect('GET', "/pcm/patients/consents/attested").respond(200, "success");
        medicalDocumentsService.downloadMedicalDocument("consent.service.spec.js", success, error);
    });

    it('should delete medical document (deleteMedicalDocument)', function () {
        $httpBackend.expect('DELETE', "/pcm/patients/clinicaldocuments/%5Bobject%20Object%5D").respond(200, {id: 111});
        status = medicalDocumentsService.deleteMedicalDocument({id: 111}, success, error);
        $httpBackend.flush();
        expect(passed).toBeTruthy();
    });

    it('should fail delete medical document (deleteMedicalDocument)', function () {
        $httpBackend.expect('DELETE', "/pcm/patients/clinicaldocuments").respond(0, "error");
        status = medicalDocumentsService.deleteMedicalDocument(undefined, success, error);
        $httpBackend.flush();
        expect(status).toEqual(0);
        expect(passed).toBeFalsy();
    });

    it('should upload medical document (uploadMedicalDocument)', function () {
        var document = {
            file: "document.doc",
            name: "name",
            description: "description",
            documentType: "doc"
        };
        $httpBackend.expect('POST', "/pcm/patients/clinicaldocuments").respond(200, document);

        medicalDocumentsService.uploadMedicalDocument(document, success, error);
        $httpBackend.flush();
        expect(passed).toBeTruthy();
    });

});