/**
 * Created by cindy.ren on 7/13/2016.
 */

'use strict';

describe("app.ConsentESignatureController", function() {

    beforeEach(module('app.consent'));

    var controller;
    var consentAttestation = ["providers", "purposeOfUse", "sensitivityPolicies", "consent"];

    beforeEach(inject(function( $controller) {

        controller = $controller('ConsentESignatureController', {
            consentAttestation: consentAttestation
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should set correct data', function(){
        expect(controller.attestation).toEqual(consentAttestation);
    });


});