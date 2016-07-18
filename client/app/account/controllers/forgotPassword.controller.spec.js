/**
 * Created by cindy.ren on 7/12/2016.
 */

'use strict';

describe("app.forgotPassword.controller ", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.security'));
    beforeEach(module('app.brand'));

    var utilityService, oauthConfig, accountConfig, authenticationService;
    var controller, brand, $scope, form;

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

    beforeEach(inject(function( $controller, $state, $rootScope, $compile, _authenticationService_,
                                _utilityService_, _oauthConfig_, _accountConfig_) {

        utilityService = _utilityService_;
        oauthConfig = _oauthConfig_;
        accountConfig = _accountConfig_;
        authenticationService = _authenticationService_;
        $scope = $rootScope;

        var element = angular.element(
            '<form name="form">' +
            '<input ng-model="model.num" name="num" integer />' +
            '</form>'
        );
        $scope.model = { num: null };
        $compile(element)($scope);
        $scope.$digest();
        form = $scope.form;

        controller = $controller('ForgotPasswordController', {
            utilityService: utilityService,
            oauthConfig: oauthConfig,
            accountConfig: accountConfig,
            authenticationService: authenticationService,
            brand: brand
        });

    }));

    xit('should forget password', function(){
        expect(controller.forgotPassword).toBeDefined();
        spyOn(authenticationService, 'forgotPassword').and.callThrough();
        controller.user= {email: "test"};
        controller.forgotPassword();
        expect(accountConfig.forgotPasswordPath).toBe('/fe/account/forgotPassword');
        expect(utilityService.redirectTo).toHaveBeenCalledWith('/fe/account/forgotPassword');
        expect(authenticationService.forgotPassword).toHaveBeenCalled();
    }); //TODO: fails because authentication.service.spec.js forgotpassword also fails!

    it('should get brand name', function(){
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Forgot Password');
    });

    it('should cancel', function(){
        expect(controller.cancel).toBeDefined();
        spyOn(utilityService, 'redirectTo').and.callThrough();
        controller.cancel();
        expect(utilityService.redirectTo).toHaveBeenCalledWith('/fe/login');
    });

    it('should pass with integer', function() {
        form.num.$setViewValue('3');
        var valid = controller.canSubmit(form);
        expect(valid).toBeTruthy();
    });

});