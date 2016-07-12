/**
 * Created by cindy.ren on 7/12/2016.
 */

'use strict';

describe("app.forgotPassword.controller ", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('app.brand'));

    var utilityService, oauthConfig, accountConfig, authenticationService;
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

    beforeEach(inject(function( $controller, $state, _authenticationService_,
                                _utilityService_, _oauthConfig_, _accountConfig_) {

        utilityService = _utilityService_;
        oauthConfig = _oauthConfig_;
        accountConfig = _accountConfig_;
        authenticationService = _authenticationService_;

        controller = $controller('ForgotPasswordController', {
            utilityService: utilityService,
            oauthConfig: oauthConfig,
            accountConfig: accountConfig,
            authenticationService: authenticationService,
            brand: brand
        });

        controller.user.email = "something";

    }));

    it('should forget password', function(){
        expect(controller.forgotPassword).toBeDefined();
        spyOn(authenticationService, 'forgotPassword').and.callThrough();
        controller.forgotPassword();
        expect(authenticationService.forgotPassword).toHaveBeenCalled();
    });

    // it('should get brand name', function(){
    //     expect(controller.brandName).toBeDefined();
    //     expect(controller.brandName).toEqual('Brand Name');
    // });
    //
    // it('should get brand initials for alt logo text', function(){
    //     expect(controller.altLogoText).toBeDefined();
    //     expect(controller.altLogoText).toEqual('BI Logo');
    // });

});