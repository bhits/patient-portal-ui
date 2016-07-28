/**
 * Created by cindy.ren on 7/12/2016.
 */

'use strict';

xdescribe("app.activateController", function() {

    beforeEach(module('app.account'));

    var controller, brand;

    beforeEach(function () {
        var fakeModule = angular.module('test.app.brand', function () {});
        fakeModule.config( function (brandProvider) {
            brand = brandProvider;
        });
        module('app.brand', 'test.app.brand');
        inject(function () {});
        brand.setBrandName("Brand Name");
        brand.setBrandInitial("BI");
    });

    beforeEach(inject(function($controller) {


        controller = $controller('VerificationController', {
            allowVerification: true,
            brand: brand
        });

    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct title', function(){
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Account Setup Activation');
    });

    it('should allowActivation', function(){
        expect(controller.allowVerification).toBeDefined();
        expect(controller.allowVerification).toBeTruthy();
    });

    it('should not allowActivation', function(){
        inject(function($controller) {

            controller = $controller('VerificationController', {
                allowVerification: false,
                brand: brand
            });

        });
        expect(controller.allowVerification).toBeDefined();
        expect(controller.allowVerification).toBeFalsy();
    });


});