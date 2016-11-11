/**
 * Created by cindy.ren on 7/12/2016.
 */

'use strict';

xdescribe("app.activateController", function () {

    beforeEach(module('app.account'));

    var controller;

    beforeEach(inject(function ($controller) {


        controller = $controller('VerificationController', {
            allowVerification: true
        });

    }));

    it('should create controller ', function () {
        expect(controller).toBeDefined();
    });

    it('should have correct title', function () {
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Account Setup Activation');
    });

    it('should allowActivation', function () {
        expect(controller.allowVerification).toBeDefined();
        expect(controller.allowVerification).toBeTruthy();
    });

    it('should not allowActivation', function () {
        inject(function ($controller) {

            controller = $controller('VerificationController', {
                allowVerification: false
            });

        });
        expect(controller.allowVerification).toBeDefined();
        expect(controller.allowVerification).toBeFalsy();
    });


});