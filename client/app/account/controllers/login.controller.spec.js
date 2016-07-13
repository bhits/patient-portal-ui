/**
 * Created by tomson.ngassa on 7/20/2015.
 * Modified by cindy.ren on 6/13/2016
 */

'use strict';

describe("app.login.controller ", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('app.brand'));

    var envService, controller, $resource, brand, utilityService, accountConfig;

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

    beforeEach(inject(function( $controller, _envService_,
                                _utilityService_, _$resource_, _accountConfig_) {

        envService = _envService_;
        $resource = _$resource_;
        utilityService = _utilityService_;
        accountConfig = _accountConfig_;

        controller = $controller('LoginController', {
            envService: envService,
            utilityService: utilityService,
            accountConfig: accountConfig,
            brand: brand
        });

    }));

    it('should create controller and have correct version based on config.js', function(){
        expect(controller).toBeDefined();
        expect(controller.version).toBeDefined();
        expect(controller.version).toEqual('0.12.0');
    });

    it('should forget password', function(){
        expect(controller.forgotPassword).toBeDefined();
        spyOn(utilityService, 'redirectTo').and.callThrough();
        controller.forgotPassword();
        expect(accountConfig.forgotPasswordPath).toBe('/fe/account/forgotPassword');
        expect(utilityService.redirectTo).toHaveBeenCalledWith('/fe/account/forgotPassword');
    });

    it('should get brand name', function(){
        expect(controller.brandName).toBeDefined();
        expect(controller.brandName).toEqual('Brand Name');
    });

    it('should get brand initials for alt logo text', function(){
        expect(controller.altLogoText).toBeDefined();
        expect(controller.altLogoText).toEqual('BI Logo');
    });

});
