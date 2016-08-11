/**Created by cindy.ren on 6/15/2016.*/
'use strict';

xdescribe("app.activateController", function() {

    beforeEach(module('app.account'));

    var controller, $state, accountService, brand;

    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};

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

    beforeEach(inject(function( $controller, _$state_, _accountService_) {

        $state = _$state_;
        accountService = _accountService_;
        accountService.setPatientName(patientInfo);

        controller = $controller('ActivateController', {
            accountService: accountService,
            brand: brand
        });
        
    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct patient name', function(){
        expect(controller.patientName).toBeDefined();
        expect(controller.patientName).toEqual('firstName lastName');
    });

    it('should have correct title', function(){
        expect(controller.title).toBeDefined();
        expect(controller.title).toEqual('Brand Name Account Activation Complete');
    });

    it('should have correct brand name', function(){
        expect(controller.brandName).toBeDefined();
        expect(controller.brandName).toEqual('Brand Name');
    });

    it('should call on activated()', function(){
        spyOn($state, 'go');
        spyOn(controller, 'activated').and.callThrough();
        spyOn(accountService, 'removeActivateInfo').and.callThrough();

        controller.activated();
        expect(controller.activated).toHaveBeenCalled();
        expect($state.go).toHaveBeenCalledWith('fe.login');
        expect(accountService.removeActivateInfo).toHaveBeenCalled();
    });

});
