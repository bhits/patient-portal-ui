/**
 * Created by cindy.ren on 6/15/2016.
 */

'use strict';

describe("app.activateController", function() {

    beforeEach(module('app.account'));
    beforeEach(module('app.config'));
    beforeEach(module('app.security'));

    var envService, controller, $resource, $sessionStorage, $state, accountService;

    var patientInfo = {firstName: 'firstName', lastName: 'lastName'};


    beforeEach(inject(function( $controller, _$sessionStorage_, _$resource_, _$state_,
                                _envService_, _accountService_) {

        envService = _envService_;
        $sessionStorage = _$sessionStorage_;
        $resource = _$resource_;
        $state = _$state_;
        accountService = _accountService_;

        accountService.setPatientName(patientInfo);

        controller = $controller('ActivateController', {
            $state: $state,
            accountService: accountService
        });


    }));

    it('should create controller ', function(){
        expect(controller).toBeDefined();
    });

    it('should have correct patient name', function(){
        expect(controller.patientName).toBeDefined();
        expect(controller.patientName).toEqual('firstName lastName');
    });

    // it('should call on activated()', function(){
    //     spyOn(controller, 'activated').and.callThrough();
    //     spyOn(accountService, 'removeActivateInfo').and.callThrough();
    //     var activate = controller.activated();
    //     console.log(activate);
    //     expect(controller.activated).toHaveBeenCalled();
    // });

});
