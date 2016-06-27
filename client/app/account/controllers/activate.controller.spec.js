/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

describe("app.activateController", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));
    beforeEach(module('app.brand'));
    beforeEach(module('ui.router'));

    var controller, $state, accountService;

    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};


    beforeEach(inject(function( $controller, _$state_, _accountService_, _brand_) {

        $state = _$state_;
        accountService = _accountService_;
        accountService.setPatientName(patientInfo);
        var brand = _brand_;

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
