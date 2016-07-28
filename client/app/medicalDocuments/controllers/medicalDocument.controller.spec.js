/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.MedicalDocumentsListController", function() {

    beforeEach(module('app.medicalDocument'));

    var controller, medicalDocumentsList = {data: "something"};

    beforeEach(inject(function( $controller) {
        controller = $controller('MedicalDocumentsListController', {
            medicalDocumentsList: medicalDocumentsList
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should set correct data', function(){
        expect(controller.medicalDocumentsList).toBeDefined();
        expect(controller.medicalDocumentsList).toEqual(medicalDocumentsList);
    });


});